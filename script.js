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

/* =========================================
   COLLECTION PAGE INTERACTIONS
========================================= */


/* =========================================
   SCROLL REVEAL
========================================= */

const collectionProjects =
    document.querySelectorAll(
        ".collection-project--reveal"
    );


if (collectionProjects.length) {

    const collectionObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        collectionObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    collectionProjects.forEach(function (project) {

        collectionObserver.observe(project);

    });

}


/* =========================================
   PROJECT FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(
        ".collection-filter__button"
    );


const filterProjects =
    document.querySelectorAll(
        ".collection-project"
    );


if (
    filterButtons.length &&
    filterProjects.length
) {

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFilter =
                    button.dataset.filter;


                /* ACTIVE BUTTON */

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                /* FILTER PROJECTS */

                filterProjects.forEach(
                    function (project) {

                        const category =
                            project.dataset.category;


                        project.classList.remove(
                            "is-filtering"
                        );


                        if (
                            selectedFilter === "all" ||
                            category === selectedFilter
                        ) {

                            project.classList.remove(
                                "is-hidden"
                            );


                            void project.offsetWidth;


                            project.classList.add(
                                "is-filtering"
                            );

                        } else {

                            project.classList.add(
                                "is-hidden"
                            );

                        }

                    }
                );

            }
        );

    });

}


/* =========================================
   PROJECT SCROLL TRACKING
========================================= */

const sideNavItems =
    document.querySelectorAll(
        ".collection-side-nav__item"
    );


const progressNumber =
    document.querySelector(
        ".collection-progress__current"
    );


const projectSections =
    document.querySelectorAll(
        ".collection-project"
    );


if (
    sideNavItems.length &&
    projectSections.length
) {

    const projectObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const projectId =
                        entry.target.id;


                    sideNavItems.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );


                            if (
                                item.dataset.project ===
                                projectId
                            ) {

                                item.classList.add(
                                    "active"
                                );

                            }

                        }
                    );


                    const currentIndex =
                        Array.from(
                            projectSections
                        ).indexOf(entry.target);


                    if (progressNumber) {

                        progressNumber.textContent =
                            String(
                                currentIndex + 1
                            ).padStart(2, "0");

                    }

                });

            },

            {
                threshold: 0.3
            }

        );


    projectSections.forEach(
        function (project) {

            projectObserver.observe(
                project
            );

        }
    );

}

/* =====================================================
   WIY ASSISTANT
===================================================== */

const wiyAiButton = document.getElementById("wiyAiButton");
const wiyAi = document.getElementById("wiyAi");
const wiyAiClose = document.getElementById("wiyAiClose");
const wiyAiForm = document.getElementById("wiyAiForm");
const wiyAiInput = document.getElementById("wiyAiInput");
const wiyAiMessages = document.getElementById("wiyAiMessages");
const wiyAiSuggestions = document.getElementById("wiyAiSuggestions");


function openWiyAi() {

    wiyAi.classList.add("is-open");

    wiyAi.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        wiyAiInput.focus();
    }, 300);
}


function closeWiyAi() {

    wiyAi.classList.remove("is-open");

    wiyAi.setAttribute("aria-hidden", "true");
}


wiyAiButton.addEventListener("click", openWiyAi);

wiyAiClose.addEventListener("click", closeWiyAi);


/* Close with Escape */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        wiyAi.classList.contains("is-open")
    ) {
        closeWiyAi();
    }

});


/* Suggested questions */

document.querySelectorAll(
    ".wiy-ai__suggestions button"
).forEach((button) => {

    button.addEventListener("click", () => {

        const question = button.dataset.question;

        wiyAiInput.value = question;

        wiyAiForm.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true
            })
        );

    });

});


/* Temporary message handler */

wiyAiForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = wiyAiInput.value.trim();

    if (!message) {
        return;
    }

    /* Add visitor message */

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "wiy-ai__message wiy-ai__message--user";

    userMessage.innerHTML =
        `<p>${escapeWiyAiHTML(message)}</p>`;

    wiyAiMessages.appendChild(userMessage);


    /* Hide suggestions */

    if (wiyAiSuggestions) {
        wiyAiSuggestions.style.display = "none";
    }


    /* Clear input */

    wiyAiInput.value = "";


    /* Temporary response */

    setTimeout(() => {

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "wiy-ai__message wiy-ai__message--bot";

        botMessage.innerHTML = `
            <span class="wiy-ai__label">
                WIY AI
            </span>

            <p>
                I'm almost ready to help with that. WIY Assistant
                is currently being connected to the AI system.
            </p>
        `;

        wiyAiMessages.appendChild(botMessage);

        wiyAiMessages.scrollTop =
            wiyAiMessages.scrollHeight;

    }, 500);

});


function escapeWiyAiHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}

