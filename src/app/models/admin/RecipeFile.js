const db = require('../../../config/db');

module.exports = {
    create({recipe_id, file_id}){// desestruturação do req.body ---não esquecer chaves se não, vai entrar os dados em 1 único campo na tabela
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
            RETURNING id
            `
        const values = [
            recipe_id,
            file_id,
        ]

        return db.query(query, values)
    },
    async getImageRecipe(id){
        return db.query(`
                 SELECT *
                 FROM recipes_files
                 LEFT JOIN files ON (recipe_files.file_id = files.id) 
                 WHERE recipe_files.recipe_id = $1 `, [id])        
    },
}