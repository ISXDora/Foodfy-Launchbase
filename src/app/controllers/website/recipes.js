const Recipe = require("../../models/admin/Recipe")
const Chef = require("../../models/admin/Chef")

module.exports = {
    async mostAccessed(req, res){
        let results = await Recipe.all();
        const recipes = results.rows
        return res.render('website/index', { recipes})
    },
    async index(req, res){
        try {
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

            await Recipe.paginate(params)
        } catch (error) {
            throw new Error(err)
        }
            
    },
    async about(req,res){
        return res.render('website/about')
    },
    async indexChefs(req, res){

        let results = await Chef.all()
        const chefs =  results.rows
        return res.render('website/chefs', {chefs})
    },
    async show(req, res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]
            if(!recipe) return res.send("Recipe not found!")

            return res.render("website/show", {recipe} )
    },
    async search(req, res){
            const { filter } = await req.query 

            if ( filter ) {
            await Recipe.findBy( filter, function(recipes){
                return res.render("website/search", {recipes, filter} )
               })
             }else {
                 let results = await Recipe.all()
                 const recipes = results.rows
                    return res.render("website/search", {recipes} )
    
             }
    }


}