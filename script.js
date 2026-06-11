const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxP3fr8fGcf9g6jdpcd3QHti_PUSAy2R2tJMlSSlP6tOPAnSUka54LwtlxQ13cgfz6j/exec";

let selectedFood = "";

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 300;
    const y = Math.random() * 80;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
});

document.getElementById("yesBtn").onclick = () => {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
};

document.getElementById("continueBtn").onclick = () => {
    step2.classList.add("hidden");
    step3.classList.remove("hidden");
};

document.getElementById("dateBtn").onclick = () => {

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if(!date || !time){
        alert("Оберіть дату і час");
        return;
    }

    step3.classList.add("hidden");
    step4.classList.remove("hidden");
};

document.querySelectorAll(".food").forEach(btn => {

    btn.addEventListener("click", async () => {

        selectedFood = btn.innerText;

        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        try{

            await fetch(SCRIPT_URL,{
                method:"POST",
                body:JSON.stringify({
                    date,
                    time,
                    food:selectedFood
                })
            });

        }catch(e){
            console.log(e);
        }

        step4.classList.add("hidden");
        step5.classList.remove("hidden");
    });

});
