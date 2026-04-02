const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const authMiddleware = require("./authMiddleware");
const db = require("./db");

// test route
app.get("/", (req, res) => {
    res.send("ok");
});

// login
app.post('/login', (req, res) => {
 
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (error, result) => {

            if (error) {
                return res.status(500).send(error.message);
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid user");
            }

            const token = jwt.sign(
                { userId: result[0].id },
                "secret",
                { expiresIn: "15m" }
            );

            res.json({ token });
        }
    );
});

// protected route
app.get("/users", authMiddleware, (req, res) => {
    db.query("SELECT * FROM users", (error, result) => {
        if (error) return res.status(500).send(error.message);

        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});