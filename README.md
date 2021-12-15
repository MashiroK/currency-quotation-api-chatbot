# DialogFlow Chatbot for Currency Quotation

## Diário de bordo

## Documentação

- Aplicação em NodeJS, requer que este esteja instalado na máquina/container utilizado. 
- Faça download/clone do repositório, caso necessário extraia para uma pasta local. Importe o bot para o DialogFlow; Isso pode ser feito ao criar um novo agente no console do DialogFlow, e nas configurações deste acessar "Import and Export" e importar o zip contido no repositório.
- Também é necessário configurar o acesso ao MongoDB. Você precisa criar um cluster no Atlas (https://www.mongodb.com/atlas/database) e conectar com o cluster através da string provida dentro do site. Siga as instruções de conexão do Atlas e substitua <password> na string pela senha definida anteriormente quando você estava criando o cluster. Dentro da sua pasta local, acesse 'src/config/default.json' e preencha o valor de "con" com sua string e salve o arquivo.
- Utilize de uma aplicação como o ngrok para estabelecer conexão com o webhook. Instale e execute o ngrok, crie conta caso necessário. Execute o comando ngrok http 3000, e caso necessário copie o link após "Fowarding" (com final ngrok.io) e cole na página de Fulfillment no console do Dialogflow (Fulfillment -> Webhook -> URL*) com a rota "/webhook" (Ex: 123-456-789.ngrok.io/webhook). Salve no final da página. Alternativamente, utilize o link (TO-DO) na URL de webhook para executar este. 
- Instale as dependências do pacote antes da primeira execução com <b><i>npm install --production</i></b>
- Execute o projeto com <b><i>node index.js</i></b> dentro da pasta raiz do projeto. Após esses passos, o bot estará em execução, exibindo a mensagem 'Webhook running' como confirmação. É possível executar o bot no painel direito, ou integrar com algum serviço. Para fazer a integração, siga os passos especificados no Console do DialogFlow.
