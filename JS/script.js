const selectMenu = document.querySelectorAll("select");
const currentTime = "";
content = document.querySelector(".container");
setAlarmBtn = document.querySelector("button");
setAlarmBtn.addEventListener("click", setAlarm);
let alarmTime, isAlarmSet = false;
ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


function clock(){

    let today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let period = "AM";

    let dayNumber = today.getDate();
    let year = today.getFullYear();
    let dayName = today.toLocaleDateString("default", {weekday: "long"});
    let dayMonth = today.toLocaleDateString("default", {month: "short"});

    // Condicional para marcar se é AM ou PM

    if(hours >= 12){
        period = "PM";
    }

    // Condicional para deixar o relógio como padrão de 12h

    hours = hours > 12 ? hours % 12 : hours;

    // Adicionando o zero adicional na frente dos valores que são menores que 10

    if(hours <10){
        hours = "0" + hours;
    }

    if(minutes <10){
        minutes = "0" + minutes;
    }
    
    if(seconds <10){
        seconds = "0" + seconds;
    }

    document.querySelector('.hours').innerHTML = hours;
    document.querySelector('.minutes').innerHTML = minutes;
    document.querySelector('.seconds').innerHTML = seconds;
    document.querySelector('.period').innerHTML = period;
    document.querySelector('.month-name').innerHTML = dayMonth;
    document.querySelector('.day-name').innerHTML = dayName;
    document.querySelector('.day-number').innerHTML = dayNumber;
    document.querySelector('.year').innerHTML = year;

    currentTime.innerText = `${hours}:${minutes}:${seconds} ${period}`;

    if (alarmTime === `${hours}:${minutes} ${period}`) {
        ringtone.play();
        ringtone.loop = true;
    }

}

const updateClock = setInterval(clock, 1000);

function setAlarm() {

    if(isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`

    if(time.includes("horas") || time.includes("minutos") || time.includes("ampm")) {
        return alert("Please, select a alid time to set Alarm!");
    }

    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    console.log(time);
}
