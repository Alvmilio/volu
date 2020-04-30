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
//-----------------------------VENTAS y DETALLE_VENTAS-----------------------------------

//Obtener todas las ventas
app.get('/venta/getVentas', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    const sql = 'SELECT * FROM venta';
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

//Insertar nueva venta (tipo = 1)
app.post('/venta/nuevaVentaLocal', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let cliente = req.body.cliente;
    let vendedor = req.body.vendedor;
    let bodega = req.body.bodega;
    let fecha_factura = req.body.fecha_factura;
    let fecha_entrega = req.body.fecha_factura;
    const sql = `INSERT INTO venta(cliente,vendedor,fecha_factura,fecha_entrega,total,tipo,ID_bodega) VALUES(${cliente},${vendedor},STR_TO_DATE('${fecha_factura}', "%d/%m/%Y"),STR_TO_DATE('${fecha_entrega}', "%d/%m/%Y"),0.0,1,${bodega})`;
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

//Insertar detalle a una venta
app.post('/venta/detalleVenta', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let producto = req.body.ID_producto;
    let venta = req.body.ID_venta;
    let cantidad = req.body.cantidad;
    let precio_venta = req.body.precio_venta;

    const sql = `INSERT INTO detalle_venta(producto,venta,cantidad,precio_venta) VALUES(${producto},${venta},${cantidad},${precio_venta})`;
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

//Finalizar venta local
app.post('/venta/finalizarVentaLocal', (req, res) => {
    var con = mysql.createConnection({
        multipleStatements: true,
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let venta = req.body.ID_venta;

    const sql = `UPDATE venta SET total = (SELECT sum(dv.cantidad * dv.precio_venta) from detalle_venta dv WHERE dv.venta = ${venta}) WHERE id = ${venta};
    UPDATE inventario i INNER JOIN (SELECT v.ID_bodega, dv.cantidad, dv.producto from detalle_venta dv, venta v where dv.venta = ${venta} and dv.venta = v.id) c ON c.ID_bodega = i.ID_bodega SET i.cantidad = i.cantidad - c.cantidad WHERE c.producto = i.ID_producto;`;
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


//Insertar nueva venta a domicilio (tipo = 2)
app.post('/venta/nuevaVentaDomicilio', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let cliente = req.body.cliente;
    let vendedor = req.body.vendedor;
    let bodega = req.body.bodega;
    let fecha_factura = req.body.fecha_factura;
    let fecha_entrega = req.body.fecha_entrega;
    const sql = `INSERT INTO venta(cliente,vendedor,fecha_factura,fecha_entrega,total,tipo,ID_bodega) VALUES(${cliente},${vendedor},STR_TO_DATE('${fecha_factura}', "%d/%m/%Y"),STR_TO_DATE('${fecha_entrega}', "%d/%m/%Y"),0.0,2,${bodega})`;
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

//Crear envio de orden a domicilio (estado 1 = Pendiente de entrega)
app.post('/venta/crearEnvioVenta', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let venta = req.body.venta;
    let repartidor = req.body.repartidor;
    let estado = 1;
    const sql = `INSERT INTO envio(venta,repartidor,estado) VALUES(${venta},${repartidor},${estado})`;
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


app.post('/venta/getEnviosRepartidor', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let repartidor = req.body.repartidor;
    const sql = `SELECT * FROM envio WHERE repartidor = ${repartidor}`;
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

//El repartidor confirma la entrega del envio (estado 2 = Entregado)
app.post('/venta/confirmarEntregaEnvio', (req, res) => {
    var con = mysql.createConnection({
        multipleStatements: true,
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let venta = req.body.venta;

    const sql = `UPDATE envio SET estado = 2 WHERE venta = ${venta};
    UPDATE venta SET total = (SELECT sum(dv.cantidad * dv.precio_venta)*1.10 from detalle_venta dv WHERE dv.venta = ${venta}) WHERE id = ${venta};
    UPDATE inventario i INNER JOIN (SELECT v.ID_bodega, dv.cantidad, dv.producto from detalle_venta dv, venta v where dv.venta = ${venta} and dv.venta = v.id) c ON c.ID_bodega = i.ID_bodega SET i.cantidad = i.cantidad - c.cantidad WHERE c.producto = i.ID_producto;`;
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


//-----------------------------FACTURA-----------------------------------

app.post('/factura/getHeader', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let venta = req.body.venta;
    const sql = `select v.ID 'Factura', c.nombre 'Cliente', ve.nombre 'Vendedor' , v.fecha_factura, v.fecha_entrega, v.total, b.nombre 'Bodega' from venta v INNER JOIN cliente c on c.ID = v.cliente INNER JOIN usuario ve on v.vendedor = ve.ID INNER JOIN bodega b on b.ID = v.ID_bodega WHERE v.ID = ${venta}`;
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

app.post('/factura/getDetalle', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let venta = req.body.venta;
    const sql = `select dv.producto, p.nombre, dv.cantidad, dv.precio_venta from detalle_venta dv INNER JOIN producto p on p.ID = dv.producto WHERE dv.venta = ${venta}`;
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

//----------------------------TRANSFERENCIAS----------------------------
//Obtener todas las transferencias
app.get('/transferencia/getTransferencias', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    const sql = `SELECT * FROM transferencia`;
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

//Nueva transferencia interna (tipo = 1 (Interna), tipo = 2 (externa), estado = 1 (Pendiente de autorizar))
app.post('/transferencia/nuevaTransferencia', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    let fecha = req.body.fecha;
    let tipo = req.body.tipo;
    let usuario = req.body.usuario;
    let bodega_fuente = req.body.bodega_fuente;
    let bodega_destino = req.body.bodega_destino;
    let repartidor = req.body.repartidor;
    let estado = 1;
    const sql = `INSERT INTO transferencia(fecha,tipo,usuario,bodega_fuente,bodega_destino,repartidor,estado) VALUES (STR_TO_DATE('${fecha}', "%d/%m/%Y"),${tipo},${usuario},${bodega_fuente},${bodega_destino},${repartidor},${estado})`;
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

//Nuevo detalle_transferencia

app.post('/transferencia/nuevoDetalleTransferencia', (req, res) => {

    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    let transferencia = req.body.transferencia;
    let producto = req.body.producto;
    let cantidad = req.body.cantidad;

    const sql = `INSERT INTO detalle_transferencia(transferencia,producto,cantidad) VALUES (${transferencia},${producto},${cantidad})`;
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

//Obtener detalle de la transferencia

app.post('/transferencia/verDetalleTransferencia', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let transferencia = req.body.transferencia;
    const sql = `SELECT * FROM detalle_transferencia WHERE transferencia = ${transferencia}`;
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

//Autorizar (estado = 2) o denegar (estado = -1) una transferencia
app.post('/transferencia/modificarEstadoTransferencia', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let estado = req.body.estado;
    let usuario = req.body.usuario;
    let transferencia = req.body.transferencia;
    const sql = `UPDATE transferencia SET estado = ${estado}, autorizador = ${usuario} WHERE ID = ${transferencia}`
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


//Confirmar entrega de transferencia (estado 2 a estado 3 (Finalizado))
app.post('/transferencia/confirmarTransferencia', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });
    let transferencia = req.body.transferencia;
    const sql = `CALL finalizar_transferencia(${transferencia})`
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



//----------------------------REPORTES----------------------------
app.post('/reporte/cantVentas', (req, res) => {
    var con = mysql.createConnection({
        host: ipDB,
        user: "admin",
        password: "admin",
        database: "proyecto",
        port: 3306
    });

    let vendedor = req.body.vendedor;
    let sql = `SELECT v.fecha_factura, count(*) 'cantidad' from venta v GROUP BY v.fecha_factura`;
    if (vendedor != 0) {
        sql = `SELECT v.fecha_factura, count(*) 'cantidad' from venta v WHERE v.vendedor = ${vendedor} GROUP BY v.fecha_factura; `
    }
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
