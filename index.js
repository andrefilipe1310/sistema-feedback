const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");

const app = express();

// Serve arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net",
  user: "root",
  password: "6BCfBD4bCGe4BHf4GdDb-b2de33Fheb3",
  database: "railway",
  port: 57405, // Ajustar conforme necessário
});

// Conecta ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados MySQL:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

let feedbacks = [];
app.get("/feedbacks", (req, res) => {
  res.json(feedbacks);
  // Consulta o banco de dados para obter feedbacks
  db.query("SELECT * FROM feedbacks", (err, results) => {
    if (err) {
      console.error("Erro ao obter feedbacks do banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      // res.json(results);
    }
  });
});

// Define uma rota para adicionar feedback
app.post("/add-feedback", (req, res) => {
  const feedback = req.body;

  feedbacks.push(feedback);

  // Insere o feedback no banco de dados
  db.query("INSERT INTO feedbacks SET ?", feedback, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar feedback no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.sendStatus(200);
      console.log(result);
    }
  });
});

app.put("/update-curtidas/:id", (req, res) => {
  const feedbackId = req.params.id;

  // Atualizando o número de curtidas no banco de dados
  db.query(
    "UPDATE feedbacks SET numCurtidas = numCurtidas + 1 WHERE id = ?",
    [feedbackId],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar curtidas no banco de dados:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Define uma rota padrão para servir o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/pages", "index.html"));
});

const port = process.env.PORT || 3000;
// Inicia o servidor
app.listen(port, () => {
  //console.log(`Servidor está rodando na porta ${port}`);
});
