const Recipe = require("../../models/admin/Recipe")
const Chef = require("../../models/admin/Chef")

module.exports = {
    mostAccessed(req, res){
        Recipe.all(function(recipes){
            return res.render('website/index', { recipes})
        })
    },
    index(req, res){
        Recipe.all(function(recipes){
            return res.render('website/recipes', { recipes})
        })
    },
    about(req,res){
        return res.render('website/about')
    },
    indexChefs(req, res){
        Chef.all(function(chefs){
            return res.render('website/chefs', {chefs})
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!")

            return res.render("website/show", {recipe} )
        })
    },
    search(req, res){
            const { filter } = req.query 

            if ( filter ) {
            Recipe.findBy( filter, function(recipes){
                return res.render("website/search", {recipes} )
               })
             }else {
                 Recipe.all(function(recipes){
                    return res.render("website/search", {recipes} )
                })
    
             }
    }


}