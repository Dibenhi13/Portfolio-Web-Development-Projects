var token = sessionStorage.getItem("tokenSesion");
//alert(token) 
const body = document.body;
const contenedor = document.querySelector(".galeriaHechizos");
const plantilla_spells = document.querySelector(".tarjetaHechizo");
// as
let idFuturoDeSpellParaEditar = 0; //este es un
if (!token) {
    window.location.href = "404.html";
}
const popupEditarAPI = document.querySelector('#popupEditar');

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
            console.log(respuesta.usuario)
            console.log(respuesta.usuario.id)

            body.classList.remove(
                "theme-gryffindor",
                "theme-slytherin",
                "theme-hufflepuff",
                "theme-ravenclaw"
            );

            //COLOR PALETTE
            switch(respuesta.usuario.house.toLowerCase()){
                //GRYFFINDOR
                case "gryffindor":
                    fetch("http://localhost:3000/gryffindor").then(casita => casita.json()).then(respuestaCasa => {
                        body.classList.add("theme-gryffindor", "myHouse");
                    })
                    
                console.log("hooooooola")
            break;
            //SLYTHERIN HOUSE (BEST ONE BTW)
            case "slytherin":
                    fetch("http://localhost:3000/slytherin").then(casita => casita.json()).then(respuestaCasa => {
                        body.classList.add("theme-slytherin", "myHouse");
                    });
                console.log("hooooooola")
            break;

            //HUFFLEPUFF
            case "hufflepuff":
                    fetch("http://localhost:3000/hufflepuff").then(casita => casita.json()).then(respuestaCasa => {
                        body.classList.add("theme-hufflepuff", "myHouse");
                    });
                    
                console.log("hooooooola")
            break;

            //RAVENCLAW
            case "ravenclaw":
                    fetch("http://localhost:3000/ravenclaw").then(casita => casita.json()).then(respuestaCasa => {
                        body.classList.add("theme-ravenclaw", "myHouse");
                    });
                    
                console.log("hooooooola")
            break;
            }


            //SPELLS GET THINGY
            fetch("http://localhost:3000/spells", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token 
                }
            }).then(recursoSpell=>{
                if(recursoSpell.status == 200){
                    recursoSpell.json().then(respuestaSpell=>{
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                        console.log(respuestaSpell)
                        //console.log(tarjetaHechizo)
                        console.log(respuestaSpell.spells);
                        animarBarra(respuestaSpell.spells.length);

                        for(let i=0; i < respuestaSpell.spells.length; i++){
                            const clon = plantilla_spells.cloneNode(true);
                            contenedor.appendChild(clon);
                            //clon.style.backgroundColor = 'red'; 
                            const imageSpell = clon.querySelector(".imageSpell");
                            const foto = respuestaSpell.spells[i].image;

                            //CASE 1: COMES AS DATA IMAGE
                            if (foto.startsWith("data:image")) {
                                imageSpell.src = foto;
                            }
                            //CASE 2: COMES AS BASE64
                            else {
                                imageSpell.src = "data:image/jpeg;base64," + foto;
                            }
                            //imageSpell.src = "data:image/jpeg;base64," + respuestaSpell.spells[i].image;
                            //imageSpell.src = "ImagenesFinales/SPELLS-ICONS/placeholder.webp"

                            const titleSpell = clon.querySelector(".titleSpell");
                            titleSpell.innerHTML = respuestaSpell.spells[i].name_spell;

                            const typeSpell = clon.querySelector(".typeSpell");
                            typeSpell.innerHTML = respuestaSpell.spells[i].type_spell;

                            switch(respuestaSpell.spells[i].type_spell.toLowerCase()){
                                case "control":
                                    clon.classList.add('control');
                                break;
                                case "damage":
                                    clon.classList.add('damage');
                                break;
                                case "essential":
                                    clon.classList.add('essential');
                                break;
                                case "force":
                                    clon.classList.add('force');
                                break;
                                case "utility":
                                    clon.classList.add('utility');
                                break;
                                case "unforgivable curse":
                                    clon.classList.add('unforgivable');
                                break;
                            }
                            

                            /*CODIGO DE INFO SPELL POP UP */ 
                            const btnEditarClon = clon.querySelector(".btnEditar");

                            const nombre = respuestaSpell.spells[i].name_spell;
                            const tipo   = respuestaSpell.spells[i].type_spell;
                            const desc   = respuestaSpell.spells[i].description_spell;
                            const usos   = respuestaSpell.spells[i].uses_spell;
                            const imagen = respuestaSpell.spells[i].image;
                            const video  = respuestaSpell.spells[i].video_spell;
                            const idFuturoDeSpellParaEditarDos = respuestaSpell.spells[i].id_spells;

                            //idFuturoDeSpellParaEditar = respuesta.spells[i].id;
                            //console.log(respuestaSpell.spells[i].video_spell)
                            // Abrir popup al dar click al botón editar de cada clon
                            btnEditarClon.addEventListener("click", function () {
                                popupEditar.style.display = "block";
                                document.body.classList.add("no-scroll");
                                console.log("tu respuesta es tadaaaaaaaaan: ");
                                //console.log(idFuturoDeSpellParaEditarDos)
                                idFuturoDeSpellParaEditar = idFuturoDeSpellParaEditarDos;
                                
                                
                                /*console.log(imagen_base64_2)
                                console.log(nombre);
                                console.log(desc);*/
                                //REFERENCIAS
                                const popupImagen = document.querySelector("#popupImagen");
                                if (imagen && imagen.data) {
                                    console.log("DECODIFICANDO PARA POPUP…");
                                    const base64String = new TextDecoder().decode(new Uint8Array(imagen.data));
                                    popupImagen.src = "data:image/jpeg;base64," + base64String;
                                } 
                                else if (typeof imagen === "string") {
                                    popupImagen.src = imagen;
                                }
                                const uploadImagen = document.querySelector("#uploadImagen");
                                uploadImagen.addEventListener("change", function(){
                                    var archivo = uploadImagen.files[0];
                                    const reader = new FileReader();
                                    reader.readAsDataURL(archivo)
                                    reader.onload = function(){
                                        popupImagen.src = reader.result;
                                    }
                                });
                                console.log(idFuturoDeSpellParaEditarDos)
                                const popupNombre = document.querySelector("#popupNombre");
                                popupNombre.value = nombre;
                                const popupTipo = document.querySelector("#popupTipo");
                                popupTipo.value = tipo;
                                const popupDescripcion = document.querySelector("#popupDescripcion");
                                popupDescripcion.value = desc;
                                const popupUsos = document.querySelector("#popupUsos");
                                popupUsos.value = usos;
                                //VIDEO DESPUES SE ARREGLA (LISTO LOL)

                                // PREVISUALIZACIÓN CORRECTA DEL VIDEO
                                const popupVideo = document.querySelector("#popupVideo");
                                const popupVideoSrc = document.querySelector("#popupVideoSrc");

                                //LIMPIAR SIEMPRE ANTES
                                popupVideoSrc.removeAttribute("src");

                                //VASE64 NORMAL
                                if (typeof video === "string" && video.startsWith("data:video")) {
                                    popupVideoSrc.src = video;
                                }
                                //BASE64
                                else if (typeof video === "string" && video.length > 50) {
                                    popupVideoSrc.src = "data:video/mp4;base64," + video;
                                }
                                //BUFFER
                                else if (video && video.data) {
                                    const bytes = new Uint8Array(video.data);
                                    const blob = new Blob([bytes], { type: "video/mp4" });
                                    popupVideoSrc.src = URL.createObjectURL(blob);
                                }
                                //NO VIDEO
                                else {
                                    popupVideoSrc.src = "";
                                }

                                popupVideo.load();

                                //COLORES DE CARTAS
                                const popupContenido = document.querySelector(".popupContenido");
                                const popupCampos = document.querySelectorAll(".popupCampo");

                                // LIMPIAR CLASES ANTERIORES PORQUE SOBREESCRIBIA OTRAS TARJETAS
                                popupContenido.classList.remove("control","damage","essential","force","utility","unforgivable");
                                for (let j = 0; j < popupCampos.length; j++) {
                                    popupCampos[j].classList.remove("control","damage","essential","force","utility","unforgivable");
                                }
                                
                                switch(respuestaSpell.spells[i].type_spell.toLowerCase()){
                                    case "control":
                                        popupContenido.classList.add('control');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("control");
                                        }
                                    break;
                                    case "damage":
                                        popupContenido.classList.add('damage');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("damage");
                                        }
                                    break;
                                    case "essential":
                                        popupContenido.classList.add('essential');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("essential");
                                        }
                                    break;
                                    case "force":
                                        popupContenido.classList.add('force');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("force");
                                        }   
                                    break;
                                    case "utility":
                                        popupContenido.classList.add('utility');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("utility");
                                        }
                                    break;
                                    case "unforgivable curse":
                                        popupContenido.classList.add('unforgivable');
                                        for (let j = 0; j < popupCampos.length; j++) {
                                            popupCampos[j].classList.add("unforgivable");
                                        }
                                    break;
                                }

                                //BORRAR HECHIZOS
                                const btnBorrarHechizo = document.querySelector("#btnBorrarHechizo");
                                btnBorrarHechizo.addEventListener("click", function () {
                                    const token = sessionStorage.getItem("tokenSesion");
                                    fetch("http://localhost:3000/delete_spell/" + idFuturoDeSpellParaEditar, {
                                        method: "DELETE",
                                        headers: {
                                            "Authorization": token
                                        }
                                    })
                                    .then(function(res) {
                                        return res.json();
                                    })
                                    .then(function(data) {
                                        alert(data.mensaje);
                                        location.reload();
                                    });
                                });
                            });
                        }
                        plantilla_spells.remove();

                        btnCancelarPopup.addEventListener("click", function () {
                            popupEditar.style.display = "none";
                            document.body.classList.remove("no-scroll");
                        });

                        btnGuardarPopup.addEventListener("click", function () {

                            const popupNombre = document.querySelector("#popupNombre");
                            const popupTipo = document.querySelector("#popupTipo");
                            const popupDescripcion = document.querySelector("#popupDescripcion");
                            const popupUsos = document.querySelector("#popupUsos");
                            const popupVideo = document.querySelector("#uploadVideo");
                            const popupImagen = document.querySelector("#uploadImagen");
                            const imagenActual = document.querySelector("#popupImagen").src;
                            const token = sessionStorage.getItem("tokenSesion");
                        
                            //UPDATE EVERYTHINGGGG THEN VIDEO
                            const data = {
                                sa_id_spells: idFuturoDeSpellParaEditar,
                                sa_image: imagenActual,
                                sa_name_spell: popupNombre.value,
                                sa_type_spell: popupTipo.value,
                                sa_description: popupDescripcion.value,
                                sa_uses: popupUsos.value
                            };
                        
                            fetch("http://localhost:3000/actualizar_spells", {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": token
                                },
                                body: JSON.stringify(data)
                            })
                            .then(r => r.json())
                            .then(res => {
                                console.log("Spell actualizado:", res);
                        
                                //NO NEW VIDEO, BYE DUDE
                                if (!popupVideo.files[0]) {
                                    alert("Spell actualizado");
                                    location.reload();
                                    return;
                                }
                        
                                //HAY VIDEO PUES SE CONVIERTE A BASE64 Y LUEGO SE HACE EL ENDPOINT
                                archivoABase64(popupVideo.files[0]).then(base64Video => {
                                    const soloBase64 = base64Video.split(",")[1];
                        
                                    return fetch("http://localhost:3000/actualizar_video_spell", {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": token
                                        },
                                        body: JSON.stringify({
                                            av_id_spells: idFuturoDeSpellParaEditar,
                                            av_video_spell: soloBase64
                                        })
                                    });
                                })
                                .then(r => r.json())
                                .then(res => {
                                    console.log("Video actualizado:", res);
                                    alert("Spell y video actualizados");
                                    location.reload();
                                });
                            });
                        });
                    })
                }
                else{
                    console.log("Error, no consegui el spell");
                }
            });
        });
    }
});