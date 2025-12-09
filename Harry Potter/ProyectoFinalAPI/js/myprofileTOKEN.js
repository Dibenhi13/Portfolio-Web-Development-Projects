var token = sessionStorage.getItem("tokenSesion");
//alert(token)
const nameUser = document.querySelector("#name");
const emailUser = document.querySelector("#email");
const passwordUser = document.querySelector("#password");
const myProfilePic = document.querySelector(".myProfilePic");

const houseButtons = document.querySelectorAll(".btnCasa");
const body = document.body;


function archivoABase64(archivo) {
    return new Promise((result, err) => {
        const reader = new FileReader();
        reader.onloadend = () => result(reader.result);
        reader.onerror = err;
        reader.readAsDataURL(archivo);
    });
}

let casaSeleccionada = null;
const botonesCasa = document.querySelectorAll(".btnCasa");

for (let i = 0; i < botonesCasa.length; i++) {
    botonesCasa[i].addEventListener("click", function () {
        for (let j = 0; j < botonesCasa.length; j++) {
            botonesCasa[j].classList.remove("active");
        } 
        botonesCasa[i].classList.add("active");
        casaSeleccionada = botonesCasa[i].value;
    });
}



if (!token) {
    window.location.href = "404.html";
}
fetch("http://localhost:3000/", {
    method: "GET",
    headers:{
        "Authorization": token
    }
}).then(recurso=>{
    console.log("funciono")
    if(recurso.status == 200){
        recurso.json().then(respuesta=>{
            console.log(respuesta.mensaje)
            console.log(respuesta);
            //INFO USUARIO
            nameUser.value = respuesta.usuario.name;
            emailUser.value = respuesta.usuario.email;
            //ARREGLAR UN PROBLEMA CON LA CONTRASENA NO SE QUE PASO WEIRDDD
            passwordUser.value = respuesta.usuario.password;
            //IMAGEN DE USUARIO COMO SE HIZO EN LA FACEBOOK API (HOPEFULLY IT WORKS BRO)
            console.log(respuesta.usuario.profilePic)
            const foto = respuesta.usuario.profilePic;
            //Los usuarios ya gaurdados recien creados son Buffer, los otros son mas base 64 (usuario ya guardado)
            if (foto && foto.data) {
                console.log("DECODIFICANDO BASE64 desde BUFFER…");
                const base64String = new TextDecoder().decode(new Uint8Array(foto.data));
                myProfilePic.src = "data:image/jpeg;base64," + base64String;
            }
            // Si viene como string (solo pasa cuando es usuario nuevo)
            else if (typeof foto === "string") {
                myProfilePic.src = foto;
            }

            //CASA USUARIOP
            const houseUser = respuesta.usuario.house.toLowerCase();
            console.log(houseUser)

            for (j = 0; j < houseButtons.length; j++) {
                houseButtons[j].classList.remove("active");
            }

            var botonInicial = null;
            for (let i = 0; i < houseButtons.length; i++) {
                var btn = houseButtons[i];
                var clases = btn.className.toLowerCase();
                if (clases.includes(houseUser)) {
                    botonInicial = btn;
                    break;
                }
            }
            
            body.className = ""; 
            switch (houseUser) {
                case "gryffindor":
                    body.classList.add("theme-gryffindor", "myProfile");
                    break;

                case "slytherin":
                    body.classList.add("theme-slytherin", "myProfile");
                    break;

                case "hufflepuff":
                    body.classList.add("theme-hufflepuff", "myProfile");
                    break;

                case "ravenclaw":
                    body.classList.add("theme-ravenclaw", "myProfile");
                    break;
            }
            if (botonInicial) 
            {
                botonInicial.classList.add("active");
            }
            
            // BOTÓN GUARDAR CAMBIOS
            const btnGuardar = document.querySelector(".btnGuardar");
            const uploadImagen = document.querySelector("#uploadImagen");

            uploadImagen.addEventListener("change", function(){
                var archivo = uploadImagen.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(archivo)
                reader.onload = function(){
                    myProfilePic.src = reader.result;
                }
            });
            
            btnGuardar.addEventListener("click", function (event) {
                event.preventDefault();

                //VALORES ACTUALES DEL USUARIO
                const nombre = nameUser.value.trim();
                const email = emailUser.value.trim();
                const password = passwordUser.value.trim();
                const archivoImagen = uploadImagen.files[0];

                //CONVERTIR IMAGEN QUE SE SELECCIONO
                if (archivoImagen) {
                    archivoABase64(archivoImagen).then(function (imagenBase64) {
                        enviarActualizacion(nombre, email, password, casaSeleccionada, imagenBase64);
                    });
                } 
                else{
                    enviarActualizacion(nombre, email, password, casaSeleccionada, null);
                }
            });

            function enviarActualizacion(nombre, email, password, house, imagenBase64) {
                //NEW BODY CON LO QUE MANDO EL USUARIO
                const cuerpo = {};
                if (imagenBase64) {
                    const soloBase64 = imagenBase64.split(",")[1];
                    cuerpo.ac_image = soloBase64;
                }
                if (nombre) {
                    cuerpo.ac_nombre = nombre;
                }
                if (email) {
                    cuerpo.ac_email = email;
                }
                if (password) {
                    cuerpo.ac_password = password;
                }
                if (house) {
                    cuerpo.ac_house = house;
                }

                //NO CAMBIOS
                if (Object.keys(cuerpo).length === 0) {
                    alert("No hay cambios para guardar.");
                    return;
                }
                const tokenActualizar = sessionStorage.getItem("tokenSesion");

                fetch("http://localhost:3000/actualizar_datos", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": tokenActualizar
                    },
                    body: JSON.stringify(cuerpo)
                })
                .then(res => res.json())
                .then(data => {
                    console.log("Resultado actualización:", data);

                    if (data.cambios > 0) {
                        alert("Datos actualizados correctamente.");
                        //ACTUALIZAR NUEVA PIC
                        if (imagenBase64) {
                            myProfilePic.src = imagenBase64;
                        }
                    } 
                    else {
                        alert("No se realizaron cambios.");
                    }
                })
            }
        })
    }
})


