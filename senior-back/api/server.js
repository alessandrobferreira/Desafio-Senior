const mysql = require('./mysql').pool;
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// CONFIGURAÇÃO DO SERVIDOR
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  
  // Tentar conectar ao MySQL
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log("Erro ao conectar ao MySQL: ", error);
    } else {
      console.log("Conexão com MySQL estabelecida com sucesso!");
      conn.release();
    }
  });
});
