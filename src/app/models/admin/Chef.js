const {date} = require('../../../lib/utils')
const db = require('../../../config/db')

module.exports = {

    all(){
        try {
            return db.query(
                `SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY chefs.name ASC`

                )
        
        } catch (error) {
            throw `Database Error! ${err}`
        }
        
    },
    create({name, files_id}) {
        try {
            const query = `
            INSERT INTO chefs (
                name,
                file_id,
                created_at, 
                updated_at
            ) VALUES ($1, $2, $3,$4)
            RETURNING id
            `
            const values = [
            name,
            files_id,
            date(Date.now()).iso,
            date(Date.now()).iso
            ]

            return db.query(query, values)      
        } catch (err) {
            console.log(err)
        }
    },
    find(id){
        try {
            return db.query(`SELECT chefs.*, (
                SELECT count(recipes) 
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                WHERE chefs.id=$1
                GROUP BY chefs.id
            ) AS total_recipes
                    FROM chefs
                    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                    WHERE chefs.id=$1`, [id])
        } catch (err) {
            console.log(err)
        }
    },
    findBy(filter){
        try {
            return db.query(`
            SELECT * 
            FROM chefs 
            WHERE chefs.name ILIKE '%${filter}%'`)
        } catch (err) {
            console.log(err)
        }
    },
    update({name, file_id, id}){

        const query = `
        UPDATE chefs SET
            name=($1),
            file_id=($2)
        WHERE id = $3
        `
        const values = [
            name,
            file_id,
            id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM chefs WHERE id=$1`, [id])
    }, 
    getRecipes(id){
        try {
            return db.query(`
                SELECT *, recipes.id AS recipe_id
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE chefs.id = $1
    
            `, [id])
        } catch (err) {
            
            if(err) throw `Database Error! ${err}`
        }


    }

}