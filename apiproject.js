const BASE_URL = 
"http://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");


 for (let select of dropdowns){
    for(currCode in countryList){
       let newOption= document.createElement("option");

        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name === "to" && currCode ==="USD"){
            newOption.selected = "selected";

        }else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
 }
 const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtval =amount.value;
    if(amtval ===""|| amtval<1){
        amtval =1;
        amount.value ="1";
    }

   const URL = '${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json';
    let response = await fetch(URL);
    let date =await response.json();
    let rate =date[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = '${amtVal}$ {fromCurr.value}= ${finalAmount}${toCurr.value}';
};

 const updateflage = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc= 'https://flagsapi.com/${countryCode}/flat/64.png';
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
 };
 btn.addEventListener("click",(evt)=>{
    evt.prevenDefault();
    updateExchangeRate();
 });

 window.addEventListener("load",()=>{
    updateExchangeRate();
 });
 


