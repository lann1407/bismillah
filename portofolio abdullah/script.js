const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".navbar ul");

const menuButton = document.createElement("button");
menuButton.className = "menu-button";
menuButton.innerHTML = "☰";
menuButton.setAttribute("aria-label", "Buka menu");
navbar.appendChild(menuButton);

menuButton.addEventListener("click", function () {
    menu.classList.toggle("menu-aktif");
    menuButton.innerHTML = menu.classList.contains("menu-aktif") ? "✕" : "☰";
});

const darkButton = document.createElement("button");
darkButton.className = "dark-button";
darkButton.innerHTML = "🌙";
darkButton.setAttribute("aria-label", "Ganti tema");
navbar.appendChild(darkButton);

darkButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    darkButton.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

const clock = document.createElement("div");
clock.className = "jam-digital";
navbar.appendChild(clock);

function updateClock() {
    const waktu = new Date();
    clock.textContent = waktu.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

setInterval(updateClock, 1000);
updateClock();

const homeText = document.querySelector(".home-text");

if (homeText) {
    const greeting = document.createElement("button");
    greeting.className = "tombol sapaan-button";
    greeting.textContent = "Sapa Saya";

    greeting.addEventListener("click", function () {
        const jam = new Date().getHours();
        let pesan;

        if (jam < 11) {
            pesan = "Selamat pagi!";
        } else if (jam < 15) {
            pesan = "Selamat siang!";
        } else if (jam < 18) {
            pesan = "Selamat sore!";
        } else {
            pesan = "Selamat malam!";
        }

        alert(pesan + " Terima kasih sudah mengunjungi portofolio saya!");
    });

    homeText.appendChild(greeting);
}

const elements = document.querySelectorAll(
    ".bagian h2, .deskripsi, .profil-container, .kartu, .prestasi-card"
);

elements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal-aktif");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

elements.forEach(function (element) {
    observer.observe(element);
});

const topButton = document.createElement("button");
topButton.className = "top-button";
topButton.innerHTML = "↑";
topButton.setAttribute("aria-label", "Kembali ke atas");
document.body.appendChild(topButton);

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topButton.classList.add("top-aktif");
    } else {
        topButton.classList.remove("top-aktif");
    }
});

topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const textControls = document.createElement("div");
textControls.className = "text-controls";

const increaseText = document.createElement("button");
increaseText.textContent = "A+";

const decreaseText = document.createElement("button");
decreaseText.textContent = "A-";

textControls.appendChild(increaseText);
textControls.appendChild(decreaseText);
navbar.appendChild(textControls);

let textSize = 16;

increaseText.addEventListener("click", function () {
    textSize += 2;
    document.body.style.fontSize = textSize + "px";
});

decreaseText.addEventListener("click", function () {
    if (textSize > 10) {
        textSize -= 2;
        document.body.style.fontSize = textSize + "px";
    }
});

document.querySelectorAll(".navbar ul a").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const tujuan = new URL(link.href, window.location.href);

        if (
            tujuan.origin === window.location.origin &&
            tujuan.pathname !== window.location.pathname
        ) {
            const konfirmasi = confirm(
                "Apakah kamu ingin membuka halaman " +
                link.textContent.trim() + "?"
            );

            if (!konfirmasi) {
                event.preventDefault();
            }
        }
    });
});
