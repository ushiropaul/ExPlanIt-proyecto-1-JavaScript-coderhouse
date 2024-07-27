
import { 
    PLANS_FOR_SKINNY_PEOPLE, 
    PLANS_FOR_STABLE_PEOPLE, 
    PLANS_FOR_FAT_PEOPLE 
} from './arrays/planes.js'; 

const fatOldPeoplePlan = PLANS_FOR_FAT_PEOPLE.oldpeopleplan;
const fatAdultPeoplePlan = PLANS_FOR_FAT_PEOPLE.adultpeopleplan;
const fatTeenagePeoplePlan = PLANS_FOR_FAT_PEOPLE.teenagepeopleplan;

const stableOldPeoplePlan = PLANS_FOR_STABLE_PEOPLE.oldpeopleplan;
const stableAdultPeoplePlan = PLANS_FOR_STABLE_PEOPLE.adultpeopleplan;
const stableTeenagePeoplePlan = PLANS_FOR_STABLE_PEOPLE.teenagepeopleplan;

const skinnyOldPeoplePlan = PLANS_FOR_SKINNY_PEOPLE.oldpeopleplan;
const skinnyAdultPeoplePlan = PLANS_FOR_SKINNY_PEOPLE.adultpeopleplan;
const skinnyTeenagePeoplePlan = PLANS_FOR_SKINNY_PEOPLE.teenagepeopleplan;



// Iniciar programa
let initFormButton = document.getElementById("initForm");
initFormButton.onclick = () => startQuestionnaire();

function startQuestionnaire() {
    initFormButton.style.display = 'none';

    const containerInitForm = document.querySelector('.containerInitForm');

    containerInitForm.innerHTML = `
        <form class="formInputs">
            <label for="nameInput">Nombre completo:</label>
            <input type="text" id="nameInput" placeholder="Nombre completo" required>

            <label for="ageInput">Rango de edad:</label>
            <select id="ageInput" required>
                <option value="Edad avanzada">De 60 a 100 años (Edad avanzada)</option>
                <option value="Adulto">De 20 a 59 años (Adulto)</option>
                <option value="Adolescente">De 12 a 19 años (Adolescente)</option>
            </select>


            <label for="weightInput">Peso (kg):</label>
            <input type="number" id="weightInput" placeholder="Peso (kg)" required>

            <label for="heightInput">Altura (cm):</label>
            <input type="number" id="heightInput" placeholder="Altura (cm)" required>


            <label for="goalInput">Seleccioná un objetivo:</label>
            <select id="goalInput" name="Objetivos" required>
                <option value="Quemar grasa (alta exigencia)">Quemar grasa (alta exigencia)</option>
                <option value="Quemar grasa y aumentar masa muscular (alta exigencia)">Quemar grasa y aumentar masa muscular (alta exigencia)</option>
                <option value="Aumentar masa muscular (alta exigencia)">Aumentar masa muscular (alta exigencia)</option>
                <option value="Solo mantenerse en movimiento (baja exigencia)">Solo mantenerse en movimiento (baja exigencia)</option>
            </select>

            <button type="submit" id="submitForm">Obtener resultado</button>
        </form>
    `;

    const submitFormButton = document.getElementById("submitForm");
    submitFormButton.onclick = (event) => {
        event.preventDefault();

        // Recoger los valores de los inputs
        let userName = document.getElementById("nameInput").value;
        let userAge = document.getElementById("ageInput").value;
        let userWeight = parseFloat(document.getElementById("weightInput").value);
        let userHeight = parseFloat(document.getElementById("heightInput").value);
        let userGoal = document.getElementById("goalInput").value;

        let userIMC = determineUserStatus(userWeight, userHeight);

        createResult(userName, userAge, userWeight, userHeight, userIMC, userGoal);
    };
}







// 
function calculateIMC(weight, height) {
    return weight / ((height / 100) * (height / 100)); // Convertir altura a metros
}

function determineUserStatus(weight, height) {
    const imc = calculateIMC(weight, height);
    const imcRanges = [
        { max: 16, label: "Infrapeso severo" },
        { max: 18.5, label: "Infrapeso" },
        { max: 24.9, label: "Peso normal (estable)" },
        { max: 29.9, label: "Sobrepeso" },
        { max: 34.9, label: "Obesidad" },
        { max: Infinity, label: "Obesidad mórbida" }
    ];
    return imcRanges.find(range => imc <= range.max).label;
}



function createResult(userName, userAge, userGender, userWeight, userHeight, userIMC, userFreeTime, userGoal) {
    let userResults = document.getElementById('containerResultsForUser');
    if (!userResults) {
        userResults = document.createElement('div');
        userResults.id = 'containerResultsForUser';
        document.body.appendChild(userResults);
    }

    userResults.innerHTML = '';

    let userSummary = document.createElement('div');
    userSummary.className = 'userSummaryContainer';
    userSummary.innerHTML = `
        <h3>RESUMEN:</h3>
        <ul>
            <li><span>Nombre completo:</span> ${userName}.</li>
            <li><span>Rango de edad:</span> ${userAge}.</li>
            <li><span>Peso:</span> ${userWeight} kg.</li>
            <li><span>Altura:</span> ${userHeight} cm.</li>
            <li><span>Estado físico (aproximado):</span> ${userIMC}.</li>
            <li><span>Objetivo:</span> ${userGoal}</li>
        </ul>
    `;



    userResults.appendChild(userSummary);
    userResults.appendChild(userPlan);


    const containerInitForm = document.querySelector('.containerInitForm');
    containerInitForm.innerHTML = '<button id="resetForm">Rehacer</button>';

    document.getElementById("resetForm").onclick = resetQuestionnaire;
} // <-- acá termina la funcion que prepara los resultados del usuario.








function resetQuestionnaire() {
    initFormButton.style.display = 'block';
    const containerInitForm = document.querySelector('.containerInitForm');
    containerInitForm.innerHTML = '';

    const userResults = document.getElementById('containerResultsForUser');
    if (userResults) {
        userResults.innerHTML = '';
    }

    startQuestionnaire();
}



