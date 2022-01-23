const {date} = require('../../../lib/utils')
const db = require('../../../config/db')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM chefs ORDER BY name ASC', function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })

    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
            `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT * FROM chefs WHERE id=$1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT * 
        FROM chefs 
        WHERE chefs.name ILIKE '%${filter}%'`, function(err,results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
        UPDATE chefs SET
            name=($1)
            avatar_url=($2),
        WHERE id = $3
        `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id=$1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    paginate(params){
        
        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `
                ( SELECT count(*) FROM chefs ) AS total
            `

        if (filter){
            
            filterQuery = `
                WHERE chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `
                (SELECT count(*) FROM chefs
                ${filterQuery}) 
                AS total
            `
        }

        query = `
            SELECT *, ${totalQuery}
            FROM chefs
            ${filterQuery}
            ORDER BY chefs.name LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }

}