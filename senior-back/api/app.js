const express = require('express');
const app = express();
const mysql = require('./mysql').pool;
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeCompany = require('./routes/produto');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:7000'); // Permitir acesso apenas da URL específica
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// ENDPOINT PARA ACESSAR AS ROTAS DE PRODUTO
app.use('/produto', routeCompany);

// ROTA PARA RECUPERAR TODAS OS PRODUTOS
app.use('/produtos', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log('Erro ao conectar ao MySQL: ', error);
      return res.status(500).send({
        error: error,
        response: null,
      });
    }
    console.log('Conexão com MySQL estabelecida com sucesso!');
    conn.query('SELECT * FROM produtos;', (error, resultado, field) => {
      conn.release();

      if (error) {
        console.log('Erro ao executar a query no MySQL: ', error);
        return res.status(500).send({
          error: error,
          response: null,
        });
      }

      if (resultado.length == 0) {
        return res.status(404).send({
          mensagem: 'Não foi encontrado nenhuma empresa',
        });
      }

      console.log('Query executada com sucesso no MySQL!');
      return res.status(200).send({
        quantidade: resultado.length,
        produto: resultado.map((produto) => {
          return {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            precoProduto: produto.precoProduto,
            url: produto.url,
            situacao: produto.situacao,
            observacao: produto.observacao,
            viewAlmoxarife: produto.viewAlmoxarife,
            request: {
              tipo: 'GET',
              descricao: 'Retorna os detalhes de cada empresa individualmente',
              url: 'http://localhost:3000/produto/' + produto.id,
            },
          };
        }),
      });
    });
  });
});

app.get('/', (req, res) => {
  res.status(200).send('api-desafio-sênior');
});

// TRATAMENTO DE ERROS
app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro); // Encaminha o erro para o próximo bloco
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
