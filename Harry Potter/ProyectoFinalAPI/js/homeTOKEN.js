var token = sessionStorage.getItem("tokenSesion");
//alert(token)
const username= document.querySelector("#username");
const background = document.querySelector(".background");
const body = document.body;

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
            username.innerHTML = respuesta.usuario.name
            console.log(respuesta.usuario)
            console.log(respuesta.usuario.id)
            body.classList.remove(
                "theme-gryffindor",
                "theme-slytherin",
                "theme-hufflepuff",
                "theme-ravenclaw"
            );

            switch(respuesta.usuario.house.toLowerCase()){
                //GRYFFINDOR
                case "gryffindor":
                    fetch("http://localhost:3000/gryffindor").then(casita => casita.json()).then(respuestaCasa => {
                        //myHouse.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`
                        body.classList.add("theme-gryffindor", "myHouse");
                        console.log(respuestaCasa.fotos.backgroundHome)
                        background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHome}')`;
                        console.log(respuestaCasa.fotos.characterOne.name)

                        //console.log(respuesta.)
                        //console.log(respuestaCasa.fotos.backgroundHouse);
                        
                    })
                    
                    console.log("hooooooola")
                break;
                //SLYTHERIN HOUSE (BEST ONE BTW)
                case "slytherin":
                        fetch("http://localhost:3000/slytherin").then(casita => casita.json()).then(respuestaCasa => {
                            //myHouse.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`
                            body.classList.add("theme-slytherin", "myHouse");
                            console.log(respuestaCasa.fotos.backgroundHome)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHome}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)
                            //console.log(respuesta.)
                            //console.log(respuestaCasa.fotos.backgroundHouse);
                            
                        });
                    console.log("hooooooola")
                break;

                //HUFFLEPUFF
                case "hufflepuff":
                        fetch("http://localhost:3000/hufflepuff").then(casita => casita.json()).then(respuestaCasa => {
                            //myHouse.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`
                            body.classList.add("theme-hufflepuff", "myHouse");
                            console.log(respuestaCasa.fotos.backgroundHome)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHome}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)
                            
                            //console.log(respuesta.)
                            //console.log(respuestaCasa.fotos.backgroundHouse);
                            
                        });
                        
                    console.log("hooooooola")
                break;

                //RAVENCLAW
                case "ravenclaw":
                        fetch("http://localhost:3000/ravenclaw").then(casita => casita.json()).then(respuestaCasa => {
                            //myHouse.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`
                            body.classList.add("theme-ravenclaw", "myHouse");
                            console.log(respuestaCasa.fotos.backgroundHome)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHome}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)
                            //console.log(respuesta.)
                            //console.log(respuestaCasa.fotos.backgroundHouse);
                        });
                        
                    console.log("hooooooola")
                break;
            }
        })
    }
})



