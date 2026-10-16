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