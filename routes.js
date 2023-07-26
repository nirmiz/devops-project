const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

// Route to handle user input
router.post('/saveinput', (req, res) => {
  const userInput = req.body.inputValue;
  const sql = 'INSERT INTO user_inputs (input_text) VALUES (?)';

  db.run(sql, [userInput], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).json({ error: 'Failed to save user input.' });
    } else {
      console.log('Data inserted successfully.');
      res.status(200).json({ message: 'User input saved successfully.' });
    }
  });
});

// Route to fetch all previous submissions from the database
router.get('/getsubmissions', (req, res) => {
  const sql = 'SELECT input_text FROM user_inputs';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).json({ error: 'Failed to fetch data from the database.' });
    } else {
      console.log('Data fetched successfully.');
      const submissions = rows.map(row => row.input_text);
      res.status(200).json({ submissions });
    }
  });
});

module.exports = router;
