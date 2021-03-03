import "../styles/app.scss";

(function() {
  "use strict";

  let container = document.querySelector(".tabs");
  let activeBtnClass = "tabs__button--active";
  let activeTabClass = "tabs__content--active";

  let buttons = container.querySelectorAll(".tabs__button");
  let tabs = container.querySelectorAll(".tabs__content");
  let activeIndex = 0;
  let buttonIndex;

  function eventBtn(btns, index) {
    /* `click` on the each button */
    btns.addEventListener("click", function(btn) {
      btn.preventDefault();
      goToTab(index);
    });
  }

  function goToTab(index) {
    clearActiveClasses();

    /* switch classes */
    if (index !== activeIndex && index >= 0 && index <= buttons.length) {
      buttons[index].classList.add(activeBtnClass);
      tabs[index].classList.add(activeTabClass);
      activeIndex = index;
    } else if (activeIndex >= 0) {
      buttons[activeIndex].classList.add(activeBtnClass);
      tabs[activeIndex].classList.add(activeTabClass);
    }
  }

  function clearActiveClasses() {
    /* remove active classes from all tabs and sections */
    for (let tab = 0; tab < tabs.length; tab++) {
      tabs[tab].classList.remove(activeTabClass);
    }

    for (let button = 0; button < buttons.length; button++) {
      buttons[button].classList.remove(activeBtnClass);
    }
  }

  for (buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
    /* get index of certain button */
    let btnNum = buttons[buttonIndex];

    eventBtn(btnNum, buttonIndex);
  }

  // Second task
  function parseUrl(link) {
    let parser = document.createElement("a");
    parser.href = link;

    return parser;
  }

  let obj = parseUrl("http://ffwagency.com/do/any.php?a=1#foo");
  console.log(obj.hash);
  console.log(obj.hostname);
  console.log(obj.pathname);
})();
