const http = require("node:http");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const fs = require("node:fs");


const puerto = 3000;
const llave_secreta = "xdcfgvnjmkdcfgvlkmnbhjdercfvhujn";

/*CONEXION A BASE DE DATOS*/
const conexion_db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hogwarts_spellbook"
});

/*TESTING CONEXION DE BASE DE DATOS*/
conexion_db.connect(err => {
    if (err) {
        console.error("Error al conectar a DB:", err);
    } 
    else {
        console.log("Conectado baby");
    }
});

let imagenBuffer;
imagenBuffer = fs.readFileSync("./default_content/profilePic.jpg");

var arreglo_Houses = [];;
fs.readdir("./Houses_json", (err, files) =>{
    for(i=0; i< files.length; i++){
        fs.readFile("./Houses_json/" + files[i], "utf-8", (err, file) =>{
            arreglo_Houses.push(JSON.parse(file));
        })
    }
}); 

var arreglo_Spells = [];;
fs.readdir("./Spells", (err, files) =>{
    for(i=0; i< files.length; i++){
        fs.readFile("./Spells/" + files[i], "utf-8", (err, file) =>{
            arreglo_Spells.push(JSON.parse(file));
        })
    }
}); 



//CREACION DEL SERVER
const server = http.createServer(async (request, response) => {
    // CABECERAS CORS
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    //METODOS
    switch (request.method) {

        //CASE GET IN THEORY THE EASIEST BUT DAMN IT WAS HARDDDDD (Hubiera hecho otra api fr)
        case "GET":
            switch(request.url){
                //CASE NORMAL/GENERAL
                case "/":
                    console.log("me voy a matar alv si no funciona");
                    const authHeader = request.headers["authorization"];
                        if (!authHeader) {
                            response.writeHead(401);
                            return response.end(JSON.stringify(
                                { 
                                    mensaje: "Token no proporcionado" 
                                }
                            ));
                        }
        
                        //TOKEN
                        var token;
                        if (authHeader.startsWith("Bearer ")) 
                        {
                            token = authHeader.slice(7).trim();
                        } 
                        else 
                        {
                            token = authHeader;
                        }
        
                        jwt.verify(token, llave_secreta, (err, decoded) => {
                            if (err) {
                                response.writeHead(401);
                                return response.end(JSON.stringify(
                                    { 
                                        mensaje: "Token inválido o expirado" 
                                    }
                                ));
                            }
        
                            //CONEXION Y QUERY A BASE DE DATOS
                            conexion_db.query("SELECT * FROM `user` WHERE id = ?", [decoded.id], (err, results) => {
                                if (err){
                                    response.writeHead(500);
                                    return response.end(JSON.stringify(
                                        { 
                                            mensaje: "Error de servidor" 
                                        }
                                    ));
                                }
        
                                if (!results.length){
                                    response.writeHead(404);
                                    return response.end(JSON.stringify(
                                        { 
                                            mensaje: "Usuario no encontrado" 
                                        }
                                    ));
                                }
                                
                                response.writeHead(200);
                                console.log("hola, estamos conectando a la people")
                                return response.end(JSON.stringify({
                                    mensaje: "Acceso concedido",
                                    usuario: results[0]
                                }));
                            }
                        );
                    });
                break; 
                case "/default_info":
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(profilePicDefault));
                break;    
                //CASE DE CANTIDAD CASAS
                case "/houses_cantidad":
                    var casasDisponibles = {
                        "casasDisponibles": arreglo_Houses.length
                    }
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(casasDisponibles));
                break;
                
                //GRYFFINDOR
                case "/gryffindor": 
                    var casaEncontrada = null;
                    for (i = 0; i < arreglo_Houses.length; i++) {
                        const casa = arreglo_Houses[i];
                        if (casa.houseName === "Gryffindor") {
                            casaEncontrada = casa;
                            break;
                        }
                    }
                    if (casaEncontrada) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(casaEncontrada));
                    } 
                    else {
                        response.statusCode = 404;
                        response.end(JSON.stringify({ mensaje: "Casa no existe" }));
                    }
                break;

                //SLYTHERIN
                case "/slytherin": 
                    var casaEncontrada = null;
                    for (i = 0; i < arreglo_Houses.length; i++) {
                        const casa = arreglo_Houses[i];
                        if (casa.houseName === "Slytherin") {
                            casaEncontrada = casa;
                            break;
                        }
                    }
                    if (casaEncontrada) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(casaEncontrada));
                    } 
                    else {
                        response.statusCode = 404;
                        response.end(JSON.stringify({ mensaje: "Casa no existe" }));
                    }
                break;

                //RAVECLAW
                case "/ravenclaw":
                    var casaEncontrada = null;
                    for (i = 0; i < arreglo_Houses.length; i++) {
                        const casa = arreglo_Houses[i];
                        if (casa.houseName === "Ravenclaw") {
                            casaEncontrada = casa;
                            break;
                        }
                    }
                    if (casaEncontrada) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(casaEncontrada));
                    } 
                    else {
                        response.statusCode = 404;
                        response.end(JSON.stringify({ mensaje: "Casa no existe" }));
                    }
                break;

                //HUFFLEPUFF
                case "/hufflepuff":
                    var casaEncontrada = null;
                    for (i = 0; i < arreglo_Houses.length; i++) {
                        const casa = arreglo_Houses[i];
                        if (casa.houseName === "Hufflepuff") {
                            casaEncontrada = casa;
                            break;
                        }
                    }
                    if (casaEncontrada) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(casaEncontrada));
                    } 
                    else {
                        response.statusCode = 404;
                        response.end(JSON.stringify({ mensaje: "Casa no existe" }));
                    }
                break;

                //CASE DE LOS HECHIZOS DEL USUARIO 
                case "/spells": {

                    const tokenSpell = request.headers["authorization"];
                
                    if (!tokenSpell) {
                        response.statusCode = 401;
                        response.setHeader("Content-Type", "application/json");
                        return response.end(JSON.stringify({ mensaje: "No se proporcionó el token" }));
                    }
                
                    const decoded = jwt.verify(tokenSpell, llave_secreta);
                
                    // Obtener todos los hechizos del usuario
                    conexion_db.query(
                        "SELECT * FROM spells WHERE id_user = ?",
                        [decoded.id],
                        (err, results) => {
                
                            if (err) {
                                console.error("Error al consultar spells:", err);
                                response.statusCode = 500;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({ mensaje: "Error en la base de datos" }));
                            }
                
                            // Procesar cada hechizo
                            for (let i = 0; i < results.length; i++) {
                
                                /* ──────────────── IMAGEN ──────────────── */
                                if (results[i].image) {
                
                                    // Caso 1: ya viene con encabezado
                                    if (results[i].image.startsWith("data:image")) {
                                        // no tocar
                                    }
                
                                    // Caso 2: viene como base64 puro
                                    else {
                                        results[i].image = "data:image/jpeg;base64," + results[i].image;
                                    }
                                }
                
                                /* ──────────────── VIDEO ──────────────── */
                                if (results[i].video_spell) {
                
                                    // Caso 1: ya viene con encabezado final
                                    if (results[i].video_spell.startsWith("data:video")) {
                                        // no tocar
                                    }
                
                                    // Caso 2: viene como base64 puro (LONGTEXT)
                                    else {
                                        results[i].video_spell =
                                            "data:video/mp4;base64," + results[i].video_spell;
                                    }
                                }
                            }
                
                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({
                                mensaje: "Hechizos obtenidos correctamente",
                                spells: results
                            }));
                        }
                    );
                
                    break;
                }                
                case "/spells_from_database":
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        mensaje: "Aqui se encuentra todos los spells predeterminados",
                        arreglo_Spells: arreglo_Spells
                    }));
                    break;
                default:
                    response.writeHead(404);
                    response.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
                break;
            }
            
        break;

        //CASE POST (AHORITA ES PARA QUE SE VEAN DIFERENTES USUARIOS CON LOGIN, NOTHING ELSE BABYYY) (no hubiera hecho login... why do I hate myself fr)
        //CASE POST AUN NO ESTA TERMINADO, FALTAN EL POST CORREGIDO DE LOS SPELLS, ESTA COMO EN UN 50-60%
        case "POST":
            switch (request.url) {
                //CASE INICIO DE SESION
                case "/iniciar_sesion": {
                    //console.log("he aqui otro console log PRIMERO")
                    var body = "";

                    request.on("data", chunk => { //MISMAS NOTAS QUE LA ANTERIOR en get
                        //console.log("he aqui otro console log")
                        body += chunk;
                    });

                    request.on("end", () => {
                        var accederACuenta  = JSON.parse(body); //acceder a cuenta digamos que va a tener la informacion dada por el usuario
                        // Consultamos los usuarios que tienes.
                        conexion_db.query("SELECT * FROM `user`", (err, resultado) => {
                            if (err) {
                                console.log("error error error helppppppppp:", err);
                                response.statusCode = 500;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
                            }

                            var cuentaEncontrada = false;
                            for (i = 0; i < resultado.length; i++) {
                                const fila = resultado[i];
                                if (accederACuenta.emailSent === fila.email && accederACuenta.passwordSent === fila.password) {
                                    cuentaEncontrada = true;
                                    const token = jwt.sign({id: fila.id, email: fila.email },llave_secreta,{expiresIn: "48h"});
                                    console.log("Log In Succesful BABYYYY:", fila.name);

                                    response.statusCode = 200;
                                    response.setHeader("Content-Type", "application/json");
                                    return response.end(JSON.stringify({
                                        mensaje: `Accede a la cuenta: ${fila.name} de ${fila.house}`,
                                        token_acceso: token,
                                        usuario: {
                                            id: fila.id,
                                            profilepic : fila.profilePic,
                                            name: fila.name,
                                            email: fila.email,
                                            password: fila.password,
                                            house: fila.house
                                        }
                                    }));
                                }
                            }

                            if (!cuentaEncontrada) {
                                response.statusCode = 401;
                                response.setHeader("Content-Type", "application/json");
                                response.end(JSON.stringify({
                                    mensaje: "Usuario o contraseña incorrectos (todo tonto)"
                                }));
                            }
                        });
                    });

                    request.on("error", err => {
                        console.error("Se leyo mal el body:", err.message);
                        response.statusCode = 400;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({ 
                            mensaje: "se proceso mal la solicitud" 
                            }
                        ));
                    });
                break;
                }
                case "/spell_individual":
                    var body = ""; 
                    request.on("data", chunk => { // nota para mi lol: el body esta vacio de forma inicial, los chunk digamos que se trayecta la información. 
                        body += chunk;
                    });
                    request.on("end", () =>{
                        const data = JSON.parse(body);
                        const { idSpellIndividual } = data;
                        const idBuscado = Number(idSpellIndividual); 
                        console.log("El id pedido es es: " + idBuscado);
                        var spellEspecificoEncontrado
                        for (let i = 0; i < arreglo_Spells.length; i++) {
                            const spellEspecifico = arreglo_Spells[i];
                            if (spellEspecifico.id === idBuscado) {
                                spellEspecificoEncontrado = spellEspecifico;
                                break;
                            }
                        }
                        if (spellEspecificoEncontrado) {
                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify(spellEspecificoEncontrado));
                        } 
                        else {
                            response.statusCode = 404;
                            response.end(JSON.stringify({ mensaje: "Spell no existente" }));
                        }
                    });
                break;
                case "/crear_cuenta":{
                    let body = "";
                    console.log("Si entramos")
                    request.on("data", chunk => body += chunk);
                    request.on("end", () =>{
                        const data = JSON.parse(body);
                        //CC = CrearCuenta
                        //no mandamos la imagen del usuario porque la ponemos mas abajo.(y ademas se me olvido pone runa opcion jeje)
                        const { cc_name, cc_email, cc_password , cc_house } = data;
                        console.log("El nombre de usuario es: " + cc_name);
                        console.log("Y su correo: " + cc_email);

                        //conexion_db.query("SELECT user FROM ")
                        conexion_db.query("SELECT email FROM `user` WHERE email = ?",[cc_email], (err, resultado) => {
                            if (err) {
                                console.log("error error error helppppppppp:", err);
                                response.statusCode = 500;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({ mensaje: "Error interno del servidor." }));
                            }
                            
                            if(resultado.length > 0){
                                response.statusCode = 400;
                                response.setHeader('Content-Type', 'application/json');
                                return response.end(JSON.stringify({
                                    "mensaje": "Ya existe un usuario con ese nombre."
                                }));
                            }
                            

                            // como no existe la cuenta, la creamos lol
                            conexion_db.query("INSERT INTO `user` (name, profilePic , email, password, house) VALUES (?, ?, ?, ?, ?)", [cc_name, imagenBuffer, cc_email, cc_password, cc_house], (err, resultadoDos) =>{
                                if(err){
                                    console.log(err)
                                    response.statusCode = 500;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify({"mensaje": "Error al crear la cuenta"}))
                                    return;
                                }
                                else{
                                    response.statusCode = 200;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify({
                                        "mensaje": "Cuenta creada correctamente",
                                        "email": cc_email,
                                        "contrasena": cc_password
                                    }));
                                }
                            });
                        });
                    })
                    break;
                }
                //CASI TERMINADO, FALTA UNOS DETALLITOS
                case "/create_spell":
                    const tokenSpell = request.headers["authorization"];
                    if (!tokenSpell) {
                        response.statusCode = 401;
                        response.setHeader("Content-Type", "application/json");
                        return response.end(JSON.stringify({ 
                            mensaje: "No se proporcionó el token" 
                        }));
                    }

                    let bodyCreate = "";
                    request.on("data", chunk => bodyCreate += chunk);

                    request.on("end", () => {
                        let decoded;
                        try {
                            decoded = jwt.verify(tokenSpell, llave_secreta);
                        } catch (error) {
                            response.statusCode = 403;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({ 
                                mensaje: "Token inválido" 
                            }));
                        }

                        const data = JSON.parse(bodyCreate);
                        const { cs_image, cs_name_spell, cs_type_spell, cs_video_spell, cs_description, cs_uses } = data;

                        const query = `INSERT INTO spells (id_user, id_database_spell, image, name_spell, type_spell, video_spell, description_spell, uses_spell) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                        const valores = [
                            decoded.id,       
                            1,                 
                            cs_image,
                            cs_name_spell,
                            cs_type_spell,
                            cs_video_spell,  
                            cs_description,
                            cs_uses
                        ];

                        conexion_db.query(query, valores, (err, resultado) => {
                            if (err) {
                                console.log(err);
                                response.statusCode = 500;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({ mensaje: "Error al crear el spell" }));
                            }

                            const idGenerado = resultado.insertId;

                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                mensaje: "Spell creado correctamente",
                                id_spell: idGenerado   //ID generado por MySQL
                            }));
                        });
                    });
                break;


            }
        break;
        
        case "PUT":
            switch(request.url){
                case "/actualizar_datos":
                    const tokenActualizar = request.headers["authorization"];
                    if (!tokenActualizar) {
                        response.statusCode = 401;
                        response.setHeader("Content-Type", "application/json");
                        return response.end(JSON.stringify({ mensaje: "No se proporcionó el token" }));
                    }

                    let body = "";
                    request.on("data", chunk =>{
                        body += chunk
                    });

                    console.log("Si se ejecuto el PUT");

                    request.on("end", () =>{
                        const decoded = jwt.verify(tokenActualizar, llave_secreta);
                        const data = JSON.parse(body);
                        const {ac_image, ac_nombre, ac_email, ac_password, ac_house} = data;
                        console.log("Esta es la imagen que pusimos", ac_image);

                        let cambios = 0;
                        //IMAGEN
                        if (ac_image) {
                            conexion_db.query("UPDATE user SET profilePic = ? WHERE id = ?", [ac_image, decoded.id]);
                            cambios++;
                        }
                        //NOMBRE DEL USUARIO
                        if (ac_nombre) {
                            conexion_db.query("UPDATE user SET name = ? WHERE id = ?", [ac_nombre, decoded.id]);
                            cambios++;
                        }
                        //EMAIL USUARIO
                        if (ac_email) {
                            conexion_db.query("UPDATE user SET email = ? WHERE id = ?", [ac_email, decoded.id]);
                            cambios++;
                        }
                        //CONTRASENA
                        if (ac_password) {
                            conexion_db.query("UPDATE user SET password = ? WHERE id = ?", [ac_password, decoded.id]);
                            cambios++;
                        }
                        //CASA USUAIOR
                        if (ac_house) {
                            conexion_db.query("UPDATE user SET house = ? WHERE id = ?", [ac_house, decoded.id]);
                            cambios++;
                        }

                        if (cambios === 0) {
                            response.statusCode = 400;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({ 
                                mensaje: "No se envió ningún dato para actualizar" 
                            }));
                        }

                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            mensaje: "Datos actualizados correctamente",
                            cambios: cambios
                        }));
                    })
                break;
                //CASE PARA LA ACTUALIZACION DE SPELLS
                case "/actualizar_spells": {
                    const tokenSpell = request.headers["authorization"];
                
                    if (!tokenSpell) {
                        response.statusCode = 401;
                        response.setHeader("Content-Type", "application/json");
                        return response.end(JSON.stringify({ 
                            mensaje: "No se proporcionó el token" 
                        }));
                    }
                
                    let bodyUpdate = "";
                    request.on("data", chunk => bodyUpdate += chunk);
                
                    request.on("end", () => {
                        const decoded = jwt.verify(tokenSpell, llave_secreta);
                        const data = JSON.parse(bodyUpdate);
                
                        const {
                            sa_id_spells,
                            sa_image,
                            sa_name_spell,
                            sa_type_spell,
                            sa_description,
                            sa_uses
                        } = data;
                
                        if (!sa_id_spells) {
                            response.statusCode = 400;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({ 
                                mensaje: "Falta el ID del spell" 
                            }));
                        }
                
                        //IMPORTANTE: video_spell ya NO se actualiza aquí
                        const query = `UPDATE spells SET image = ?, name_spell = ?, type_spell = ?, description_spell = ?, uses_spell = ? WHERE id_spells = ? AND id_user = ?`;
                        conexion_db.query(query,
                            [
                                sa_image,
                                sa_name_spell,
                                sa_type_spell,
                                sa_description,
                                sa_uses,
                                sa_id_spells,
                                decoded.id
                            ],
                            (err, resultado) => {
                                if (err) {
                                    console.error(err);
                                    response.statusCode = 500;
                                    response.setHeader("Content-Type", "application/json");
                                    return response.end(JSON.stringify({ mensaje: "Error al actualizar el spell" }));
                                }
                
                                response.statusCode = 200;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({
                                    mensaje: "Spell actualizado correctamente",
                                    id_spell: sa_id_spells
                                }));
                            }
                        );
                    });
                
                    break;
                }
                
                

                // como va a funcionar esto: en dado caso que video no sea null entonces actulizar spell video se va a realizar su fetch. ¿Porqué hacemos esto? Me fijé que no puedo subir blobs en json, en las imagenes no tengo problema porque son longtext. Pero si quiero guardar el video dentro de la propia base de datos, vaos a tener que hacer este segundo fetch que solo se encargue de los videos.  Creo que puede funcionar y no tengo que rehacer cada case que ya hice lol
                /*case "/actualizar_video_spell": {

                    const tokenVideo = request.headers["authorization"];
                
                    if (!tokenVideo) {
                        response.statusCode = 401;
                        response.setHeader("Content-Type", "application/json");
                        return response.end(JSON.stringify({ mensaje: "No se proporcionó el token" }));
                    }
                
                    let bodyVid = "";
                    request.on("data", chunk => bodyVid += chunk);
                
                    request.on("end", () => {
                
                        const decoded = jwt.verify(tokenVideo, llave_secreta);
                
                        const data = JSON.parse(bodyVid);
                        const { av_id_spells, av_video_spell } = data;
                
                        // Validación correcta
                        if (!av_id_spells || !av_video_spell) {
                            response.statusCode = 400;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({
                                mensaje: "Faltan datos: se requiere el id del hechizo y el video en base64"
                            }));
                        }
                
                        // Actualizar en BD (LONGTEXT)
                        conexion_db.query(
                            "UPDATE spells SET video_spell = ? WHERE id_spell = ? AND id_user = ?",
                            [av_video_spell, av_id_spells, decoded.id],
                            (err, result) => {
                
                                if (err) {
                                    console.error("Error al actualizar video:", err);
                                    response.statusCode = 500;
                                    response.setHeader("Content-Type", "application/json");
                                    return response.end(JSON.stringify({ mensaje: "Error al guardar en la base de datos" }));
                                }
                
                                response.statusCode = 200;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({
                                    mensaje: "Video actualizado correctamente",
                                    id_spell: av_id_spells
                                }));
                            }
                        );
                
                    });
                
                    break;
                }*/                
                    case "/actualizar_video_spell": {

                        const tokenVideo = request.headers["authorization"];
                    
                        if (!tokenVideo) {
                            response.statusCode = 401;
                            response.setHeader("Content-Type", "application/json");
                            return response.end(JSON.stringify({ mensaje: "No se proporcionó el token" }));
                        }
                    
                        let bodyVid = "";
                        request.on("data", chunk => bodyVid += chunk);
                    
                        request.on("end", () => {
                    
                            const decoded = jwt.verify(tokenVideo, llave_secreta);
                            const data = JSON.parse(bodyVid);
                    
                            const { av_id_spells, av_video_spell } = data;
                    
                            // Validación correcta
                            if (!av_id_spells || !av_video_spell) {
                                response.statusCode = 400;
                                response.setHeader("Content-Type", "application/json");
                                return response.end(JSON.stringify({
                                    mensaje: "Faltan datos: se requiere el id del hechizo y el video en base64"
                                }));
                            }
                    
                            // Guardar en LONGTEXT
                            conexion_db.query(
                                "UPDATE spells SET video_spell = ? WHERE id_spells = ? AND id_user = ?",
                                [av_video_spell, av_id_spells, decoded.id],
                                (err, result) => {
                    
                                    if (err) {
                                        console.error("Error al actualizar video:", err);
                                        response.statusCode = 500;
                                        response.setHeader("Content-Type", "application/json");
                                        return response.end(JSON.stringify({ mensaje: "Error al guardar en la base de datos" }));
                                    }
                    
                                    response.statusCode = 200;
                                    response.setHeader("Content-Type", "application/json");
                                    return response.end(JSON.stringify({
                                        mensaje: "Video actualizado correctamente",
                                        id_spell: av_id_spells
                                    }));
                                }
                            );
                    
                        });
                    
                        break;
                    }
                    


            }
            //response.writeHead(404);
            //response.end(JSON.stringify({ mensaje: "PUT ain't here yet buddy" }));
            break;

        case "DELETE":
            //response.writeHead(404);
            //response.end(JSON.stringify({ mensaje: "DELETE ain't here yet buddy" }));
            console.log("Entró DELETE");
            const tokenDelete = request.headers["authorization"];
            if (!tokenDelete) {
                response.writeHead(401);
                return response.end(JSON.stringify({ 
                    mensaje: "No se proporcionó token" 
                }));
            }

            var decoded = jwt.verify(tokenDelete, llave_secreta);

            if (!decoded) {
                response.writeHead(401);
                return response.end(JSON.stringify({ 
                    mensaje: "Token inválido" 
                }));
            }

            if (!request.url.startsWith("/delete_spell/")) {
                response.writeHead(404);
                return response.end(JSON.stringify({ 
                    mensaje: "Ruta no encontrada" 
                }));
            }

            const idSpell = request.url.split("/")[2];
            console.log("ID recibido para borrar:", idSpell);

            conexion_db.query("SELECT id_spells FROM spells WHERE id_spells = ? AND id_user = ?", [idSpell, decoded.id], function (error, resultado) {
                if (error) {
                    console.log(error);
                    response.writeHead(500);
                    response.end(JSON.stringify({ 
                        mensaje: "Error SELECT" 
                    }));
                }

                if (resultado.length === 0) {
                    response.writeHead(404);
                    response.end(JSON.stringify({
                        mensaje: "Este spell no existe o no es tuyo"
                    }));
                }

                //ELIMINAR SPELL
                conexion_db.query("DELETE FROM spells WHERE id_spells = ? AND id_user = ?", [idSpell, decoded.id], function (error2, resultado2) {
                    if (error2) {
                        console.log(error2);
                        response.writeHead(500);
                        return response.end(JSON.stringify({ 
                            mensaje: "Error eliminando" 
                        }));
                    }

                    response.writeHead(200);
                    return response.end(JSON.stringify({
                        mensaje: "Spell borrado correctamente",
                        id_borrado: idSpell
                    }));
                });
            });
        break;

        case "OPTIONS":
            response.writeHead(204);
            return response.end();
        break;

        default:
            response.writeHead(404);
            response.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
        break;
    }
});

server.listen(puerto, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});
