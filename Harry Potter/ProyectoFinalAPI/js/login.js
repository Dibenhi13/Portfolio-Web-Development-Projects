sessionStorage.removeItem("tokenSesion");

const btnLogIn = document.querySelector(".btnLogIn");
const formulario = document.querySelector(".formularioLogIn");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault(); // NO QUIERO QUE SE RECARGUE LA PAGINA, SO THIS IS WHY I WROTE THIS

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!email || !password) {
        alert("Por favor completa todos los campos");
        return;
    }
    const datos = {
        emailSent: email,
        passwordSent: password
    };
    
    fetch("http://localhost:3000/iniciar_sesion",{
        method:"POST",
        body: JSON.stringify(datos)
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
                alert("you are so stupid")
            })    
        }
    })
});





