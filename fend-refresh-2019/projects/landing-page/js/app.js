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

//Task 1
        let sections = document.querySelectorAll("section");
        let nameSections = [];
        let idSections = [];
        const nav_list = document.querySelector("#navbar__list");
        let i = 0;

//Task 4
        const scrollToTopButton = document.querySelector(".scroll-to-top");

//Task 5
        const fixedNav = document.querySelector(".page__header");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const Distance = function(distance,result,Indexnav,links){
    if (distance >= -20 && distance <= 100) {
                        Indexnav.classList.add("your-active-class");
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
                        Indexnav.classList.remove("your-active-class");
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
            idSections.push(section.getAttribute("id"));
        }

        for (let idSection of idSections) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("href", `#${idSection}`);
            a.textContent = nameSections[i];
            li.appendChild(a);
            a.classList.add("menu__link");
            nav_list.appendChild(li);
            i++;


            // Add class 'active' to section when near top of viewport
            let links = document.querySelectorAll("a");
            let Indexnavs = document.querySelectorAll("section");
            window.addEventListener("scroll", function (event) {
                for (let Indexnav of Indexnavs) {
                    const result = Indexnav.id;
                    const distance = Indexnav.getBoundingClientRect().top.toFixed();
                    Distance(distance,result,Indexnav,links)
                }
            });


            // Scroll to anchor ID using scrollTO event

            for (link of links) {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    let ConnectTo = event.target.href.substring(
                        event.target.href.length,
                        event.target.href.search("#")
                    );
                    window.scrollTo(
                        0,
                        document.querySelector(ConnectTo).offsetTop
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





/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


