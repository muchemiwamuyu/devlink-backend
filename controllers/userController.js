import pool from '../config/db.js'

export const addUsers = async (req, res) => {
  const { name, email, auth0_id, picture } = req.body;

  if (!name || !email || !auth0_id || !picture) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, auth0_id, picture) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, auth0_id, picture]
    );

    res.status(201).json({
      message: 'User added successfully',
      user: result.rows[0]
    });

  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'User already exists' });
    }

    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
};


