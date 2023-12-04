import dataSlider from "./dataSlider.json" assert { type: "json" };


// Static variable
let INDEX_SLIDER = 1;

const LENGHT_SLIDER = dataSlider.length;

const ACTION = {
  NEXT: "next",
  BACK: "back"
}

const event = {
  click: "click",
}




// element
const boxSlider = document.getElementById("box-slider");
const listSlider = document.getElementById("list");
const btnNext = document.querySelector("#btn-next");
const btnBack = document.querySelector("#btn-back");
const lisIndexSlider = document.querySelector("#index-slider");



// template
const indexSliderTemplate = (index) =>  {
  return (
    `<li id="index-${index}"></li>`
  )
};

const sliderTemplate = (props) => {
  return (
    `
    <div class="slider">
      <img src="${props["href-image"]}" alt="" id="img-show" class="img-slider">
    </div>
    `
  )
}



// hander
const handleNavigation = (action) => {
  const sliderWidth = boxSlider.offsetWidth;

  if(ACTION.NEXT === action) {
    INDEX_SLIDER = INDEX_SLIDER >= LENGHT_SLIDER - 1 ? LENGHT_SLIDER : INDEX_SLIDER + 1;
    listSlider.style.transform = `translateX(${-1 * sliderWidth * (INDEX_SLIDER - 1)}px)`;
  } else {
    INDEX_SLIDER = INDEX_SLIDER <= 1 ? INDEX_SLIDER : INDEX_SLIDER - 1;
    listSlider.style.transform = `translateX(${-1 * sliderWidth * (INDEX_SLIDER - 1)}px)`;
  }
  

  activeIndex();
}



const render = () => {
  renderListSlider();
  renderListIndex();
  activeIndex();
}

const renderListSlider = () => {
  const sliderWidth = boxSlider.offsetWidth;
  listSlider.style.width = sliderWidth * LENGHT_SLIDER;

  let templateSliderString = "";
  dataSlider.forEach((d) => {
    templateSliderString += sliderTemplate(d);
  });
  listSlider.innerHTML = templateSliderString;
}

const renderListIndex = () => {
  let templateString = "";
  dataSlider.forEach((d) => {
    templateString += indexSliderTemplate(d.id);
  })
  lisIndexSlider.innerHTML = templateString;
}

const reSize = () => {
  const sliderWidth = boxSlider.offsetWidth;
  listSlider.style.transform = `translateX(${-1 * sliderWidth * (INDEX_SLIDER - 1)}px)`;
}

const activeIndex = () => {
  const childs = lisIndexSlider.children;
  [...childs].forEach((c) => {
    const id = Number(`${c.id}`.split("-")[1]);
    if(id === INDEX_SLIDER) {
      c.classList.add("index-active");
    } else {
      c.classList.remove("index-active");
    }
  })
}


// add-event element
btnNext.addEventListener(event.click, () => handleNavigation(ACTION.NEXT));
btnBack.addEventListener(event.click, () => handleNavigation(ACTION.BACK));
boxSlider.addEventListener("resize", () => reSize());




// Init
const init = () => {
  render();
}
init();