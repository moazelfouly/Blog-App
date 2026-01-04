const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

/* =========================
   Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Database (Connection Pool)
========================= */
const db = mysql2.createPool({
    host: "127.0.0.1",
    port: 3306,
    database: "blog_app",
    user: "root",
    password: "",
    connectionLimit: 10
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed");
    } else {
        console.log("Database connected");
        connection.release();
    }
});

/* =========================
   Signup
========================= */
app.post("/auth/signup", async (req, res) => {
    try {
        const { username, email, password, DOB } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Incomplete data" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password too short" });
        }

        const checkQuery = `SELECT id FROM users WHERE u_email = ?`;

        db.execute(checkQuery, [email], async (err, result) => {
            if (err) {
                console.error("CHECK QUERY ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (result.length > 0) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const names = username.trim().split(" ");

            const insertQuery = `
                INSERT INTO users
                (u_first_name, u_middle_name, u_last_name, u_email, u_password, u_DOB)
                VALUES (?,?,?,?,?,?)
            `;

            db.execute(
                insertQuery,
                [
                    names[0],
                    names[1] || null,
                    names[2] || null,
                    email,
                    hashedPassword,
                    DOB || null
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Insert failed" });
                    }

                    res.status(201).json({
                        message: "Account registered successfully"
                    });
                }
            );
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   Login
========================= */
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Incomplete data" });
        }

        const sql = `SELECT * FROM users WHERE u_email = ?`;

        db.execute(sql, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.u_password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: user.id, email: user.u_email },
                "SECRET_KEY",
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login successful",
                token
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   Server
========================= */
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});