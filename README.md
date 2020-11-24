###### Instruções para Execução
**Passo a Passo**
Obs: caso não tenha o nodejs / npm instalado instale utilizando essa video aula <https://www.youtube.com/watch?v=522HiDiAf0w&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=2>
1. Baixe o mongoDB <https://www.mongodb.com/try/download/community> **a versão que utilizei foi a 4.4.2(current)**
2. Instale o mongoDB lembre-se de marcar a opção mongoDBCompass para utilizar a interface. Caso tenha alguma dúvida sobre a instalação utilize esse tutorial <https://www.youtube.com/watch?v=aYRkF7sHrbk&t=348s> obs:**Pode desmarcar a opção mongoD service, desmarcar essa opção fará com que você precise inicializar o servidor manualmente**
3. Vá no Seu disco local c e crie uma pasta com o nome data e dentro da pasta data crie outra com o nome de db. **Isso é necessário, pois os dados armazenados na base ficam lá**
4. Após a conclusão dos passos anteriores, vá no local MongoDB\Server\4.4\bin e execute o arquivo *mongod* **Ele inicializará o servidor local do mongoDB**
5. De git clone no projeto ou se preferir pode baixar ele em zip **o Github disponibiliza essa funcionalidade**
6. Feito isso, abra o visual studio code de ctrl + O ou clique em File e depois openFolder e vá na pasta do projeto e selecione a pasta ProjetoWeb.
7. Após abrir a pasta, abra o terminal do visual studio code atalho: ctrl + ' e digite **npm install** instalará todos os módulos necessários para a execução do projeto web
**O passo 7 só e necessário uma vez**
8. para rodar o front-end digite no terminal **ng serve** ao terminar a compilação do projeto aparecerá a url para acessar a pagina no navegador. **pronto seu front está rodando**
9. Após rodar o front-end abra outro visual studio code aperte ctrl + o ou clique em File -> open folder, e selecione a pasta ProjetoApi.
10. abra o terminal do visual studio code e digite **npm install** Obs: só é necessário executar esse passo uma vez.
11. Verifique no back-end(visual studio code que está aberto a pasta ProjetoApi na linha 23 do arquivo app.js se o localhost que está lá é o mesmo que o do seu front. se não basta seguir o tutorial que está na linha 22 e efetuar a troca.
**obs:esse processo é necessário para a segurança da API e dos dados**
12. Após a verificação e conclusão do passo 11, digite node app.js **pronto seu back-end está funcionando e seu front-end já conseguirá comunicar com ele**
<p>Pronto, está rodando o seu projeto basta utilizar as funcionalidades do site!!!



