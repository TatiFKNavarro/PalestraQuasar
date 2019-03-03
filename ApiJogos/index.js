const express =  require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.listen(3000);
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());
app.use(cors());
app.options('*', cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database : 'jogos'
});

app.get('/jogos', function (req, res) {
  connection.query('SELECT * FROM jogos', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/jogos/:id', function (req, res) {
  const {id} = req.params;

  connection.query('SELECT * FROM jogos WHERE id = ?', id, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/jogos', function (req, res) {
  const {nome, genero, publicadora, anoLancamento} = req.body;
  const jogo = {
    nome,
    genero,
    publicadora,
    anoLancamento: parseInt(anoLancamento)
  };

  connection.query('INSERT INTO jogos SET ?', jogo, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.patch('/jogos/:id', function (req, res) {
  const {id} = req.params;
  const {nome, genero, publicadora, anoLancamento} = req.body;
  const jogo = {
    nome,
    genero,
    publicadora,
    anoLancamento: parseInt(anoLancamento)
  };

  connection.query('UPDATE jogos SET nome = ?, genero = ?, publicadora = ?, anoLancamento = ? WHERE id = ?', [nome, genero, publicadora, parseInt(anoLancamento), id], (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});


app.delete('/jogos/:id', function (req, res) {
  const {id} = req.params;

  connection.query('DELETE FROM jogos WHERE id = ?', id, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

