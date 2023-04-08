# Get Started para Angular 15 + Material Angular 15

Este é um projeto de exemplo que pode ser usado como ponto de partida para aplicações Angular 15 que utilizam o Material Angular 15.

## Como utilizar este projeto

Para utilizar este projeto, siga os seguintes passos:

1. Clone o repositório na sua máquina local.

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Navegue até o diretório do projeto.

```bash
cd seu-repositorio
```

3. Instale as dependências do projeto.

```bash
npm install
```

4. Inicie o servidor de desenvolvimento.

```bash
ng serve
```

Abra o navegador e acesse a URL http://localhost:4200/. A aplicação será carregada automaticamente e estará pronta para uso.

## Começando uma aplicação apartir dessa

Se você estiver trabalhando em uma nova aplicação e quiser manter as alterações separadas do repositório original, você pode criar um novo repositório no GitHub para a nova aplicação e adicionar o repositório original como um repositório remoto. Para fazer isso, siga os seguintes passos:

1. Criar a pasta de destino da aplicação:
```bash
mkdir <nova-aplicacao> && cd <nova-aplicacao>/
```

Isso criará uma nova pasta com o nome <nova-aplicacao> e mudará para ela.

2. Inicie o repositório Git na sua máquina e no próprio Github ou paralelo:
```bash
git init
```
Isso criará um novo repositório Git vazio na pasta atual.

3. Crie e entre na branch alvo das atualizações:
```bash
git checkout -b base
```
Isso criará uma nova branch chamada base e mudará para ela.

4. Adicione a origem da aplicação base:
```bash
git remote add base https://github.com/Caio-Domingos/get-started-angular-15-with-material.git
```
Isso adicionará o repositório Caio-Domingos/get-started-angular-15-with-material como um remote chamado base.

5. Puxe a aplicação base para a branch base:
```bash
git pull base master
```
Isso fará um pull das alterações do repositório Caio-Domingos/get-started-angular-15-with-material na branch master para a branch base do seu repositório local.

6. Crie a branch que será a origem da nossa aplicação:
```bash
git checkout -b main
```
Isso criará uma nova branch chamada main e mudará para ela.

7. Adicione a origem do repositório <nova-aplicacao>:
```bash
git remote add origin https://github.com/Caio-Domingos/<nova-aplicacao>.git
```
Isso adicionará o repositório <nova-aplicacao> como um remote chamado origin.

8. Envie as duas novas branches para lá, já configurando o upstream:
```bash
git push --set-upstream origin main
git push --set-upstream origin base
```
Isso enviará as branches main e base para o repositório remoto e configurará o upstream para elas.

Extra:

Caso tenham novas mudanças e melhorias na aplicação base, você pode fazer um novo pull para a branch base e depois mandar para a sua branch de trabalho usando o comando do passo 5 novamente.

## Recursos adicionais

Além das bibliotecas padrão do Angular e Material Angular, esta aplicação utiliza as seguintes bibliotecas adicionais:

- date-fns: uma biblioteca para lidar com datas no JavaScript, usada para formatar e manipular datas na aplicação.
- ngx-mask: uma biblioteca para criação de máscaras de input no Angular, usada para fornecer uma formatação consistente de dados de entrada na aplicação.

Essas bibliotecas foram escolhidas para complementar as funcionalidades padrão do Angular, visando aprimorar a experiência do usuário na utilização da aplicação.

## Como contribuir

Se você deseja contribuir com este projeto, siga os seguintes passos:

1. Faça um fork do repositório.
2. Clone o seu fork na sua máquina local.
3. Crie um novo branch para a sua contribuição.
4. Faça as alterações necessárias.
5. Envie um pull request para o branch principal do repositório original.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE.md para mais detalhes.