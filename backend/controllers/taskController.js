const pool = require('../db');

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const userId = req.user.id;

    let query = 'SELECT * FROM tasks WHERE user_id = $1';
    const values = [userId];
    let paramIndex = 2;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      values.push(status);
      paramIndex++;
    }

    if (priority) {
      query += ` AND priority = $${paramIndex}`;
      values.push(priority);
      paramIndex++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      values.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, description, status || 'Pending', priority || 'Medium', due_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;
    const userId = req.user.id;

    // Check if task exists and belongs to user
    const taskCheck = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), due_date = COALESCE($5, due_date) WHERE id = $6 AND user_id = $7 RETURNING *',
      [title, description, status, priority, due_date, id, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};
