const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router();

const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
  const html = `
    <div style="display: flex; justify-content: center; align-items: center; height: 96vh;">
      <h1>SENIOR</h1>
    </div>
  `;
  res.send(html);
});

// ROTA PARA CRIAR UM NOVO PRODUTO
router.post('/insert', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log('Erro ao conectar ao MySQL: ', error);

      return res.status(500).send({
        error: error,
        response: null,
      });
    }
    console.log('Conexão com MySQL estabelecida com sucesso!');
    conn.query(
      'INSERT INTO produtos (nome, descricao, precoProduto, url, situacao) VALUES (?, ?, ?, ?, ?)',
      [
        req.body.nome,
        req.body.descricao,
        req.body.precoProduto,
        req.body.url,
        req.body.situacao,
      ],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          console.log('Erro ao executar a query no MySQL: ', error);

          if (error.errno == 1062) {
            return res.status(409).send({
              mensagem: 'Já existe uma produto com este ID',
            });
          }
          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        console.log('Query executada com sucesso no MySQL!');
        res.status(201).send({
          mensagem: 'Produto criada com sucesso!',
          id: resultado.insertId,
          nome: req.body.nome,
          descricao: req.body.descricao,
          precoProduto: req.body.precoProduto,
          situacao: req.body.situacao,
          request: {
            tipo: 'POST',
            descricao: 'Insere um produto',
            url: 'http://localhost:3000/produtos',
          },
        });
      },
    );
  });
});

// ROTA PARA ATUALIZAR UM PRODUTO ESPECÍFICO
router.put('/update/:id', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log('Erro ao conectar ao MySQL: ', error);

      return res.status(500).send({
        error: error,
        response: null,
      });
    }
    console.log('Conexão com MySQL estabelecida com sucesso!');
    conn.query(
      'UPDATE produtos SET nome = ?, descricao = ?, precoProduto = ?, url = ?, situacao = ?, observacao = ?, viewAlmoxarife = ? WHERE id = ? ',
      [
        req.body.nome,
        req.body.descricao,
        req.body.precoProduto,
        req.body.url,
        req.body.situacao,
        req.body.observacao,
        req.body.viewAlmoxarife, // Supondo que viewAlmoxarife está no corpo da requisição
        req.params.id,
      ],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          console.log('Erro ao executar a query no MySQL: ', error);

          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(202).send({
          mensagem: 'Produto atualizado com sucesso!',
        });
      },
    );
  });
});

// ROTA PARA DELETAR UM PRODUTO ESPECÍFICO
router.delete('/delete/:id', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log('Erro ao conectar ao MySQL: ', error);

      return res.status(500).send({
        error: error,
        response: null,
      });
    }
    console.log('Conexão com MySQL estabelecida com sucesso!');
    conn.query(
      'DELETE FROM produtos WHERE id = ?',
      [req.params.id],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          console.log('Erro ao executar a query no MySQL: ', error);

          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        if (resultado.affectedRows === 0) {
          return res.status(404).send({
            mensagem: 'Não há produtos com o ID informado.',
          });
        }

        res.status(202).send({
          mensagem: 'Produto removido com sucesso!',
          request: {
            tipo: 'DELETE',
            descricao: 'Remove um produto',
            url: 'http://localhost:3000/produtos',
          },
        });
      },
    );
  });
});

module.exports = router;
