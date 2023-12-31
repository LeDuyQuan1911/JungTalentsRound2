/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
        let sections = document.querySelectorAll("section");
        let nameSections = [];
        let targetIds  = [];
        const navList = document.querySelector("#navbar__list");
        const scrollToTopButton = document.querySelector(".scroll-to-top");
        const fixedNav = document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const toggleNavClass = function(distance,result,indexNav,links){
    if (distance >= -20 && distance <= 100) {
        indexNav.classList.add("your-active-class");
                        for (link of links) {
                            if (
                                link.href.substring(
                                    link.href.length,
                                    link.href.search("#") + 1
                                ) == result
                            ) {
                                link.classList.add("texttransform");
                            } else {
                                link.classList.remove("texttransform");
                            }
                        }
                    } else {
                        indexNav.classList.remove("your-active-class");
                    }
}


function showFixedNav() {
            fixedNav.classList.remove("hide");
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
              fixedNav.classList.add("hide");
            }, 2000);
        }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

for (const section of sections) {
            nameSections.push(section.querySelector("h2").textContent);
            targetIds.push(section.getAttribute("id"));
        }


        let i = 0;
        for (let targetId of targetIds) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("href", `#${targetId}`);
            a.textContent = nameSections[i];
            li.appendChild(a);
            a.classList.add("menu__link");
            navList.appendChild(li);
            i++;


            // Add class 'active' to section when near top of viewport
            let links = document.querySelectorAll("a");
            let indexNavs = document.querySelectorAll("section");
            window.addEventListener("scroll", function (event) {
                for (let indexNav of indexNavs) {
                    const result = indexNav.id;
                    const distance = indexNav.getBoundingClientRect().top.toFixed();
                    toggleNavClass(distance,result,indexNav,links)
                }
            });


            // Scroll to anchor ID using scrollTO event

            for (link of links) {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    let connectTo = event.target.href.substring(
                        event.target.href.length,
                        event.target.href.search("#")
                    );
                    window.scrollTo(
                        0,
                        document.querySelector(connectTo).offsetTop
                    );
                });
            }
        }

          //Top button on the page
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > window.screen.availHeight) {
                scrollToTopButton.classList.add("show");
            } else {
                scrollToTopButton.classList.remove("show");
            }
        });
        scrollToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
            });
        });

          //Hide fixed navigation bar
        let isScrolling;
        let lastMousePos = { x: -1, y: -1 };
        window.addEventListener("scroll", function () {
            showFixedNav();
        });

        window.addEventListener("mousemove", function (event) {
            if (
                event.clientX !== lastMousePos.x ||
                event.clientY !== lastMousePos.y
            ) {
                showFixedNav();
                lastMousePos = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }
        });



