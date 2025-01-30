const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy user data (in a real-world scenario, this would be from a database)
const users = [
  {
    username: 'admin',
    password: 'password123', // In real apps, password should be hashed
  },
];

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists
  const user = users.find((u) => u.username === username);

  // If user doesn't exist or password doesn't match
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // If authentication is successful, return a styled success page
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Successful</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .success-message {
          color: #4caf50;
          font-size: 24px;
          font-weight: bold;
        }
        .button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
        .button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Login Successful</h1>
        <p class="success-message">Welcome, ${username}!</p>
        <button class="button" onclick="window.location.href='/login'">Go to Dashboard</button>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
