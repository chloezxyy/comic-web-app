let comicId; // middle comic to display
let selectedComicNumber = 3; // onload display 3 comics
let loader = document.getElementById("loader");
let errorMsg = document.querySelector("#error");
let availComic = document.querySelector("#search-container");

// evaluate negative to positive comicIds
const getArrOfComicId = () => {
  let comicArr = [];
  const evalIds = (idNum) => {
    // overflow, min=1 / max=2475
    if (idNum > 2475) {
      return idNum - 2475;
    } else if (idNum < 1) {
      // underflow
      return idNum + 2475;
    }
    // newly evaluated number
    return idNum;
  };

  // get list of comicIds according to selected number of comic
  if (selectedComicNumber === 1) {
    comicArr = [comicId];
  } else if (selectedComicNumber === 3) {
    comicArr = [comicId - 1, comicId, comicId + 1];
  } else if (selectedComicNumber === 5) {
    comicArr = [comicId - 2, comicId - 1, comicId, comicId + 1, comicId + 2];
  }

  // return newly evaluated arr of ids for fetch processing
  return comicArr.map((idArr) => evalIds(idArr));
};

// insert comic data into element to be rendered
async function getComic() {
  // get array of comic id
  let comicIdArr = getArrOfComicId();
  const appendComicAndTitle = (comicTitleDiv, comicDiv, fetchComicData) => {
    let comicTitleId = document.querySelector(comicTitleDiv);
    let comicImgDiv = document.querySelector(comicDiv);
    let comicImg = document.createElement("img");

    comicTitleId.innerHTML = "";
    comicTitleId.innerHTML = fetchComicData.num + " - " + fetchComicData.title;
    comicImgDiv.innerHTML = "";
    comicImg.setAttribute("class", "comic-image");
    comicImg.src = fetchComicData.img;
    comicImg.alt = fetchComicData.alt;

    comicImgDiv.append(comicImg);
  };

  // fetch comics from endpoint
  const getComicData = await Promise.all(
    comicIdArr.map(async (id) => {
      const res = await fetch(
        `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${id}`
      );
      return res.json();
    })
  );

  // map each comicId call into HTML element
  getComicData.map((element, i) => {
    appendComicAndTitle(
      `#comic-title-${i + 1}`,
      `#comic-image-${i + 1}`,
      element
    );
  }, setTimeout(displayLoading, 500));
}

// initialize div elements to be rendered
function displayComicSection() {
  loader.style.display = "";
  let dropDownVal = document.getElementById("selectComicNumber").value;
  selectedComicNumber = +dropDownVal;
  let comicContent = document.getElementById("comic-content");
  comicContent.innerHTML = "";

  // generate comic element/content depending on selected comic #
  for (let i = 1; i < selectedComicNumber + 1; i++) {
    let displayComics = `<div id="comic-grid"><div id="comic-title-${i}" class="comic-title"></div>
    <div id="comic-image-${i}" class="comic-image"></div></div>`;
    comicContent.innerHTML += displayComics;
  }
  getComic();
}

const getOnLoad = () => {
  errorMsg.classList.add("hidden");
  comicId = 2;
  displayComicSection(); // initialize HTML element
  getComic(); // retrieve comic from api
};

// get next array of comicIds
const getNext = () => {
  loader.style.display = "";
  comicId = comicId + selectedComicNumber;
  getComic();
};

// get previous array of comicIds
const getPrev = () => {
  loader.style.display = "";
  comicId = comicId - selectedComicNumber;
  getComic();
};

// get last comicId
const getLast = () => {
  loader.style.display = "";
  alert("last page of comic");
  comicId = 2475;
  getComic();
};

// get first comicId
const getFirst = () => {
  loader.style.display = "";
  alert("go to the start of comic");
  comicId = 2;
  getComic();
};

// generate a random comicId and display as middle comic
const getRandom = () => {
  loader.style.display = "";
  comicId = Math.floor(Math.random() * 2475);
  getComic();
};

// search for specific comic number
const getSearch = () => {
  loader.style.display = "";
  const searchInputValue = document.getElementById("searchInput").value;
  if (searchInputValue === "") {
    return;
  } else if (
    searchInputValue > 2475 ||
    isNaN(searchInputValue) ||
    searchInputValue < 1
  ) {
    errorMsg.classList.remove("hidden");
    availComic.classList.add("bold");
    loader.style.display = "none";
  } else {
    errorMsg.classList.add("hidden");
    availComic.classList.remove("bold");
    comicId = +searchInputValue;
    getComic();
  }
};

// display loading bar when fetching comic from endpoint
const displayLoading = () => {
  loader.style.display = "none";
};

// handle button click event
first.addEventListener("click", getFirst);
next.addEventListener("click", getNext);
last.addEventListener("click", getLast);
prev.addEventListener("click", getPrev);
random.addEventListener("click", getRandom);
searchBtn.addEventListener("click", getSearch); // search specific number button
selectComicNumber.addEventListener("change", displayComicSection); // search specific number button
