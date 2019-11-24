var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function() {
    db.run("CREATE TABLE usuario (email TEXT, senha TEXT)");
    
    var enunciadoIns = db.prepare("INSERT into usuario values(?,?)");

    var petianos = ["admin", 'accs2', 'jgnvs', 'jhmn', 'som3', 'vss2'];

    for(let f = 0; f < petianos.length; f++){
        if(f == 1)enunciadoIns.run(petianos[f], "admin"); // Senha do admin
        enunciadoIns.run(petianos[f], "123456");          // Senha dos usuários
    }
    enunciadoIns.finalize();

    db.each("SELECT email, senha FROM usuario", function(err, row){
        console.log("Usuário:", row.email, row.senha);
    });

});

db.close();