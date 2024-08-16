
function ageRange(age) {
    if (age === "Edad avanzada") {
        return "Edad avanzada";
    } else if (age === "Adulto") {
        return "Adulto";
    } else {
        return "Adolescente";
    }
}


function calculateIMC(weight, height) {
    return weight / ((height / 100) * (height / 100));
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


function createPlan(ageRange, userIMC, plan) {

    const imcPlanMap = {
        "Infrapeso severo": plan.PLANS_FOR_SKINNY_PEOPLE,
        "Infrapeso": plan.PLANS_FOR_SKINNY_PEOPLE,
        "Peso normal (estable)": plan.PLANS_FOR_STABLE_PEOPLE,
        "Sobrepeso": plan.PLANS_FOR_FAT_PEOPLE,
        "Obesidad": plan.PLANS_FOR_FAT_PEOPLE,
        "Obesidad mórbida": plan.PLANS_FOR_FAT_PEOPLE
    };

    const imcPlans = imcPlanMap[userIMC];
    const agePlanMap = {
        "Adolescente": 'teenagepeopleplan',
        "Adulto": 'adultpeopleplan',
        "Edad avanzada": 'oldpeopleplan'
    };

    const agePlan = agePlanMap[ageRange];
    const userPlan = imcPlans && imcPlans[agePlan] ? imcPlans[agePlan] : null;

    let planContainer = document.createElement('div');
    planContainer.className = 'planContainer';

    if (userPlan) {
        let planHTML = `
            <div class="titlePlanDiv">
                <h3>Plan Recomendado</h3>
            </div>
        `;
        for (const [day, exercises] of Object.entries(userPlan)) {
            planHTML += `
                <div class="planDay">
                    <h4>${capitalizeFirstLetter(day)}</h4>
                    <ul>
                        ${Object.values(exercises).map(exercise => `<li>${exercise}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        planContainer.innerHTML = planHTML;
    } else {
        planContainer.innerHTML = '<p>Plan no disponible</p>';
    }
    containerResults.appendChild(planContainer);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function clearResults() {
    containerResults.innerHTML = '';
}


fetch('./../json/planes.json')
    .then(response => response.json())
    .then(planData => {
        const plan = planData;
        const submitFormButton = document.getElementById("submitForm");
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Rehacer';
        resetButton.id = 'resetForm';

        submitFormButton.onclick = (event) => {
            event.preventDefault();
            clearResults();

            let userName = document.getElementById("nameInput").value;
            let userDirection = document.getElementById('directionInput').value;
            let userAge = document.getElementById("ageInput").value;
            let userWeight = parseFloat(document.getElementById("weightInput").value);
            let userHeight = parseFloat(document.getElementById("heightInput").value);
            let userIMC = determineUserStatus(userWeight, userHeight);
            let ageRangeValue = ageRange(userAge);

            localStorage.setItem('userName', userName);
            localStorage.setItem('userDirection', userDirection)

            createResult(userName, userAge, userWeight, userHeight, userIMC);
            createPlan(ageRangeValue, userIMC, plan);
            containerResults.appendChild(resetButton);
        };


        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'resetForm') {
                clearResults();

                if (!document.getElementById('submitForm')) {
                    const newSubmitButton = document.createElement('button');
                    newSubmitButton.textContent = 'Obtener Resultado';
                    newSubmitButton.id = 'submitForm';
                    document.body.appendChild(newSubmitButton);
                }
            }
        });
    })
    .catch(error => console.error('Error al cargar los planes:', error));


let containerResults = document.getElementById('containerResultsForUser');


function createResult(userName, userAge, userWeight, userHeight, userIMC) {
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
        </ul>
    `;
    containerResults.appendChild(userSummary);     
}













 





