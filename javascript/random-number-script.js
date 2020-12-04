const genBtn = document.querySelector(".btn");
const number = document.querySelector(".num");
const minInput = document.getElementById("min-input");
const maxInput = document.getElementById("max-input");
const amountGenInput = document.getElementById("amount-generations-input");
const groupInput = document.getElementById("group-input");
const dupCheckbox = document.getElementById("duplicates-check");
const numCont = document.getElementById("num-container");
const datetime = document.querySelector(".datetime");

var duplicates = [];
var globalCount = 0;

genBtn.addEventListener('click', (event) => {
    event.preventDefault();

    numCont.innerHTML = '';
    datetime.innerHTML = '';

    var actualMin = parseInt(minInput.value);
    var actualMax = parseInt(maxInput.value);
    var generations = Math.abs(parseInt(amountGenInput.value));
    var groups = Math.abs(parseInt(groupInput.value));
    var groupCount = 0;

    amountGenInput.value = generations;
    groupInput.value = groups;

    if (actualMax < actualMin) {

        actualMax = actualMin + 1;
        maxInput.value = actualMax; 

    }

    if (actualMax > 50000) {

        actualMax = 50000;
        maxInput.value = actualMax; 

    }

    if (actualMin < -50000) {

        actualMin= -50000;
        minInput.value = actualMin; 

    }

    if (groups > generations) {

        groups = generations;
        groupInput.value = groups;

    }

    if (groups == 0) {

        groups = 1;
        groupInput.value = groups;

    }

    if (!dupCheckbox.checked && generations > actualMax) {

        generations = actualMax;
        amountGenInput.value = generations;
        
    }

    if (generations > 50000) {

        generations = 50000;
        amountGenInput.value = generations;
        
    }

    var numsPerGroup = Math.floor(generations / groups);
    var numsPerGroupRemainder = generations % groups;
    var remainderArray = [];

    while (numsPerGroupRemainder > 0) {

        if (remainderArray.length == 0) 
            remainderArray.push(Math.floor(numsPerGroupRemainder / groups));
        else
            remainderArray.push(Math.ceil(numsPerGroupRemainder / groups));

        numsPerGroupRemainder -= remainderArray[remainderArray.length - 1];
        
    }
    
    while (groupCount < groups) {

        if (!minInput.checkValidity() || !maxInput.checkValidity()) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("group");

            const errorSpan = document.createElement("span");
            errorSpan.classList.add("num");

            errorSpan.innerText = "Error, check the input";

            numCont.appendChild(errorDiv);
            errorDiv.appendChild(errorSpan);

            errorSpan.scrollIntoView();
            break;
        }
        else {
            generate_group(groupCount, groups, remainderArray, numsPerGroup, actualMin, actualMax);

            datetime.innerHTML = '';
            var today = new Date();
            const datetimeText = document.createElement("span");
            datetimeText.innerText = 'Generation of: ' + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + '  ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            datetime.appendChild(datetimeText);

            numCont.scrollIntoView();
        }

        groupCount += 1;

    }

    duplicates = [];
    globalCount = 0;

});

function generate_group(group, groups, remainderArray, numsPerGroup, actualMin, actualMax) {

    var counter = 0;

    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group")

    if (remainderArray.length != 0) {

        if (group >= (groups - remainderArray.length)) {

            numsPerGroup += remainderArray[globalCount];
            globalCount += 1;
            
        }
    }

    while (counter < numsPerGroup) {

        const numSpan = document.createElement("span");
        numSpan.classList.add("num");

        run = true;
        do {
            
            var randomNum = Math.round((Math.random() * (actualMax - actualMin) + actualMin));

            if (dupCheckbox.checked)
                break;
            else
                if (!duplicates.includes(randomNum)){
                    duplicates.push(randomNum);
                    run = false;
                }

        } while (run);

        numSpan.innerText = randomNum;

        groupDiv.appendChild(numSpan);

        counter += 1;
        
    }

    numCont.appendChild(groupDiv);

}