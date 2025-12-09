const carruselSpells = document.querySelector(".carruselSpells");
const plantillaSlide = document.querySelector("#plantillaSlide");
const popupNuevo = document.querySelector("#popupNuevo"); 



let slides = document.querySelectorAll(".carruselSpells .slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

fetch("http://localhost:3000/spells_from_database")
.then(spell => spell.json())
.then(respuestaSpell => {

    console.log("HOLAAAAAAAAAAAA SOT UN CONSOLE LOG");
    console.log(respuestaSpell);

    for (let i = 0; i < respuestaSpell.arreglo_Spells.length; i++) {
        
        const spell = respuestaSpell.arreglo_Spells[i];

        //CLONAR SLIDE
        const clon = plantillaSlide.cloneNode(true);
        clon.id = "";
        clon.style.display = "flex";
        carruselSpells.appendChild(clon);
        clon.dataset.id = spell.id;
        //console.log(spell.id,"HOOOOOOOOOOOOOOOOOOOOLA");

        //RELLENAR DATOS
        const imgSpell = clon.querySelector(".imgSlide");
        imgSpell.src = respuestaSpell.arreglo_Spells[i].imageSpell;
        const nameSlide = clon.querySelector(".nameSlide");
        nameSlide.innerHTML = spell.nameSpell;

        const typeSlide = clon.querySelector(".typeSlide");
        typeSlide.innerHTML = spell.typeSpell;

        const buttonSlide = clon.querySelector(".buttonSlide");
            buttonSlide.addEventListener("click", () => {
               // alert("Hola soy "+ respuestaSpell.arreglo_Spells[i])
                //alert("quiero agregar");
                const slideActual = clon;  
                const idSpell = slideActual.dataset.id;
                
                //alert("ID del spell activo: " + idSpell);
                fetch("http://localhost:3000/spell_individual", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ idSpellIndividual: idSpell })
                })
                .then(response => response.json())
                .then(spellRecogido => {
                    console.log("Datos del spell individual recibido:");
                    console.log(spellRecogido);
                    const inputNombreSpell = document.querySelector("#nuevoNombre");
                    const inputTipoSpell = document.querySelector("#nuevoTipo");
                    const inputDescripcionSpell = document.querySelector("#nuevoDescripcion");
                    const inputUsosSpell = document.querySelector("#nuevoUsos");
                    const nuevoImagen = document.querySelector("#nuevoImagen")
                    inputNombreSpell.value = spellRecogido.nameSpell;
                    inputTipoSpell.value = spellRecogido.typeSpell;
                    nuevoImagen.src = spellRecogido.imageSpell
                    inputDescripcionSpell.value = ""; 
                    inputUsosSpell.value = "";
                    
                    const uploadVideo = document.querySelector("#uploadVideo");
                    const popupVideo = document.querySelector("#popupVideo");
                    const popupVideoSrc = document.querySelector("#popupVideoSrc");

                    /*
                    uploadVideo.onchange = function () {
                        const archivo = uploadVideo.files[0];
                        if (!archivo) return;

                        const reader = new FileReader();
                        reader.readAsDataURL(archivo);

                        reader.onload = function () {
                            popupVideoSrc.src = reader.result; // base64 del video
                            popupVideo.load();                 // recargar reproductor
                        };
                    };*/
                    //COLORES DE CARTAS (NUEVO SPELL)
                    const popupContenidoNuevo = document.querySelector("#popupNuevo .popupContenido");
                    const popupCamposNuevo = document.querySelectorAll(".popupCampo");

                    // LIMPIAR CLASES ANTERIORES PORQUE SOBREESCRIBIA OTRAS TARJETAS
                    popupContenidoNuevo.classList.remove("control","damage","essential","force","utility","unforgivable");
                    for (let j = 0; j < popupCamposNuevo.length; j++) {
                        popupCamposNuevo[j].classList.remove("control","damage","essential","force","utility","unforgivable");
                    }
                    
                    switch(spellRecogido.typeSpell.toLowerCase()){
                        case "control":
                            popupContenidoNuevo.classList.add('control');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("control");
                            }
                        break;
                        case "damage":
                            popupContenidoNuevo.classList.add('damage');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("damage");
                            }
                        break;
                        case "essential":
                            popupContenidoNuevo.classList.add('essential');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("essential");
                            }
                        break;
                        case "force":
                            popupContenidoNuevo.classList.add('force');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("force");
                            }   
                        break;
                        case "utility":
                            popupContenidoNuevo.classList.add('utility');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("utility");
                            }
                        break;
                        case "unforgivable":
                            popupContenidoNuevo.classList.add('unforgivable');
                            for (let j = 0; j < popupCamposNuevo.length; j++) {
                                popupCamposNuevo[j].classList.add("unforgivable");
                            }
                        break;
                    }
                })
                popupNuevo.style.display = "block";
                document.body.classList.add("no-scroll");
            });
            
            const cerrarNuevoSpell = popupNuevo.querySelector("#btnCancelarNuevo");
            cerrarNuevoSpell.addEventListener("click", () => {
                //alert("quiero cerrar");
                popupNuevo.style.display = "none";
                document.body.classList.remove("no-scroll");
            }); 

        /*
        btnAprender.addEventListener("click", () => {
    //alert("New spells will be available soon! Keep practicing your magic!");
    const popupNuevo = document.querySelector("#popupNuevo");
    btnAprender.addEventListener("click", () => {
        //alert("quiero agregar");
        popupNuevo.style.display = "block";
        document.body.classList.add("no-scroll");
        //fetch("")
        
    });
    const cerrarNuevoSpell = popupNuevo.querySelector("#btnCancelarNuevo");
    cerrarNuevoSpell.addEventListener("click", () => {
        //alert("quiero cerrar");
        popupNuevo.style.display = "none";
        document.body.classList.remove("no-scroll");
    });
});
        */
        // PRIMER SLIDE = ACTIVO
        if (i === 0) {
            clon.classList.add("active");
        }
    }
    plantillaSlide.remove();
    slides = document.querySelectorAll(".carruselSpells .slide");

    //Reiniciar carrusel correctamente
    currentSlide = 0;
    showSlide(currentSlide);

    setInterval(nextSlide, 5000)

});


function archivoABase64(archivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(archivo);
        
    });
}
nuevoUploadImagen.addEventListener("change", function(){
    var archivo = nuevoUploadImagen.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo)
    reader.onload = function(){
        nuevoImagen.src = reader.result;
    }
});
const uploadVideo = document.querySelector("#uploadVideo");
const popupVideo = document.querySelector("#popupVideo");
const popupVideoSrc = document.querySelector("#popupVideoSrc");

uploadVideo.onchange = function () {
    const archivo = uploadVideo.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onload = function () {
        popupVideoSrc.src = reader.result; // base64 del video
        popupVideo.load();                 
        popupVideo.play();                
    };
};
// PREVISUALIZACIÓN DE VIDEO (NUEVO SPELL)
const nuevoUploadVideo = document.querySelector("#nuevoUploadVideo");
const nuevoVideo = document.querySelector("#nuevoVideo");
const nuevoVideoSrc = document.querySelector("#nuevoVideoSrc");

nuevoUploadVideo.onchange = function () {
    const archivo = nuevoUploadVideo.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onload = function () {
        nuevoVideoSrc.src = reader.result;
    };
};

btnGuardarNuevo = document.querySelector("#btnGuardarNuevo");
/*btnGuardarNuevo.addEventListener("click", async () => {
    
    const archivo = document.querySelector("#nuevoUploadImagen").files[0];
    let imagenBase64 = null;
    
    const nombre_spell =document.querySelector("#nuevoNombre").value;
    const tipo_spell = document.querySelector("#nuevoTipo").value;
    const descripcion_spell =document.querySelector("#nuevoDescripcion").value;
    const usos_spell = document.querySelector("#nuevoUsos").value;
    const nuevoImagen = document.querySelector("#nuevoImagen");
    const nuevoUploadImagen = document.querySelector("#nuevoUploadImagen");

    

    if (archivo) {
        const base64Completo = await archivoABase64(archivo);
        imagenBase64 = base64Completo.split(",")[1]; 
    }
    
    if(!nombre_spell || !tipo_spell || !descripcion_spell || !usos_spell || !imagenBase64){
        alert("Complete todos los campos necesarios por favor")
        return;
    }

    const cuerpo = {
        cs_image: imagenBase64,   
        cs_name_spell: nombre_spell,
        cs_type_spell: tipo_spell,
        cs_video_spell: null,
        cs_description: descripcion_spell,
        cs_uses: usos_spell
    };

    const token = sessionStorage.getItem("tokenSesion");

    fetch("http://localhost:3000/create_spell", {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cuerpo)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Spell creado:", data);
        data.id_spell;
        //nombre_spell = ""
        document.querySelector("#nuevoImagen").src = "ImagenesFinales/SPELLS-ICONS/placeholder.webp";
        document.querySelector("#nuevoUploadImagen").value = "";
        document.querySelector("#nuevoNombre").value = "";
        document.querySelector("#nuevoTipo").value = "";
        document.querySelector("#nuevoDescripcion").value = "";
        document.querySelector("#nuevoUsos").value = "";
        popupNuevo.style.display = "none";
        document.body.classList.remove("no-scroll");
    });
}); */

btnGuardarNuevo.addEventListener("click", () => {
    
    const archivoImg = document.querySelector("#nuevoUploadImagen").files[0];
    const archivoVideo = document.querySelector("#nuevoUploadVideo").files[0];


    let imagenBase64 = null;

    const nombre_spell = document.querySelector("#nuevoNombre").value;
    const tipo_spell = document.querySelector("#nuevoTipo").value;
    const descripcion_spell = document.querySelector("#nuevoDescripcion").value;
    const usos_spell = document.querySelector("#nuevoUsos").value;

    const token = sessionStorage.getItem("tokenSesion");

    // CONVERTIR LA IMAGEN
    archivoABase64(archivoImg)
    .then(base64Completo => {
        imagenBase64 = base64Completo.split(",")[1];

        return fetch("http://localhost:3000/create_spell", {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cs_image: imagenBase64,
                cs_name_spell: nombre_spell,
                cs_type_spell: tipo_spell,
                cs_video_spell: null,
                cs_description: descripcion_spell,
                cs_uses: usos_spell
            })
        });
    })
    .then(res => res.json())
    .then(data => {
        console.log("Spell creado:", data);

        const id_creado = data.id_spell;

        //NO VIDEO, BYE BYE
        if (!archivoVideo) {
            location.reload();
            return;
        }

        //VIDEO A BASE64
        return archivoABase64(archivoVideo).then(b64Vid => {
            const videoBase64 = b64Vid.split(",")[1];

            //VIDEO A BACKEND
            return fetch("http://localhost:3000/actualizar_video_spell", {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    av_id_spells: id_creado,
                    av_video_spell: videoBase64
                })
            });
        });
    })
    .then(res => {
        if (res) return res.json();
    })
    .then(data => {
        if (data) console.log("Video actualizado:", data);
        location.reload();
        //limpiarPopupNuevo();
    });
});


/*
function SubirSpell(){
    alert("ejecuta algo papu")
}*/