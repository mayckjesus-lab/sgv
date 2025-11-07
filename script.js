import express from "express";
import bodyParser from "body-parser";
import { Database } from "@replit/database";

const app = express();
const db = new Database();

app.use(bodyParser.json());
app.use(express.static("public")); // pasta com seus arquivos HTML

// Cadastro
app.post("/api/cadastro", async (req, res) => {
  const { nome, email, senha, cargo, escola } = req.body;
  if (!email.endsWith("@escola.pr.gov.br"))
    return res.status(400).send("Email inválido");
  await db.set(email, { nome, senha, cargo, escola });
  res.send("Conta criada com sucesso!");
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await db.get(email);
  if (!user || user.senha !== senha)
    return res.status(401).send("Credenciais inválidas");
  res.json(user);
});

app.listen(3000, () => console.log("✅ Servidor rodando na porta 3000"));
