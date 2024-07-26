const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const button = document.querySelector("form button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const dropDowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const icon = document.querySelector("#icon");


function addShadow(event){
    event.target.parentElement.style.boxShadow = "0 0 0.2rem white";
}
function removeShadow(event){
   event.target.parentElement.style.boxShadow = "none"; 
}
toCurr.addEventListener("focus",addShadow);
toCurr.addEventListener("blur",removeShadow);
fromCurr.addEventListener("focus",addShadow);
fromCurr.addEventListener("blur",removeShadow);

for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode == 'USD'){
            newOption.selected = "selected";
        }
        if(select.name == "to" && currCode == 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    };
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
        msg.innerText = "";
    });
};

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newURL;
}

async function converter(){
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    let url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(url);
    let data =  await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal*rate;
    if(amtVal === "0" || amtVal === ""){
        msg.innerText = "Please Enter Some Amount";
    }else{
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    }
}

button.addEventListener("click", (evt)=>{
    evt.preventDefault()
    converter();
});

icon.addEventListener("click" , (evt)=>{
    let swap = "";
    swap = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = swap;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    converter();
})