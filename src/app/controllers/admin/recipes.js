const Recipe = require("../../models/admin/Recipe")
module.exports = {

    index(req,res){
        Recipe.all(function(recipes){
            
            return res.render('admin/recipes/index', {recipes})
        })
    },
    create(req, res){

        Recipe.chefsSelectOptions(function(options){
            return res.render("admin/recipes/create", {chefsOptions: options})
        })
    },
    post(req, res){
    
        const keys = Object.keys(req.body)

        keys.pop()

        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por vafor, preencha todos os campos!")
            }
        }
        console.log(keys)
        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!")

            return res.render("admin/recipes/show", {recipe} )
        })     
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!")

            Recipe.chefsSelectOptions(function(options){
                
                return res.render("admin/recipes/edit", {recipe, chefsOptions: options})
            })
        })
    
    },
    put(req, res) {
        const keys = Object.keys(req.body) 
        
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }
        Recipe.update(req.body, function(){
            
            return res.redirect("/admin/recipes")
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function(){

            return res.redirect("/admin/recipes")
        })
    }
}


