
let heart = 0;
let coins = 100;
let copy = 0;

const heartCounter = document.getElementById("heartCnt");
const coinCounter = document.getElementById("coinCnt");
const copyCounter = document.getElementById("copyCnt");
const history = document.getElementById("history");
const clearButton = document.getElementById("clearButton");


function getTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function updateCnt() {
    heartCounter.innerText = heart;
    coinCounter.innerText = coins;
    copyCounter.innerText = copy;

    heartCntMobile.innerText = heart;
    coinCntMobile.innerText = coins;
    copyCntMobile.innerText = copy;
}
function callHistory(name, number) {
    const div = document.createElement("div");
    div.className = "flex justify-between bg-gray-100 shadow py-4 rounded-xl px-4 hover:bg-gray-200";
    div.innerHTML = `
        <div>
            <span class="font-bold text-[16px]">${name}</span><br>
            <span class="text-gray-500">${number}</span>
        </div>
        <span class="text-gray-500 whitespace-nowrap sm:whitespace-nowrap">${getTime()}</span>
    `;
    history.append(div);
}

const cards = document.querySelectorAll(".bg-white.rounded-lg");

for (let card of cards) {
    const name = card.querySelector("h3").innerText;
    const number = card.querySelector("p.text-2xl").innerText;

    const heartBtn = card.querySelector(".heartButton");
    const callBtn = card.querySelector(".callButton");
    const copyBtn = card.querySelector(".copyButton");
    


    if (heartBtn) {
        heartBtn.addEventListener("click", () => {
            heart++;
            heartCounter.innerText = heart;
            updateCnt();
            heartBtn.classList.toggle("text-red-600");
        });
    }
    if (callBtn) {
        callBtn.addEventListener("click", () => {
            if (coins < 20) {
                alert("insufficient coins! 20 coins are required to make a call");
                return;
            }
            coins -= 20;
            coinCounter.innerText = coins;
            updateCnt();
            alert(`Calling ${name} - ${number}`);
            callHistory(name, number);
        });
    }
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(number).then(() => {
                copy++;
                copyCounter.innerText = copy;
                updateCnt();
                alert(`${number} - Copied to clipboard`);
            });
        });
    }
}

if (clearButton) {
    clearButton.addEventListener("click", () => {
        history.innerHTML = "";
    });
}


const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
