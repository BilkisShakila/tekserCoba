-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS mindcare;
USE mindcare;

-- Tabel users (tabel pendukung)
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

-- Tabel moods (tabel utama)
CREATE TABLE IF NOT EXISTS moods (
  mood_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  mood_level ENUM('senang','sedih','cemas','lelah') NOT NULL,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Data dummy awal untuk users
INSERT INTO users (name, email, password) VALUES
('Bilkis Aqilatusshakila', 'bilkis@example.com', 'hashed_password'),
('Rossa Kayla Isma Aziz', 'rossa@example.com', 'hashed_password');

-- Data dummy awal untuk moods
INSERT INTO moods (user_id, date, mood_level, notes) VALUES
(1, CURDATE(), 'senang', 'Produktif dan tenang'),
(2, CURDATE(), 'cemas', 'Deadline mepet, butuh jeda');