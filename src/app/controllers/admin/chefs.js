const Chef = require('../../models/admin/Chef')
const RecipeFile = require('../../models/admin/RecipeFile')
const File = require('../../models/admin/File')
const object = require('nunjucks/src/object')

module.exports = {
    async index(req, res){
            try {              
                let results = await Chef.all()
    
                const chefs = results.rows;
                return res.render("admin/chefs/index", {chefs})
            } catch (err) {
                throw new Error(err)
            }

    },
    create(req, res){
        return res.render("admin/chefs/create")
    },
    async post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por vafor, preencha todos os campos!")
            }
        }
        
    const file = req.files
    let results = await File.create({
        filename: file[0].filename,
        path: file[0].path
    })
    const fileId = results.rows[0].id

    results = await Chef.create({
        name: req.body.name,
        files_id: fileId
    })
    const chefId = results.rows[0].id

    return res.redirect(`/admin/chefs/${chefId}`)
   
    },
    async show(req, res){
        let results = await Chef.find(req.params.id)

        const chef = results.rows[0]

            if(!chef) return res.send("Chef not found!")

        results = await Chef.getRecipes(chef.id);

        const recipes = results.rows
            
            console.log(recipes)
            return res.render("admin/chefs/show", {chef, recipes})
        

    }, 
    async edit(req, res){

        let results = await Chef.find(req.params.id);

        const chef = results.rows[0];
            if(!chef) return res.send("Chef not found!")


            return res.render("admin/chefs/edit", {chef})
    },
    async put(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if(req.body[key]==""){
                return res.send("Por favor, prencha todos os campos.")
            }
    
        }

        await Chef.update(req.body)

       
        return res.redirect(`/admin/chefs/${req.body.id}`)
    }, 
    async delete(req, res){

        let results = await Chef.getRecipes(req.body.id)

        const recipeExist = results.rows[0];

        if(!recipeExist){
            await Chef.delete(req.body.id)

            return res.redirect("/admin/chefs/");
        }else {
              res.send("Chefs com receitas cadastradas não podem ser removidos do sistema!")
          }
      }
}