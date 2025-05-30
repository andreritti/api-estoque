import express, { response } from "express";
const server = express();
const port = 3000;

server.use(express.json());

let itens = [
  {
    "id": 1,
    "nome": "Produto A",
    "preço": 15.50,
    "quantidade": 100
  }, {
    "id": 2,
    "nome": "Produto B",
    "preço": 29.90,
    "quantidade": 50
  }, {
    "id": 3,
    "nome": "Produto C",
    "preço": 7.20,
    "quantidade": 200
  }
];

let ultimoId = itens.length;

server.get("/itens", (req, res) => {
  res.json(itens);
});

server.post("/itens", (req, res) => {
  console.log("Cadastrando novo item: ", req.body);
  ultimoId++;
  req.body.id = ultimoId;
  itens.push(req.body);
  res.sendStatus(201);
});

server.get("/itens/:id", (req, res) => {
  const indexItem = itens.findIndex(item => item.id === Number(req.params.id));

  if (indexItem === -1) {
    res.sendStatus(404);
  } else {
    res.json(itens[indexItem]);
  }
});

server.patch("/itens/:id", (req, res) => {
  const indexItem = itens.findIndex(item => item.id === Number(req.params.id));

  if (indexItem === -1) {
    res.sendStatus(404);
  } else {
    req.body.id = itens[indexItem].id;
    itens[indexItem] = req.body;
    res.json(itens[indexItem]);
  }
});

server.delete("/itens/:id", (req, res) => {
  const indexItem = itens.findIndex(item => item.id === Number(req.params.id));
  if (indexItem === -1) {
    res.sendStatus(404);
  } else {
    itens.splice(indexItem, 1);
    res.sendStatus(200);
  }
});

server.listen(port, () => console.log("Meu servidor está funcionando na port:", port));
