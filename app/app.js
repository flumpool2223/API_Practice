const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'db', 'database.sqlite3');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// usersテーブルの全件取得API
app.get('/api/v1/users', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM users', (err, rows) => {
    res.json(rows);
  });
  db.close();
});

// usersテーブルの特定ID取得API
app.get('/api/v1/users/:id', (req, res) => {
  const id = req.params.id;
  const db = new sqlite3.Database(dbPath);
  db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
    res.json(row);
  });
  db.close();
});

// キーワード検索API
app.get('/api/v1/search', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const keyword = req.query.q;
  db.all(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`, (err, rows) => {
    res.json(rows);
  });
  db.close();
});

  const run = async (sql, db, res, message) => {
    return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
        if (err) {
          res.status(500).send(err);
          return reject();
        } else {
          res.json({message: message});
          resolve();
        }
      });
    });
  };

// ユーザ作成API
app.post('/api/v1/users', async(req, res) => {
  const db = new sqlite3.Database(dbPath);
  const name = req.body.name;
  const profile = req.body.profile;
  const date_of_birth = req.body.date_of_birth;

  await run(`INSERT INTO users (name, profile, date_of_birth) VALUES ("${name}", "${profile}", "${date_of_birth}")`, db, res, "新規ユーザを作成しました");
  db.close();
});

// ユーザ更新API
app.put('/api/v1/users/:id', async(req, res) => {
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;

  // 現在のユーザ情報を取得
  db.get(`SELECT * FROM users WHERE id = ${id}`, async(err, row) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!row) {
      res.status(404).json({ message: "ユーザが見つかりません" });
      return;
    }
    const name = req.body.name ? req.body.name : row.name;
    const profile = req.body.profile ? req.body.profile : row.profile;
    const date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : row.date_of_birth;
    await run(`UPDATE users SET name="${name}", profile="${profile}", date_of_birth="${date_of_birth}" WHERE id=${id}`, db, res, "ユーザ情報を更新しました");
    db.close();
  });
});

// ユーザ削除API
app.delete('/api/v1/users/:id', async(req, res) => {
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;

  await run(`DELETE FROM users WHERE id=${id}`, db, res, "ユーザを削除しました");
  db.close();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
