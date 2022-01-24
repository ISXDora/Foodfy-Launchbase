const Chef = require('../../models/admin/Chef')

module.exports = {
    index(req, res){
        Chef.all(function(chefs){
            return res.render("admin/chefs/index", {chefs})
        })
    },
    create(req, res){
        return res.render("admin/chefs/create")
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por vafor, preencha todos os campos!")
            }
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },
    show(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!")


            return res.render("admin/chefs/show", {chef})
        })

    }, 
    edit(req, res){

        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!")


            return res.render("admin/chefs/edit", {chef})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if(req.body[key]==""){
                return res.send("Por favor, prencha todos os campos.")
            }
    
        }
        Chef.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    }
}