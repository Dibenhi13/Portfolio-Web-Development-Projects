const houseButtons = document.querySelectorAll('.btnHouse');
var selectedHouse = null;
for (i = 0; i < houseButtons.length; i++) {
    const btn = houseButtons[i];
    btn.addEventListener('click', () => {
        for (j = 0; j < houseButtons.length; j++) {
                houseButtons[j].classList.remove('selected');
            }
        btn.classList.add('selected');
        selectedHouse = btn.textContent;
        console.log('Selected house:', selectedHouse);
    });
}

//AUN NO FUNCIONA LA IMAGEN DE NUEVO USUARIO
const formulario = document.querySelector(".formularioSignUp");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!email || !password || !name || selectedHouse == null) {
        alert("Por favor completa todos los campos");
        return;
    }
    const datos = {
        cc_name: name,
        cc_email: email,
        cc_password: password,
        cc_house: selectedHouse
    };
    fetch("http://localhost:3000/crear_cuenta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    }).then(respuesta =>{
        if(respuesta.status == 200){
            respuesta.json().then(acceso =>{
                sessionStorage.setItem("tokenSesion", acceso.token_acceso)
                console.log(acceso.mensaje);
                const datosInicioSesion = {
                    emailSent: email,
                    passwordSent: password
                };
                fetch("http://localhost:3000/iniciar_sesion",{
                    method:"POST",
                    body: JSON.stringify(datosInicioSesion)
                }).then(respuesta =>{
                    if(respuesta.status == 200){
                        respuesta.json().then(resultado =>{
                            sessionStorage.setItem("tokenSesion", resultado.token_acceso);
                            console.log("Login exitoso:", resultado.mensaje);
                            console.log("Token:", resultado.token_acceso);
            
                            window.location.href = "home.html";
                        })
                    }
                    else{
                        respuesta.json().then(fallo =>{
                            alert("pendejo")
                        })    
                    }
                })
            })
        }
        else{
            respuesta.json().then(fallo =>{
                alert("pendejo")
            })
        }
    })
});