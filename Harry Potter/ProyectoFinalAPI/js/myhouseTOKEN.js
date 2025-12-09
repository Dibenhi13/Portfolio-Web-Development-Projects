var token = sessionStorage.getItem("tokenSesion");
//alert(token)
const background = document.querySelector(".background");
const body = document.body;

const cardPersonajeImage_one = document.querySelector(".cardPersonajeImage_one");
const characterName_one = document.querySelector(".characterName_one");
const characterInfo_one = document.querySelector(".characterInfo_one");

const cardPersonajeImage_two = document.querySelector(".cardPersonajeImage_two");
const characterName_two = document.querySelector(".characterName_two");
const characterInfo_two = document.querySelector(".characterInfo_two");

const cardPersonajeImage_three = document.querySelector(".cardPersonajeImage_three");
const characterName_three = document.querySelector(".characterName_three");
const characterInfo_three = document.querySelector(".characterInfo_three");

const houseName = document.querySelector(".houseName");
const traits = document.querySelector(".traits");
const paragraph_one = document.querySelector(".paragraph_one");
const paragraph_two = document.querySelector(".paragraph_two");

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
            console.log(respuesta.usuario);
            console.log(respuesta.usuario.house);
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
                        console.log(respuestaCasa.fotos.backgroundHouse)
                        background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`;
                        
                        console.log(respuestaCasa.fotos.characterOne.name)

                        cardPersonajeImage_one.src = respuestaCasa.fotos.characterOne.image;
                        characterName_one.innerHTML = respuestaCasa.fotos.characterOne.name;
                        characterInfo_one.innerHTML = respuestaCasa.fotos.characterOne.info;

                        cardPersonajeImage_two.src = respuestaCasa.fotos.characterTwo.image;
                        characterName_two.innerHTML = respuestaCasa.fotos.characterTwo.name;
                        characterInfo_two.innerHTML = respuestaCasa.fotos.characterTwo.info;

                        cardPersonajeImage_three.src = respuestaCasa.fotos.characterThree.image;
                        characterName_three.innerHTML = respuestaCasa.fotos.characterThree.name;
                        characterInfo_three.innerHTML = respuestaCasa.fotos.characterThree.info;

                        houseName.innerHTML = respuestaCasa.houseName + " House"
                        traits.innerHTML = respuestaCasa.values;
                        paragraph_one.innerHTML = respuestaCasa.infoHouse;
                        paragraph_two.innerHTML = respuestaCasa.infoHouseBottom;
                        
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
                            console.log(respuestaCasa.fotos.backgroundHouse)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)

                            cardPersonajeImage_one.src = respuestaCasa.fotos.characterOne.image;
                            characterName_one.innerHTML = respuestaCasa.fotos.characterOne.name;
                            characterInfo_one.innerHTML = respuestaCasa.fotos.characterOne.info;

                            cardPersonajeImage_two.src = respuestaCasa.fotos.characterTwo.image;
                            characterName_two.innerHTML = respuestaCasa.fotos.characterTwo.name;
                            characterInfo_two.innerHTML = respuestaCasa.fotos.characterTwo.info;

                            cardPersonajeImage_three.src = respuestaCasa.fotos.characterThree.image;
                            characterName_three.innerHTML = respuestaCasa.fotos.characterThree.name;
                            characterInfo_three.innerHTML = respuestaCasa.fotos.characterThree.info;

                            houseName.innerHTML = respuestaCasa.houseName + " House"
                            traits.innerHTML = respuestaCasa.values;
                            paragraph_one.innerHTML = respuestaCasa.infoHouse;
                            paragraph_two.innerHTML = respuestaCasa.infoHouseBottom;
                            
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
                            console.log(respuestaCasa.fotos.backgroundHouse)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)

                            cardPersonajeImage_one.src = respuestaCasa.fotos.characterOne.image;
                            characterName_one.innerHTML = respuestaCasa.fotos.characterOne.name;
                            characterInfo_one.innerHTML = respuestaCasa.fotos.characterOne.info;

                            cardPersonajeImage_two.src = respuestaCasa.fotos.characterTwo.image;
                            characterName_two.innerHTML = respuestaCasa.fotos.characterTwo.name;
                            characterInfo_two.innerHTML = respuestaCasa.fotos.characterTwo.info;

                            cardPersonajeImage_three.src = respuestaCasa.fotos.characterThree.image;
                            characterName_three.innerHTML = respuestaCasa.fotos.characterThree.name;
                            characterInfo_three.innerHTML = respuestaCasa.fotos.characterThree.info;

                            houseName.innerHTML = respuestaCasa.houseName + " House"
                            traits.innerHTML = respuestaCasa.values;
                            paragraph_one.innerHTML = respuestaCasa.infoHouse;
                            paragraph_two.innerHTML = respuestaCasa.infoHouseBottom;
                            
                            //console.log(respuesta.)
                            //console.log(respuestaCasa.fotos.backgroundHouse);
                            
                        })
                        
                    console.log("hooooooola")
                break;

                //RAVENCLAW
                case "ravenclaw":
                        fetch("http://localhost:3000/ravenclaw").then(casita => casita.json()).then(respuestaCasa => {
                            //myHouse.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`
                            body.classList.add("theme-ravenclaw", "myHouse");
                            console.log(respuestaCasa.fotos.backgroundHouse)
                            background.style.backgroundImage = `url('${respuestaCasa.fotos.backgroundHouse}')`;
                            console.log(respuestaCasa.fotos.characterOne.name)

                            cardPersonajeImage_one.src = respuestaCasa.fotos.characterOne.image;
                            characterName_one.innerHTML = respuestaCasa.fotos.characterOne.name;
                            characterInfo_one.innerHTML = respuestaCasa.fotos.characterOne.info;

                            cardPersonajeImage_two.src = respuestaCasa.fotos.characterTwo.image;
                            characterName_two.innerHTML = respuestaCasa.fotos.characterTwo.name;
                            characterInfo_two.innerHTML = respuestaCasa.fotos.characterTwo.info;

                            cardPersonajeImage_three.src = respuestaCasa.fotos.characterThree.image;
                            characterName_three.innerHTML = respuestaCasa.fotos.characterThree.name;
                            characterInfo_three.innerHTML = respuestaCasa.fotos.characterThree.info;

                            houseName.innerHTML = respuestaCasa.houseName + " House"
                            traits.innerHTML = respuestaCasa.values;
                            paragraph_one.innerHTML = respuestaCasa.infoHouse;
                            paragraph_two.innerHTML = respuestaCasa.infoHouseBottom;
                            
                            //console.log(respuesta.)
                            //console.log(respuestaCasa.fotos.backgroundHouse);
                            
                        })
                        
                    console.log("hooooooola")
                break;
            }
        })
    }else{
        alert("error error")
        window.location.href = "404.html";
    }
})