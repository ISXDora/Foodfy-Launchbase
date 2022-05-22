const db = require('../../../config/db');
const fs = require('fs');

module.exports = {
    create({filename, path}) { // desestruturação do req.body ---não esquecer chaves se não, vai entrar os dados em 1 único campo na tabela
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
            `
        const values = [
            filename,
            path
        ]

        return db.query(query, values)
    },
    async delete(id){
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]
    
            fs.unlinkSync(file.path)  
            return db.query(`
                DELETE FROM files WHERE id = $1
            `, [id])
        }catch(err){
            console.error(err)
        }
    }
}