const Recipe = require("../../models/admin/Recipe")

module.exports = {
    index(req, res){
        Recipe.all(function(recipes){
            return res.render('website/index', {recipes})
        })
    },
}