const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
var mysql = require('mysql');
let ipDB = 'ec2-18-223-121-116.us-east-2.compute.amazonaws.com';


const app = express();

app.use(bodyParser.json({ limit: '5mb', extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(4000, () => {
    let host = 'localhost';
    console.log('El servidor esta prendido en http://%s:%s', host, 4000)
})


//-------------------------------USUARIOS-----------------------------------

//Obtener todos los usuarios
app.get('/usuario/getUsuarios', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT * from usuario`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    let user = result;
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Login
app.post('/usuario/login', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let correo = req.body.correo;
    let password = req.body.password;

    const sql = `SELECT * FROM usuario WHERE correo = '${correo}' and password = '${password}'`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Insertar un nuevo usuario
app.post('/usuario/nuevoUsuario', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    //DPI,nombre,fecha_nacimiento,correo,password
    let DPI = req.body.DPI;
    let nombre = req.body.nombre;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let correo = req.body.correo;
    let password = req.body.password;

    const sql = `INSERT INTO usuario(DPI,nombre,fecha_nacimiento,correo,password) values('${DPI}','${nombre}',STR_TO_DATE('${fecha_nacimiento}', "%d/%m/%Y"),'${correo}','${password}')`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//Modificar Datos del usuario
app.post('/usuario/modificarDatos', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    //DPI,nombre,fecha_nacimiento,correo,password
    let ID = req.body.ID;
    let DPI = req.body.DPI;
    let nombre = req.body.nombre;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let correo = req.body.correo;
    let password = req.body.password;

    const sql = `UPDATE usuario SET DPI = '${DPI}', nombre = '${nombre}', fecha_nacimiento = STR_TO_DATE('${fecha_nacimiento}', "%d/%m/%Y"), correo = '${correo}', password = '${password}' WHERE ID = ${ID}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//Obtener vendedores
app.get('/usuario/getVendedores', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT u.id , u.nombre from rol_usuario INNER JOIN usuario u ON u.ID = id_usuario where ID_rol = 1`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    let user = result;
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Obtener repartidores
app.get('/usuario/getRepartidores', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT u.id , u.nombre from rol_usuario INNER JOIN usuario u ON u.ID = id_usuario where ID_rol = 3`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    let user = result;
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


//-------------------------------ROLES-----------------------------------
//Obtener todos los roles
app.get('/rol/getRoles', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT * FROM rol`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


//Insertar rol a un usuario

app.post('/rol/asignarRol', (req, res) => {

    let id_usuario = req.body.id_usuario;
    let id_rol = req.body.id_rol;
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `INSERT INTO rol_usuario(id_rol,id_usuario) VALUES(${id_rol},${id_usuario})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//------------------------------PERMISOS----------------------------------

//Obtener todos los permisos
app.get('/permiso/getPermisos', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT * FROM permiso`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Insertar permiso un usuario

app.post('/permiso/asignarPermiso', (req, res) => {

    let id_usuario = req.body.id_usuario;
    let id_permiso = req.body.id_permiso;
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `INSERT INTO permiso_usuario(id_permiso,id_usuario) VALUES(${id_permiso},${id_usuario})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//Obtener roles y permisos de un usuario
app.post('/permiso/permisosUsuario', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let id_usuario = req.body.id_usuario;
    const sql = `SELECT p.ID as 'id_permiso', p.nombre as 'permiso', r.ID as 'id_rol', r.nombre as 'rol'  FROM permiso_usuario pu INNER JOIN permiso p ON pu.ID_permiso = p.ID INNER JOIN rol r on p.id_rol = r.ID WHERE pu.ID_usuario = ${id_usuario}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


app.post('/permiso/tienePermiso', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let usuario = req.body.usuario;
    let permiso = req.body.permiso;
    const sql = `SELECT * FROM permiso_usuario WHERE id_usuario = ${usuario} and id_permiso = ${permiso}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    if (Object.keys(result).length !== 0) {
                        res.json({ "res": 1 });
                    } else {
                        res.json({ "res": 0 });
                    }
                    con.end();
                }
            });
        }
    });
})

//------------------------------SEDES----------------------------------
//Obtener todas las sedes
app.get('/sede/getSedes', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT * FROM sede`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//Insertar una nueva Sede
app.post('/sede/nuevaSede', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let alias = req.body.alias;
    let direccion = req.body.direccion;
    let municipio = req.body.municipio;
    let encargado = req.body.encargado;

    const sql = `INSERT INTO sede(alias,direccion,municipio,encargado) VALUES('${alias}','${direccion}','${municipio}',${encargado})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Modificar datos de una Sede
app.post('/sede/modificarSede', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let id = req.body.id;
    let alias = req.body.alias;
    let direccion = req.body.direccion;
    let municipio = req.body.municipio;
    let encargado = req.body.encargado;

    const sql = `UPDATE sede SET alias = '${alias}' , direccion = '${direccion}' , municipio = '${municipio}' , encargado = ${encargado} WHERE id = ${id}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//Eliminar la sede
app.post('/sede/eliminarSede', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let id = req.body.id;
    const sql = `DELETE FROM sede WHERE id = ${id}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

//-----------------------------BODEGAS e INVENTARIOS-----------------------------------

//Obtener todas las bodegas
app.get('/bodega/getBodegas', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = `SELECT * FROM bodega`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})

app.post('/bodega/getBodegasDeSede', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let sede = req.body.sede;
    const sql = `SELECT * FROM bodega WHERE sede = ${sede}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})


//Nueva Bodega
app.post('/bodega/nuevaBodega', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let nombre = req.body.nombre;
    let direccion = req.body.direccion;
    let estado = req.body.estado;
    let encargado = req.body.encargado;
    let sede = req.body.sede;
    const sql = `INSERT INTO bodega(nombre,direccion,estado,encargado,sede) VALUES('${nombre}','${direccion}',${estado},${encargado},${sede})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//modificar datos bodega
app.post('/bodega/modificarBodega', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let id = req.body.id;
    let nombre = req.body.nombre;
    let direccion = req.body.direccion;
    let estado = req.body.estado;
    let encargado = req.body.encargado;
    let sede = req.body.sede;
    const sql = `UPDATE bodega SET nombre = '${nombre}' , direccion = '${direccion}' , estado = ${estado}, encargado = ${encargado}, sede = ${sede} WHERE id = ${id}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


//Obtener inventario de una bodega
app.post('/bodega/getInventario', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let bodega = req.body.ID_bodega;
    const sql = `SELECT * FROM inventario WHERE ID_bodega = ${bodega}`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Agregar un proucto al inventario de la bodega
app.post('/bodega/agregarInventario', (req, res) => {

    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let bodega = req.body.ID_bodega;
    let producto = req.body.ID_producto;
    let cantidad = req.body.cantidad;

    const sql = `INSERT INTO inventario(ID_bodega,ID_producto,cantidad) VALUES(${bodega},${producto},${cantidad})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });

})


//Modificar la cantidad de productos en el inventario de una bodega
app.post('/bodega/modificarInventario', (req, res) => {
    var con = mysql.createConnection({
        multipleStatements: true,
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let bodega = req.body.ID_bodega;
    let producto = req.body.ID_producto;
    let cantidad = req.body.cantidad;
    let motivo = req.body.motivo;
    let usuario = req.body.usuario;
    let fecha = req.body.fecha;

    const sql = `INSERT INTO log_inventario(ID_bodega,ID_producto,cant_nueva,cant_vieja,motivo,ID_usuario,fecha) VALUES(${bodega},${producto},${cantidad},(SELECT cantidad FROM inventario where ID_bodega = ${bodega} and ID_producto = ${producto}),'${motivo}',${usuario},STR_TO_DATE('${fecha}', "%d/%m/%Y"));
    UPDATE inventario SET cantidad = ${cantidad} WHERE ID_bodega = ${bodega} and ID_producto = ${producto};`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Log de Bodega
app.post('/bodega/getLogBodega', (req, res) => {
    var con = mysql.createConnection({
        multipleStatements: true,
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let bodega = req.body.ID_bodega;

    const sql = `SELECT * FROM log_inventario`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//-----------------------------PRODUCTO-----------------------------------
//Obtener todos los productos
app.get('/producto/getProductos', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = 'SELECT * FROM producto';
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Nuevo producto
app.post('/producto/nuevoProducto', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    let SKU = req.body.SKU;
    let codigo_barras = req.body.codigo_barras;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;

    const sql = `INSERT INTO producto(SKU,codigo_barras,nombre,descripcion,precio) VALUES(${SKU},${codigo_barras},'${nombre}','${descripcion}',${precio})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


//-----------------------------CATEGORIA-----------------------------------

//Obtener todas las categorias
app.get('/categoria/getCategoria', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = 'SELECT * FROM categoria';
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Nueva categoria
app.post('/categoria/nuevaCategoria', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let nombre = req.body.nombre;
    const sql = `INSERT INTO categoria(nombre) VALUES('${nombre}')`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})


//Asigna una categoria a un producto

app.post('/categoria/asignarCategoriaProducto', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let producto = req.body.ID_producto;
    let categoria = req.body.ID_categoria;
    const sql = `INSERT INTO producto_categoria(ID_categoria,ID_producto) VALUES(${categoria},${producto})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//-----------------------------CLIENTE-----------------------------------
//Obtener todos los clientes
app.get('/cliente/getClientes', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = 'SELECT * FROM cliente';
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})

//Insertar un nuevo cliente
app.post('/cliente/nuevoCliente', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let nombre = req.body.nombre;
    let DPI = req.body.DPI;
    let NIT = req.body.NIT;
    let direccion = req.body.direccion;
    let sede = req.body.sede;
    const sql = `INSERT INTO cliente(nombre,DPI,NIT,direccion,sede) VALUES('${nombre}','${DPI}','${NIT}','${direccion}',${sede})`;
    console.log(sql);
    con.connect((err) => {
        if (err) {
            res.json({ "error": "No se pudo conectar a la BD " + err });
            con.end();
        } else {
            console.log("Connectado a la DB");
            con.query(sql, (err, result) => {
                if (err) {
                    console.log("Error en el query " + err)
                    res.json({ "error": "Error en el query" + err });
                    con.end();
                } else {
                    console.log("Result: " + result);
                    res.json(result);
                    con.end();
                }
            });
        }
    });
})
