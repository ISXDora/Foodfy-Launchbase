const Recipe = require("../../models/admin/Recipe")
const Chef = require("../../models/admin/Chef")

module.exports = {
    mostAccessed(req, res){
        Recipe.all(function(recipes){
            return res.render('website/index', { recipes})
        })
    },
    index(req, res){
            let {page, limit} = req.params

            page = page || 1
            limit = limit || 6 
            let offset = limit * (page - 1)

            const params = {
                page,
                limit,
                offset, 
                callback(recipes){
                    const pagination = {total: Math.ceil(recipes[0].total/limit),
                                        page,
                                        }
                    return res.render('website/recipes', { recipes, pagination})
                }
            }

            Recipe.paginate(params)
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
                return res.render("website/search", {recipes, filter} )
               })
             }else {
                 Recipe.all(function(recipes){
                    return res.render("website/search", {recipes} )
                })
    
             }
    }


}