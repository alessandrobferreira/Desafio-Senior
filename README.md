# Desafio-Senior
Teste técnico em Angular/Node.js sobre *aplicação de fluxo de aprovação para compra de material de escritório*.

**IMPORTANTE**

🎥
Nesse vídeo https://www.solucoesfullstack.com.br/alessandro-ferreira.mp4 está o fluxo completo.

Tem também um pequeno vídeo de demonstração no arquivo *cadastrando-produto.rar*, só abrir o arquivo e clicar em *view raw* que o arquvio compactado estará disponível para verificação


💻 Tecnologias

    NodeJs    
    MySQL
    Angular 17

⌨️ Editor / IDE

    Visual Studio Code
    Angular Extensions link

🔧 Algumas funcionalidades disponíveis na API

    ✅ Solicitar um produto e registrar descrição e preço.    
    ✅ Aprovar ou reprovar uma solicitação.
    ✅ Ao reprovar poder preencher um campo de observações.
    ✅ Consultar um produto.
    ✅ Filtrar um status de produto.
    ✅ Filtrar por nome do produto.
    ✅ Inserir um novo produto e colocar imagem através do campo URL.
    ✅ Banco de dados MySQL para consultas.

⚠️ Você precisa ter Node.js / NPM instalado localmente.
Também será necessário ter o WorkBench/MySQL.


   🛠️ Instale todas as dependências necessárias:

npm install

   ▶️ Execute o projeto:

ng serve

📂 Abra seu navegador e acesse http://localhost:7000 (porta do Angular).

🎲 BANCO DE DADOS MySQL

a - Abra o Workbench e faça login no seu servidor MySQL.

"user": "root",
"password": "123456".

b - Clique no menu "Server" e selecione a opção "Data Import".

c - Na tela de importação de dados, selecione a opção "Import from Self-Contained File" e selecione o arquivo do dump .sql que está na pasta "Senior-Back" do projeto.

d - Em seguida, selecione a opção "Default Target Schema" ou escolha um banco de dados específico para importar o dump.

e - Clique em "Start Import" em "Import Progress" para iniciar o processo de importação.

f - Feito os procedimentos anteriores, (tendo a certeza que em seu sistema 	operacional o serviço do MySQL esteja rodando por padrão na porta 3306 e tendo a certeza que a aplicação também esteja rodando) basta iniciar os testes de requisições utilizando o postman.
