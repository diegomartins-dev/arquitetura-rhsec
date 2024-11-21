# Arquitetura RH SEC

Projeto gerado com a versão 18.2.9 do [Angular CLI](https://github.com/angular/angular-cli)

## Requisitos

- Ter no nodejs na versão 23.0.0. instalado na máquina. Recomendo instalar o [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file) para que possa utilizar mais de uma versão do nodejs
- Instalar a CLI do angular `npm install -g @angular/cli@18.2.9`.

## Rodando o projeto localmente

- Baixar o projeto do repositório
- Navegar atá a pasta raíz do projeto e executar o comando `npm install`
- Executar o comando `npm run server` em um terminal e mantê-lo ativo, para subir a api restfull com json-server. O servidor subirá no caminho [http://localhost:3000](http://localhost:3000)
- Executar o comando `npm start` em outro terminal e mantê-lo ativo, para startar o servidor local e abrir o navegador em [http://localhost:4200](http://localhost:4200)

## Build

- Navegar até a pasta raíz do projeto e executar o comando `npm run build`.
- Será gerada uma pasta `/dist`
- Navegar até `dist/browser` e jogar o conteúdo dessa pasta em um servidor web
