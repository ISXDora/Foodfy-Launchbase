# Foodfy-Launchbase
![Nwk6eCpkha](https://user-images.githubusercontent.com/66398122/138536198-9a2666a0-bcca-4394-ba70-3622dd0a28fd.png)

**Status : under development**

![https://user-images.githubusercontent.com/66398122/138535772-db14606c-a6a0-4200-834d-fccb6402637b.gif](https://user-images.githubusercontent.com/66398122/138535772-db14606c-a6a0-4200-834d-fccb6402637b.gif)

## Sobre

> O Foodfy é um site de receitas culinárias, com uma área administrativa para manter cadastros de chefs e receitas.

## Instale na sua máquina

Clone o repositório para sua máquina

`git clone https://github.com/ISXDora/Foodfy-Launchbase.git`

Entre no diretório onde está o projeto

`cd foodfy`

Instale as depêndencias 

`npm install`

Inicie o servidor 

`npm start`

~~Um pequeno detalhe, o banco ainda não está sendo gerado de forma automática X(~~
    
- [ ] Inserir comando para criação automática do banco
- [ ] Alterar porta padrão do postgres
- [ ] Tentar usar algum modelo do TensorFlow para teste com vídeo e modelos pré-treinados.

## Rotas área administrativa 

Index de receitas

`http://localhost:3000/admin/recipes`

Show da receita

`http://localhost:3000/admin/recipes/9`

Formulário de edição da receita 

`http://localhost:3000/admin/recipes/9/edit`

Index de chefs

`http://localhost:3000/admin/chefs/`

Show de um chef por query params, e suas receitas vinculadas

`http://localhost:3000/admin/chefs/2`

Formulário de cadastro de um chef

`http://localhost:3000/admin/chefs/2/edit`

## Tecnologias Utilizadas 

- Javascript com tempplate engine *Nunjuks*
- CSS
- Estrutura do projeto com deveres separados por camadas (Lembrando arquitetura MVC)
- Node.js com Express 
- Models e Controllers utilizando callback functions para comunicação 
- Banco de dados Postgresql

## Principais Desafios 

Um dos peimeiros e principais desafios desse projeto foi aprender a entender, manipular e tratar query strings, query params, e a medida em que o projeto evoluiu junto com meus conhecimentos entender e saber usar data-set diretamente no html através de query's do banco de dados também. 

A lógica de paginação no front-end e no back-end também foi muito enriquecedora.

Bem no início só funcionava o website, e os dados eram fornecidos por arquivo **JSON** na raíz do projeto. Com o uso do banco de dados, aprendi a usar callback functios para retornar informações que saíam da camada de modelo para a camada de tratamento dos dados, bem como também a realizar as operações do **CRUD** no bd com Javascript. E o projeto foi sendo refatorado e melhorado, inserindo novas features. 

Eu evolui com esse projeto, não sei se ele é cria minha ou se sou eu a cria dele.

Também aprendi a usar filtros, ainda pouco robustos, mas funcionais. Na página principal e inicial, há um campo de filtro que redireciona para uma outra página onde aparecerão os resultados da pesquisa, nessa página há páginação dos resultados. 

Os formulários que mantem os chefs e as receitas, ficaram muito dinâmicos e reutilizáveis com a ajuda da template engine Nunjuks, é possível identificar os padrões facilmente e segui-los sem que precise de muita orientação a alguém que o esteja conhecendo.

O layout dele é bem enxuto e simples, e em breve será retarorado para que fique mais fluido e responsivo.

Ainda há muito o que melhorar e aprender com esse projeto, e todo o conhecimento que adquiro tento deixar um pouco dele aqui. 