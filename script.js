const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");

});

overlay.addEventListener("click", () => {

    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");

});

window.addEventListener("resize", () => {

    if(window.innerWidth > 1024){

        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    }

});

/* =========================
   HERO LOGO SCROLL EFFECT
========================= */

const hero = document.querySelector(".hero");
const heroLogo = document.querySelector(".hero__logo-layer");

function updateHeroLogo() {

    if (!hero || !heroLogo) return;

    const scrollPosition = window.scrollY;

    const heroHeight = hero.offsetHeight;

    const fadeDistance = heroHeight * 0.75;

    const progress = Math.min(
        scrollPosition / fadeDistance,
        1
    );

    /*
        Move the logo upward as the user scrolls.
    */

    const moveUp = progress * 180;

    /*
        Fade the logo out as the user scrolls.
    */

    const opacity = 0.45 * (1 - progress);

    heroLogo.style.transform =
        `translateX(-50%) translateY(-${moveUp}px)`;

    heroLogo.style.opacity = opacity;
}


window.addEventListener("scroll", updateHeroLogo);

window.addEventListener("resize", updateHeroLogo);

updateHeroLogo();

