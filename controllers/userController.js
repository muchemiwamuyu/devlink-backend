import pool from "../config/db.js";

// ✅ Create User
export const createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        console.log(`user created ${result.rows[0]}`)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};

