# DialogFlow Chatbot for Currency Quotation

## Diário de bordo

Desenvolvi a aplicação começando pelo servidor e suas rotas. Neste projeto estruturei de forma mais organizada o desenvolvimento, de forma mais sequencial. Meu segundo passo foi tratar a captura do ID do usuário. Primeiramente utilizei a sessão do payload do dialogflow, porém posteriormente consegui implementar utilizando o payload do line, pegando o id do usuário para sua identificação. O ID é salvo no Mongo, que também foi implementado nessa etapa. Com a base do projeto solidificada, passei a desenvolver as intents. Estudei a API a ser consumida e suas rotas, e decidi fazer o projeto de forma mais dinâmica, visto a possibilidade de utilizar template strings para capturar a API como um todo. Aqui foi onde gastei a maior parte do tempo no projeto, desenvolvendo a lógica para a captação dinâmica. Feito isso, tratei dos outros requerimentos, como a Intent de ajuda, e duas formas de fazer a cotação, por moeda, e geral, sendo essa ultima a impressão das moedas obrigatórias no requerimento do projeto. Por fim, corrigi alguns detalhes que a API não trata direito via código, como o valor do Bitcoin mal denotado, e também refinei e estruturei o código nos momentos finais prévios à entrega.

As principais tecnologias empregadas na aplicação são:
Express: Framework de gestão de rotas e requisições/respostas.
Axios: Ferramenta para acesso aos dados da API via o NodeJS.
Mongoose: Comunicação com o banco do MongoDB Atlas.
AwesomeAPI: Foi a api sugerida no projeto, contém várias rotas de cotação de moedas.

## Documentação

- Aplicação em NodeJS, requer que este esteja instalado na máquina/container utilizado. 
- Faça download/clone do repositório, caso necessário extraia para uma pasta local. Importe o bot para o DialogFlow; Isso pode ser feito ao criar um novo agente no console do DialogFlow, e nas configurações deste acessar "Import and Export" e importar o zip contido no repositório.
- Também é necessário configurar o acesso ao MongoDB. Você precisa criar um cluster no Atlas (https://www.mongodb.com/atlas/database) e conectar com o cluster através da string provida dentro do site. Siga as instruções de conexão do Atlas e substitua <password> na string pela senha definida anteriormente quando você estava criando o cluster. Dentro da sua pasta local, acesse 'config/default.json' e preencha o valor de "con" com sua string e salve o arquivo.
- Utilize de uma aplicação como o ngrok para estabelecer conexão com o webhook. Instale e execute o ngrok, crie conta caso necessário. Execute o comando ngrok http 3000, e caso necessário copie o link após "Fowarding" (com final ngrok.io) e cole na página de Fulfillment no console do Dialogflow (Fulfillment -> Webhook -> URL*) com a rota "/webhook" (Ex: 123-456-789.ngrok.io/webhook). Salve no final da página. Alternativamente, utilize o link (https://chatbot-webhook-quotation.herokuapp.com/webhook) para executar este.
- Instale as dependências do pacote antes da primeira execução com <b><i>npm install --production</i></b> dentro da pasta raiz.
- Execute o projeto com <b><i>npm start</i></b> dentro da pasta <b>raiz</b> do projeto. Após esses passos, o bot estará em execução, exibindo a mensagem 'Webhook running' como confirmação. É possível executar o bot no painel direito, ou integrar com algum serviço. Para fazer a integração, siga os passos especificados no Console do DialogFlow.

## Integração
  
O bot está integrado com o LINE, e para acessar ele, é necessário entrar no aplicativo e procurar pelo ID @660sxgbe
O bot também tem integração com o Telegram, que pode ser acessada via [este link](t.me/MoneyQuotationBot)
Por fim, o deploy do webhook está hospedado em https://chatbot-webhook-quotation.herokuapp.com/webhook e aceita operações de POST para o chatbot.
