
// descripcion de la página
alert("Hola, esta web te dará el plan de entrenamiento perfecto.\nSolicitaremos algunos datos de usted.\nSea sincero con usted mismo, no mienta en cuestiones\ncomo el peso o la edad, así podrá tener un buen plan.\n(Esta web no guarda datos de usuario de forma permanente, no hace falta un registro pero tampoco podrás registrar tus progresos aqui.\nLa página solo da un plan de entrenamiento)")


// primeros datos del usuario
let userName = prompt("NOMBRE COMPLETO: ").toLowerCase();
let nameParts = userName.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1));
let firstName = nameParts[0];
console.log(userName)

// edad
let userAge = parseInt(prompt(`${firstName}, dinos tu edad por favor: `));
// Rango de edades
const ageRanges = [
    { min: 60, max: 100, label: `${userAge} años = Edad avanzada` },
    { min: 40, max: 59, label: `${userAge} años = Adulto` },
    { min: 20, max: 39, label: `${userAge} años = Adulto joven` },
    { min: 14, max: 19, label: `${userAge} años = Adolescente` }
];
// Encuentra el rango de edad correspondiente
let ageLabel = ageRanges.find(range => userAge >= range.min && userAge <= range.max)?.label || "No apto";
if (ageLabel === "No apto") {
    alert(`${firstName}, esa edad no te permite entrenar, lo sentimos`);
}
userAge = ageLabel;
console.log(userAge)

// validacion para el género
let userSex = parseInt(prompt(`¿${firstName}, eres hombre o mujer? \n 1 para mujer \n 2 para hombre`));
if (userSex == 1){
    userSex = "mujer";
}else if (userSex == 2) {
    userSex = "hombre";
}else{
    while(userSex !== 1 && userSex !== 2){
        alert("Opción incorrecta, vuelve a intentar");
        userSex = parseInt(prompt(`¿${firstName}, eres hombre o mujer? \n 1 para mujer \n 2 para hombre`));
    
    }
}

// segundos datos del usuario
let userWeight = parseFloat(prompt(`${firstName}, ¿Cuanto pesas actualmente? `));
let userHeight = parseFloat(prompt(`${firstName}, ¿Cuanto mides?`));

// function sobrePeso(){
//     if(userWeight > ){


// //     }
// }
function estable(){
    
}
function BajoPesoCorporal(){
    
}


// switch(){
//     case 1:
    
//     case 2:

//     case 3:
    
//     default:

// };

