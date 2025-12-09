//BUSQUEDA
const buscador = document.querySelector("#buscarHechizo");
const btnBuscar = document.querySelector("#btnBuscar");
const filtros = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjetaHechizo");
const btnAprender = document.querySelector("#btnAprender");
const barraRelleno = document.querySelector(".barraProgreso .relleno");
const porcentajeHechizos = document.querySelector("#porcentajeHechizos");

//FUNCIÓN PARA FILTRAR POR NOMBRE
//TBH TENGO QUE PROBARLA, SIENTO QUE ESTA MAL...
function filtrarPorNombre() {
    const texto = buscador.value.toLowerCase();

    for (i = 0; i < tarjetas.length; i++) {
        const tarjeta = tarjetas[i];
        const nombre = tarjeta.querySelector("h4").textContent.toLowerCase();

        if (nombre == texto) {
            tarjeta.style.display = "block";
        }
        else {
            tarjeta.style.display = "none";
        }
    }
}

//BUSCADOR DE SPELLS
//AUN NO LO HAGO LOL


//FUNCIÓN PARA FILTRAR POR TIPO DE SPELL (SIMULACIÓN)(SE CANCELA FILTRO SE QUEDARA POR ESTETICA)
for (i = 0; i < filtros.length; i++) {
    const filtro = filtros[i];

    filtro.addEventListener("click", () => {
        alert("Soon you'll be able to filter your spells, young wizard!");
    });
}

// ANIMACIÓN DE LA BARRA DE PROGRESO
const total = 24; 

function animarBarra(cantidadSpells) {
    if (typeof cantidadSpells !== "number") cantidadSpells = 0;
    const porcentaje = Math.round((cantidadSpells / total) * 100);
    var progreso = 0;
    const intervalo = setInterval(() => {
        if (progreso >= porcentaje) {
            clearInterval(intervalo);
        } 
        else {
            progreso++;
            barraRelleno.style.width = progreso + "%";
            porcentajeHechizos.textContent = progreso + "% True Wizard";
        }
    }, 30);
}

window.addEventListener("load", animarBarra);


//LEARN NEW SPELLS (SIMULACIÓN)
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



//FUNCION PARA LOS COLORES DE CARTAS (SIMULACION)
const popupContenido = document.querySelector(".popupContenido");
const popupCampos = document.querySelectorAll(".popupCampo");


function CambioGeneral(tipo){
    // LIMPIAR CLASES ANTERIORES PORQUE SOBREESCRIBIA OTRAS TARJETAS
    popupContenido.classList.remove("control","damage","essential","force","utility","unforgivable");
    for (let j = 0; j < popupCampos.length; j++) {
        popupCampos[j].classList.remove("control","damage","essential","force","utility","unforgivable");
    }

    switch(tipo){
        case 1:
            popupContenido.classList.add('control');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("control");
            }
        break;
        case 2:
            popupContenido.classList.add('damage');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("damage");
            }
        break;
        case 3:
            popupContenido.classList.add('essential');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("essential");
            }
        break;
        case 4:
            popupContenido.classList.add('force');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("force");
            }   
        break;
        case 5:
            popupContenido.classList.add('utility');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("utility");
            }
        break;
        case 6:
            popupContenido.classList.add('unforgivable');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCampos[j].classList.add("unforgivable");
            }
        break;
    }
}


//FUNCION PARA LOS COLORES DE CARTAS (SIMULACION) (NEW SPELL)
const popupContenidoNuevo = document.querySelector("#popupNuevo .popupContenido");
const popupCamposNuevo = document.querySelectorAll(".popupCampo");

function CambioNuevoHechizo(tipo){
    // LIMPIAR CLASES ANTERIORES PORQUE SOBREESCRIBIA OTRAS TARJETAS
    popupContenidoNuevo.classList.remove("control","damage","essential","force","utility","unforgivable");
    for (let j = 0; j < popupCamposNuevo.length; j++) {
        popupCamposNuevo[j].classList.remove("control","damage","essential","force","utility","unforgivable");
    }

    switch(tipo){
        case 1:
            popupContenidoNuevo.classList.add('control');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("control");
            }
        break;
        case 2:
            popupContenidoNuevo.classList.add('damage');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("damage");
            }
        break;
        case 3:
            popupContenidoNuevo.classList.add('essential');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("essential");
            }
        break;
        case 4:
            popupContenidoNuevo.classList.add('force');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("force");
            }   
        break;
        case 5:
            popupContenidoNuevo.classList.add('utility');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("utility");
            }
        break;
        case 6:
            popupContenidoNuevo.classList.add('unforgivable');
            for (let j = 0; j < popupCampos.length; j++) {
                popupCamposNuevo[j].classList.add("unforgivable");
            }
        break;
    }
}
// BOTÓN EDITAR (SIMULACIÓN)
//NUEVA VERSION YA QUE DECIDIO QUE YA NO QUERIA SERVIR SMH
/*const popupEditar = document.querySelector("#popupEditar");
const btnCancelarPopup = document.querySelector("#btnCancelarPopup");

document.addEventListener("click", function (encontrarBoton) {
    if (encontrarBoton.target.className === "btnEditar") {
        //alert("Feature not available yet. Soon you’ll be able to edit your spells!");
        //alert("quiero editar");
        popupEditar.style.display = "block";
        document.body.classList.add("no-scroll");
    }

});

// CERRAR POPUP
btnCancelarPopup.addEventListener("click", function () {
    //alert("quiero cerrar");
    popupEditar.style.display = "none";
    document.body.classList.remove("no-scroll");
});*/


//POR QUE DEJASTE DE FUNCIONAR WTFFFFFF
/*const botonesEditar = document.querySelectorAll(".btnEditar");
console.log(document.querySelectorAll(".btnEditar").length);
const popupEditar = document.querySelector("#popupEditar");
const btnCancelarPopup = document.querySelector("#btnCancelarPopup");

for(i = 0; i< botonesEditar.length; i++){
    botonesEditar[i].addEventListener("click", function () {
        //alert("Feature not available yet. Soon you’ll be able to edit your spells!");
        //alert("quiero editar");
        popupEditar.style.display = "block";
        document.body.classList.add("no-scroll");
    });
}

btnCancelarPopup.addEventListener("click", function () {
    //alert("quiero cerrar");
    popupEditar.style.display = "none";
    document.body.classList.remove("no-scroll");
});
*/


