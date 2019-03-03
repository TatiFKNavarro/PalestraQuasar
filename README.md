# Como instalar o quasar framework e executar a aplicação feita em aula

Primeiramente, é necessário instalar o NodeJs. Site: http://nodejs.org

Após instalar, verificar se está tudo certo digitando o comando node -v no prompt. A saída deve ser v11.10.1 (ou sua versão instalada). Caso apareça `'node' não é reconhecido como um comando interno`, tente reiniciar o prompt de comando e/ou fazer logoff.

Instalar o quasar e suas dependências (vue, cordova) com:

`npm install quasar-cli @vue/cli @vue/cli-init cordova -g`

Instale o MySQL, e no gerenciador de sua preferência rode o seguinte script:

```SQL
CREATE DATABASE jogos;
USE jogos;
CREATE TABLE jogos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(200),
    genero VARCHAR(100),
    publicadora VARCHAR(100),
    anoLancamento VARCHAR(4)
);
INSERT INTO jogos (nome, genero, publicadora, anoLancamento) VALUES ('Assassin\'s Creed Odyssey', 'Aventura', 'Ubisoft', 2018), ('Resident Evil 2', 'Survival Horror', 'Capcom', 2019)
```
Caso seja necessário, altere as informações de conexão ao Banco de Dados no arquivo `index.js` da API (linhas 12 a 16).

Abra dois prompts de comando dentro de cada pasta baixada em . Em cada um deles, executar `npm install`.

No prompt aberto na pasta da API, execute `node index.js`

No prompt aberto na pasta da API, execute `quasar dev`

## Como instalar e configurar o cordova

Caso esteja com o servidor do quasar em execução, pare o processo usando `Ctrl + C`

Dentro da pasta do aplicativo quasar, execute `quasar mode -a cordova`

Entre na pasta `src-cordova` e execute `cordova platform add android`

Na mesma pasta, execute `cordova requirements`

Caso tenha como retorno a mensagem:
- `Java JDK: not installed:`
    - Baixe o JDK em https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html e instale
- `Android SDK: not installed:`
    - Baixe o Android SDK em https://developer.android.com/studio/?hl=pt-br#downloads e instale (para facilitar, instale o Android Studio completo, que vem com o Gradle, e outras ferramentas necessárias). 
    - Rode o Android Studio para que ele baixe os SDKs e as ferramentas necessárias
- `Android target: not installed
Please install Android target / API level: "android-27".:`
    - Acesse a pasta com as ferramentas do Android SDK com o prompt (`C:\Users\seuUsuario\AppData\Local\Android\Sdk\tools\bin`) e execute o seguinte comando: `.\sdkmanager.bat --install platforms;android-27 build-tools;27.0.3` e aceite a licença.

No fim, é para não ter retornado nenhum erro. Então, pode-se gerar um .apk voltando para a pasta raiz do quasar e executando `quasar build -m cordova -T android`

### Bônus: Editor de texto
Caso queira utilizar o VS Code como editor de texto, recomendo que use as seguintes extensões:

- Auto Close Tag
- Auto Import – ES6, TS, JSX, TSX
- Auto Rename Tag
- ESLint
- Npm Intellisense
- Path Intellisense
- Vetur 
