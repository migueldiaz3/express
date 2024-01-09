const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();


app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Babbu@333',
    database: 'expense'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Handle POST request for signup
app.post('/signup', (req, res) => {
    const userData = req.body;
    console.log('Received signup data:', userData);

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM exps WHERE email = ?';
    db.query(checkEmailQuery, [userData.email], (checkError, results) => {
        if (checkError) {
            console.error('Error checking email:', checkError);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length > 0) {
            // Email already exists, send an error response
            res.status(400).json({ error: 'Email already exists' });
        } else {
            // Email does not exist, proceed with signup
            const insertQuery = 'INSERT INTO exps (name, phone, email, password) VALUES (?, ?, ?, ?)';
            const values = [userData.name, userData.phone.toString(), userData.email, userData.password];

            db.query(insertQuery, values, (insertError) => {
                if (insertError) {
                    console.error('Error during signup:', insertError);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Signup successful
                    res.json({ message: 'Signup successful!' });
                    res.redirect('/');
                }
            });
        }
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/expense.html');
  });


app.listen(3000, () => {
    console.log(`Server is running`);
});
