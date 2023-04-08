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

1. Crie um novo repositório no GitHub para a nova aplicação. Digamos que o nome do novo repositório seja minha-nova-aplicacao.
2. Abra o terminal no seu computador e navegue até o diretório em que deseja clonar o novo repositório.
3. Use o comando git clone seguido da URL do novo repositório para clonar o repositório na sua máquina local.

```bash
git clone https://github.com/seu-usuario/minha-nova-aplicacao.git
```

4. Agora, você precisa adicionar o repositório original como um repositório remoto. Para fazer isso, use o seguinte comando:

```bash
git remote add upstream https://github.com/seu-usuario/seu-repositorio.git
```

Isso adicionará o repositório original como um repositório remoto com o nome upstream.

5. Em seguida, você pode puxar as alterações do repositório original para o seu novo repositório usando o seguinte comando:

```bash
git pull upstream main
```

(Caso dê um erro de branch não encontrada, é provavel que sua branch padrão está configurada como `master` ainda. Nesse caso, troque o `main` do comando acima por master) 

```bash
git branch --unset-upstream
```

Isso puxará as alterações do ramo principal (main) do repositório original para o seu novo repositório.

Agora, você pode fazer as alterações necessárias na nova aplicação sem afetar o repositório original. Quando desejar puxar as alterações mais recentes do repositório original, basta executar o comando git pull upstream main novamente. E quando quiser enviar as alterações da nova aplicação para o seu novo repositório no GitHub, use os mesmos comandos que mencionei na minha resposta anterior.

Lembre-se de personalizar os nomes do repositório, usuário e branch de acordo com a sua situação específica.

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

Espero que este README.md ajude a descrever o seu projeto de maneira clara e concisa. Se você precisar de mais ajuda ou tiver alguma dúvida, não hesite em perguntar!
