const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Read moods
router.get("/", async (req, res) => {
  const [moods] = await pool.query(
    `SELECT m.mood_id, u.name AS user_name, m.date, m.mood_level, m.notes
     FROM moods m JOIN users u ON u.user_id = m.user_id ORDER BY m.date DESC`
  );
  res.render("index", { title: "MindCare", moods });
});

// Create form
router.get("/create", async (req, res) => {
  const [users] = await pool.query("SELECT user_id, name FROM users");
  res.render("create", { title: "Input Mood", users });
});

// Create submit
router.post("/moods", async (req, res) => {
  const { user_id, date, mood_level, notes } = req.body;
  if (!user_id || !date || !mood_level) return res.status(400).send("Field wajib");
  await pool.query(
    "INSERT INTO moods (user_id, date, mood_level, notes) VALUES (?, ?, ?, ?)",
    [user_id, date, mood_level, notes || null]
  );
  res.redirect("/");
});

// Update
router.get("/moods/:id/edit", async (req, res) => {
  const { id } = req.params;
  const [[mood]] = await pool.query("SELECT * FROM moods WHERE mood_id = ?", [id]);
  res.render("create", { title: "Edit Mood", mood, users: null });
});

router.post("/moods/:id", async (req, res) => {
  const { id } = req.params;
  const { date, mood_level, notes } = req.body;
  await pool.query(
    "UPDATE moods SET date=?, mood_level=?, notes=? WHERE mood_id=?",
    [date, mood_level, notes || null, id]
  );
  res.redirect("/");
});

// Delete
router.post("/moods/:id/delete", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM moods WHERE mood_id=?", [id]);
  res.redirect("/");
});

module.exports = router;
