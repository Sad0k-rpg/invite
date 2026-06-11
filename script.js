const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxP3fr8fGcf9g6jdpcd3QHti_PUSAy2R2tJMlSSlP6tOPAnSUka54LwtlxQ13cgfz6j/exec";

let selectedOption = "";

const noBtn = document.getElementById("noBtn");

/* NO button escape logic */

function moveNoButton() {

    const card = document.getElementById("step1");

    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 40;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

document.addEventListener("mousemove", (e) => {

    const rect = noBtn.getBoundingClientRect();

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
        Math.pow(e.clientY - btnCenterY, 2)
    );

    if (distance < 120) {
        moveNoButton();
    }
});

/* Step navigation */

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

    if (!date || !time) {
        alert("Please choose date and time");
        return;
    }

    step3.classList.add("hidden");
    step4.classList.remove("hidden");
};

/* Food selection */

document.querySelectorAll(".food").forEach(btn => {

    btn.addEventListener("click", () => {

        if (btn.classList.contains("selected")) {

            btn.classList.remove("selected");
            selectedOption = "";

            return;
        }

        document.querySelectorAll(".food").forEach(item => {
            item.classList.remove("selected");
        });

        btn.classList.add("selected");

        selectedOption = btn.innerText;

        document.getElementById("customFood").value = "";
    });

});

/* Custom option */

document.getElementById("customFood").addEventListener("input", () => {

    document.querySelectorAll(".food").forEach(item => {
        item.classList.remove("selected");
    });

    selectedOption =
        document.getElementById("customFood").value.trim();
});

/* Submit */

document.getElementById("customBtn").onclick = async () => {

    const customValue =
        document.getElementById("customFood").value.trim();

    if (customValue) {
        selectedOption = customValue;
    }

    if (!selectedOption) {
        alert("Please choose or write your option");
        return;
    }

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                date,
                time,
                food: selectedOption
            })
        });

    } catch (e) {
        console.log(e);
    }

    step4.classList.add("hidden");
    step5.classList.remove("hidden");
};
