
// descripcion de la página
alert("Hola, esta web te dará el plan de entrenamiento perfecto.\nSolicitaremos algunos datos de usted.\nSea sincero con usted mismo, no mienta en cuestiones\ncomo el peso o la edad, así podrá tener un buen plan.\n(Esta web no guarda datos de usuario de forma permanente, no hace falta un registro pero tampoco podrás registrar tus progresos aqui.\nLa página solo da un plan de entrenamiento)")


// primeros datos del usuario


// nombre
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
let ageLabel = ageRanges.find(range => userAge >= range.min && userAge <= range.max)?.label || `${userAge} años = No apto`;
if (ageLabel === "No apto") {
    alert(`${firstName}, esa edad no te permite entrenar, lo sentimos`);
}
userAge = ageLabel;
console.log(userAge)





// validacion para el género
let userSex = prompt(`¿${firstName}, eres hombre o mujer?`).toLowerCase();

if (userSex === "mujer" || userSex === "hombre") {
    userSex = userSex;
} else {
    while (userSex !== "mujer" && userSex !== "hombre") {
        alert("Opción incorrecta, vuelve a intentar");
        userSex = prompt(`¿${firstName}, eres hombre o mujer?`).toLowerCase();
    }
}





// segundos datos del usuario

// imc : indice de masa corporal
function calculateIMC(peso, altura) {
    return peso / ((altura / 100) * (altura / 100)); // Convertir altura a metros
}

function determineUserStatus(peso, altura) {
    let imc = calculateIMC(peso, altura);

    if (imc <= 16) {
        return "Infrapeso - Desnutrición";
    } else if (imc < 18) {
        return "Bajo peso";
    } else if (imc >= 18 && imc < 26) {
        return "Peso normal (estable)";
    } else if (imc >= 26 && imc <= 30) {
        return "Sobrepeso";
    } else if (imc > 30 && imc < 40) {
        return "Obesidad";
    } else if (imc >= 40) {
        return "Obesidad mórbida";
    } else {
        return "Error en los datos";
    }
}

function promptUserIMC() {
    let userWeight = parseFloat(prompt(`${firstName}, ¿Cuánto pesas actualmente? (kg)`));
    let userHeight = parseFloat(prompt(`${firstName}, ¿Cuánto mides? (cm)`));

    while (isNaN(userWeight) || isNaN(userHeight)) {
        alert("Debes ingresar datos válidos.");
        userWeight = parseFloat(prompt(`${firstName}, ¿Cuánto pesas actualmente? (kg)`));
        userHeight = parseFloat(prompt(`${firstName}, ¿Cuánto mides? (cm)`));
    }
    return { userWeight, userHeight };
}
let { userWeight, userHeight } = promptUserIMC();
let userStatus = determineUserStatus(userWeight, userHeight);
console.log(`${firstName}, tu estado de peso es: ${userStatus}`);







// disposicion de tiempo del usuario
let userFreeTime = parseInt(prompt(`
    ${firstName}, ¿Cuánto tiempo libre tenés al día para entrenar sin interrumpir tus actividades rutinarias?
    (Escribe solo las horas libres que tengas, ej: 2).
`));
if (userFreeTime > 5){
    alert("Lo sentímos. El tiempo máximo son 5 horas y el mínimo 1 hora.");
    userFreeTime = parseInt(prompt(`
        ${firstName}, ¿Cuánto tiempo libre tenés al día para entrenar sin interrumpir tus actividades rutinarias?
        (Escribe solo las horas libres que tengas, ej: 2).
    `));
}
// Rango de horas
const hoursRanges = [
    { min: 1, max: 2, label: `${userFreeTime} horas = Disponibilidad media/baja` },
    { min: 2, max: 3, label: `${userFreeTime} horas = Disponibilidad media` },
    { min: 3, max: 4, label: `${userFreeTime} horas = Disponibilidad alta` },
    { min: 4, max: 5, label: `${userFreeTime} horas = Disponibilidad muy alta` }
];
// Encuentra el rango de edad correspondiente
let freeTimeClassification = hoursRanges.find(range => userFreeTime >= range.min && userFreeTime <= range.max)?.label;
userFreeTime = freeTimeClassification;
console.log(userFreeTime)






// Objetivo del usuario
let userGoal = prompt(`
    ${firstName}, Escribe la letra de la opción que más se asemeje a tus objetivos:
    
    A: Quemar grasa (alta exigencia).
    B: Quemar grasa y aumentar masa muscular (alta exigencia).
    C: Aumentar masa muscular (alta exigencia).
    D: Solo mantenerse en movimiento (baja exigencia).
    `).toUpperCase();

    if(userGoal == "A"){
        userGoal = "Quemar grasa";
    }else if(userGoal =="B"){
        userGoal = "Quemar grasa y aumentar masa muscular";
    }else if(userGoal == "C"){
        userGoal = "Aumentar masa muscular"
    }
    else if(userGoal == "D"){
        userGoal = "Solo mantenerse en movimiento"
    }
    else{
        while (userGoal !== "A" || userGoal !== "B" || userGoal !== "C" || userGoal !== "D"){
            alert("Opción incorrecta, vuelve a intentar");
            userGoal = prompt(`
                ${firstName}, Escribe la letra de la opción que más se asemeje a tus objetivos:
                
                A: Quemar grasa.
                B: Quemar grasa y aumentar masa muscular.
                C: Aumentar masa muscular.
                D: Solo mantenerse en movimiento.
                `).toUpperCase();
        }
    }
console.log(userGoal);







// resumen del usuario
const userSummary = alert([`
    RESUMEN:

    Nombre completo: ${userName}.
    Edad: ${userAge}.
    Sexo: ${userSex}.
    Peso: ${userWeight} kg.
    Altura: ${userHeight} cm.
    Estado físico: ${userStatus}.
    Tiempo libre: ${userFreeTime}.
    Objetivo: ${userGoal}
`]);








