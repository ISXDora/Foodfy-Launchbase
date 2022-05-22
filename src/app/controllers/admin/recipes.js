const Recipe = require("../../models/admin/Recipe")
const File = require("../../models/admin/File")
const RecipeFile = require("../../models/admin/RecipeFile")


module.exports = {

    async index(req,res){
        let results = await Recipe.all()

        const recipes = results.rows
            
        return res.render('admin/recipes/index', {recipes})
    },
    async create(req, res){

        let results = await Recipe.chefsSelectOptions()
        const options = results.rows
            return res.render("admin/recipes/create", {chefsOptions: options})
    },
    async post(req, res){
    
        const keys = Object.keys(req.body)

        keys.pop()

        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por vafor, preencha todos os campos obrigatórios!")
            }
        }
      
        if (req.files.length == 0){
            return res.send("Por favor, envie ao menos uma imagem!")
        }

        
        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id


        const filesPromise = req.files.map(file => File.create({...file}))
        await Promise.all(filesPromise)
            .then(results => 
                results.map(file => RecipeFile.create({
                recipe_id: recipeId, 
                file_id: file.rows[0].id
            })
            ))

            
            return res.redirect(`/admin/recipes/${recipeId}`)
    },
    async show(req, res){

        let results = await Recipe.find(req.params.id)
        const recipe  = results.rows[0] 
            if(!recipe) return res.send("Recipe not found!")

            return res.render("admin/recipes/show", {recipe} )
    },
    async edit(req, res){
            let results = await Recipe.find(req.params.id)
            const recipe = results.rows[0];
            if(!recipe) return res.send("Recipe not found!")

            results = await Recipe.chefsSelectOptions()

            const options = results.rows;
            
            return res.render("admin/recipes/edit", {recipe, chefsOptions: options})
    
    },
    async put(req, res) {
        const keys = Object.keys(req.body) 

        keys.pop()
        
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor, preencha todos os campos obrigatórios!")
            }
        }

        await Recipe.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)

        // if ( req.files.length != 0 ){
        //     const newFilePromise = req.files.map(file => File.create({...file, product_id: req.body.id}))

        //     await Promise.all(newFilePromise)
        // }

        // if(req.body.removed_files){
            
        //     const removedFiles = req.body.removed_files.split(",") //[1,2,3,]
        //     const lastIndex = removedFiles.length - 1 // removendo a última posição que vem vazia
        //     removedFiles.splice(lastIndex, 1) // [1,2,3] pronto!

        //     const removedFilesPromise = removedFiles.map(id => File.delete(id))

        //     await Promise.all(removedFilesPromise)
        // }

    },
    async delete(req, res){
        await Recipe.delete(req.body.id)

            return res.redirect("/admin/recipes")
    }
}


