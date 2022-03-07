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

> Um pequeno detalhe, o banco ainda não está sendo gerado de forma automática X(
    
[ ] Inserir comando para criação automática do banco
[ ] Alterar porta padrão do postgres


## Rotas área administrativa 

`http://localhost:3000/admin/recipes` // Index de receitas 
`http://localhost:3000/admin/recipes/9` // Show da receita 
`http://localhost:3000/admin/recipes/9/edit` // Formulário de edição da receita 

`http://localhost:3000/admin/chefs/` //Index de chefs
`http://localhost:3000/admin/chefs/2` // Show de um chef por query params, e suas receitas vinculadas
`http://localhost:3000/admin/chefs/2/edit` // Formulário de cadastro de um chef

## Tecnologias Utilizadas 

> Javascript com tempplate engine *Nunjuks*
> CSS
> Estrutura do projeto com deveres separados por camadas (Lembrando arquitetura MVC)
> Node.js com Express 
> Models e Controllers utilizando callback functions para comunicação 
> Banco de dados Postgresql