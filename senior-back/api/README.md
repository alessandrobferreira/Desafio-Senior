
TECNOLOGIAS PRESENTES NO PROJETO

Node.JS v16.16.0  |   EXPRESS v^4.18.2   |  MySQL2 v^3.3.0

BIBLIOTECAS UTILIZADAS NO PROJETO

NODEMON v^2.0.22  |  EXPRESS v^4.18.2  |  MORGAN v^1.10.0  | BODY-PARSER v^1.20.2  |  CORS v^2.8.5

REQUISITOS NECESSÁRIOS PARA RODAR O PROJETO EM AMBIENTE LOCALHOST

Certifique-se de ter o Node.js e o NPM (ou Yarn) instalados em seu computador;
Também será necessário ter o WorkBench/MySQL

1 - PROJETO API/NODE

a - Faça o download do repositório raiz.

b - url do repositório: https://github.com/David-Machado-Git/desafio-ambisis

c - Após realizar o download do repositório. Você deve navegar até a pasta/diretório com o nome (api), executar o comando npm install para instalar as dependências listadas no arquivo package.json que são usadas 	no projeto.

d - Feito os procedimentos anteriores certifique-se de estar na pasta/diretório (api) e certifique que; a pasta node_module esteja presente, e também que todas as dependências do projetos foram instaladas corretamente, assim sendo; basta rodar o servidor/ou seja; iniciar a aplicação através do comando: npm start (o mesmo está configurado para 	rodar na porta padrão 3000).

2 - BANCO DE DADOS MySQL

a - Abra o Workbench e faça login no seu servidor MySQL.

"user": "root",
"password": "123456",

b - Clique no menu "Server" e selecione a opção "Data Import".

c - Na tela de importação de dados, selecione a opção "Import from Self-Contained File" e selecione o arquivo do dump .sql que está na pasta raiz do projeto  que você deseja importar.

d - Em seguida, selecione a opção "Default Target Schema" ou escolha um banco de dados específico para importar o dump.

e - Clique em "Start Import" para iniciar o processo de importação.

f - Feito os procedimentos anteriores, (tendo a certeza que em seu sistema 	operacional o serviço do MySQL esteja rodando por padrão na porta 3306 e tendo a certeza que a aplicação também esteja rodando) basta iniciar os testes de requisições utilizando o postman. Já deixei as tabelas do Banco populadas com algumas informações fictícias.



3 - POSTMAN PARA TESTAR AS REQUISIÇÕES

Conforme solicitado, abaixo seguem os EndPoints para realizar os testes via PostMan:


Empresas

http://localhost:3000/empresas - (ARGUMENTO GET) - Recupera todas as empresas registradas.

http://localhost:3000/empresa/id - (ARGUMENTO GET) - Recupera a empresa com o id informado.

http://localhost:3000/empresa/insert - (ARGUMENTO POST) - Cria uma nova empresa

Ex de como terá que ser o objeto json enviado:

{
"id_empresa" : 1,
"razaosocial" : "Mundo Verde",
"cnpj" : "37154911000111",
"cep" : "60170001",
"cidade" : "Fortaleza",
"estado" : "CE",
"bairro" : "Meireles",
"complemento" : "Próximo à Beira Mar"
}

http://localhost:3000/empresa/update/id - (ARGUMENTO PATCH) - Atualiza uma empresa específica

Ex de como terá que ser o Objeto json enviado:

{
    "razaosocial" : "ASSERTIVA AMBIENTAL",
    "cnpj" : "394985000179",
    "cep" : "89841720",
    "cidade" : "Blumenau",
    "estado" : "SC",
    "bairro" : "Velha",
    "complemento" : "De esquina com a casa 2"
}

http://localhost:3000/empresa/delete/id - (ARGUMENTO DELETE) - Deleta uma empresa específica

Para excluir uma empresa específica basta passar o id por parâmetro na url conforme acima. 


Licenças

http://localhost:3000/licencas - (ARGUMENTO GET) - Recupera todas as licenças registradas.

http://localhost:3000/licenca/id - (ARGUMENTO GET) - Recupera a licença com o id informado.

http://localhost:3000/licenca/insert - (ARGUMENTO POST) - Cria uma nova licença.

Ex de como terá que ser o objeto json enviado:

{
  "id_licenca": 6,
  "id_empresa": 1,
  "numero_licenca": "IBAMA",
  "orgao_ambiental": "ICMBio",
  "emissao": "2022-06-09",
  "validade": "2023-07-09"
}

http://localhost:3000/licenca/update/id - (ARGUMENTO PATCH) - Atualiza uma licença específica

Ex de como terá que ser o Objeto json enviado:

{
  "id_licenca": 7,
  "id_empresa": 1,
  "numero_licenca": "333444",
  "orgao_ambiental": "ICMBio",
  "emissao": "2022-06-09",
  "validade": "2023-07-09"
}

http://localhost:3000/licenca/delete/id - (ARGUMENTO DELETE) - Deleta uma licença específica

Para excluir uma licença específica basta passar o id por parâmetro na url conforme acima. 

Na pasta diretório com o nome: postman segue imagens de prints.


Em relação ao Desafio! Algumas situações, eu sugeriria mudanças para fazer melhor uso de boas práticas (sabemos que uma API REST adota um padrão semelhante ao solicitado, porém um pouco diferente - refiro-me aos EndPoints solicitados). Na tabela dados_licenca, eu também sugeriria inserir um campo "licenca_ativo" com o tipo boolean para que cada licença tenha um registro de ativo ou inativo (true ou false). Mas para atender integralmente o enunciado do Desafio, eu preferi seguir o mesmo à risca (exatamente como foi solicitado). Em relação ao processo de implementação, foi tranquilo (apenas uma divergência de versionamento com o Mysql - mas que foi contornada de forma bem prática). Na verdade, o tempo é que foi meu verdadeiro vilão (devido ao meu trabalho atual), com toda certeza; tendo um pouco mais de tempo, é possível melhorar algumas coisas. A começar com uma melhoria na parte de tratamento de erros. Os que implementei são básicos. Para finalizar, sei que não é recomendado muitos comentários nos códigos. Porém, como se trata de um teste, fiz alguns comentários e deixei alguns logs que julgo serem importantes para que consigam compreender um pouco mais da minha linha de raciocínio durante o processo de criação e implementação. Analisando os tópicos solicitados, acredito ter conseguido cumprir com êxito todos os requisitos solicitados! Finalizo agradecendo a oportunidade!
