const cards = document.querySelectorAll(".cardPersonaje");
const prevBtn = document.querySelector(".btnCarrusel.prev");
const nextBtn = document.querySelector(".btnCarrusel.next");
let current = 0;

function showCard(index) {
    cards.forEach((card, i) => card.classList.toggle("active", i === index));
}

prevBtn.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
});

nextBtn.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    showCard(current);
});

setInterval(() => {
    current = (current + 1) % cards.length;
    showCard(current);
}, 5000);

