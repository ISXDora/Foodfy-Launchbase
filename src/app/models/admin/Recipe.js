const db = require ('../../../config/db');
const {date} = require('../../../lib/utils');

module.exports = {
    all() {
        try {
            return  db.query(`SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.title ASC`)
            
        } catch (err) {
            
            if (err) throw `Database Error! ${err}`
        }     

    },
    create(data){
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            Number(data.chef),
            data.title,
            data.ingredients, 
            data.preparation,
            data.information,
            date(Date.now()).iso,
            date(Date.now()).iso
        ]
        return db.query(query, values)
    },
    find(id){
        return db.query(`SELECT recipes.*, chefs.name AS chef_name
                 FROM recipes
                 LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
                 WHERE recipes.id = $1 `, [id])
    },
    findBy(filter){
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes 
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
        WHERE recipes.title ILIKE '%${filter}%' `)
    },
    update(data){
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            title=($2),
            ingredients=($3),
            preparation=($4),
            information=($5)
        WHERE id = ($6)
        `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        try {
            return db.query(`DELETE FROM recipes WHERE id=$1`, [id])
        } catch (err) {
            
            if(err) throw `Database Error ${err}`
        }       
    },
    chefsSelectOptions(){
        try {
            return db.query(`SELECT name, id FROM chefs`)
        } catch (err) {
            if(err) throw `Database Error! ${err}`
        }
    },
    paginate(params){
        try {
            const {limit, offset} = params
 
            let query = `SELECT recipes.*,(
                SELECT count(*) FROM recipes
            ) AS total, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY recipes.id, chefs.name
            ORDER BY recipes.title ASC LIMIT $1 OFFSET $2`
    
            return db.query(query, [limit, offset])
            
        } catch (err) {
            if(err) throw `Database Error! ${err}`
        }
    
    },
}