const data = require('../data.js')


exports.index = function(req,res) {
    const dataProvisorio = data

    const recipeProvisorio = {
        ...dataProvisorio,
    }

    return res.render('admin/index', {dadosTeste: data})
}