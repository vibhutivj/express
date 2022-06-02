var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE product (
            productId TEXT PRIMARY KEY,
            productName TEXT, 
            productPrice REAL, 
            CONSTRAINT productName_unique UNIQUE (productName)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('Using existing table');
            }else{
                // Table just created, creating some rows
                // { “productId” : “A0000001”, “productName” : “random string”, “productPrice”, <random number between 1 and 100>}
                console.log('Inserting 200,000 Values into table, this will take sometime');
                var insert = 'INSERT INTO product (productId, productName, productPrice) VALUES (?,?,?)'
                for(let i=1; i<=200000; i++) {
                    const id = "A" + String(i).padStart(7, '0');
                    const price = parseFloat((Math.random() * (100 - 1) + 1).toFixed(2));
                    db.run(insert, [id, "Name"+id, price]);
                }
                console.log('Table created');
            }
        });  
    }
});


module.exports = db