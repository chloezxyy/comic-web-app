let comicId; // middle comic to display
let selectedComicNumber = 3; // onload display 3 comics
let loader = document.getElementById("loader");

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

async function getComic(selectedComicNumber) {
  let comicIdArr = getArrOfComicId(selectedComicNumber);

  const appendComicAndTitle = (comicTitleDiv, comicDiv, fetchComicData) => {
    let comicTitleId = document.querySelector(comicTitleDiv);
    comicTitleId.innerHTML = "";
    comicTitleId.innerHTML = fetchComicData.num + " - " + fetchComicData.title;

    let comicImgDiv = document.querySelector(comicDiv);
    comicImgDiv.innerHTML = "";
    let comicImg = document.createElement("img");
    comicImg.setAttribute("class", "comic-image");
    comicImg.src = fetchComicData.img;
    comicImg.alt = fetchComicData.alt;
    comicImgDiv.append(comicImg);
  };

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

function displayComicSection() {
  loader.style.display = "";
  let dropDownVal = document.getElementById("selectComicNumber").value;
  selectedComicNumber = +dropDownVal;
  let comicContent = document.getElementById("comic-content");
  comicContent.innerHTML = "";

  for (let i = 1; i < selectedComicNumber + 1; i++) {
    let displayComics = `<div id="comic-grid"><div id="comic-title-${i}" class="comic-title-${i}"></div>
    <div id="comic-image-${i}" class="comic-image"></div></div>`;
    comicContent.innerHTML += displayComics;
  }
  getComic(selectedComicNumber);
}

const getOnLoad = () => {
  comicId = 2;
  displayComicSection(); // initialize HTML element
  getComic(selectedComicNumber); // retrieve comic from api
};

const getNext = () => {
  loader.style.display = "";
  comicId = comicId + selectedComicNumber;
  getComic(selectedComicNumber);
};
const getPrev = () => {
  loader.style.display = "";
  comicId = comicId - selectedComicNumber;
  getComic(selectedComicNumber);
};
const getLast = () => {
  loader.style.display = "";
  alert("last page of comic");
  comicId = 2475;
  getComic(selectedComicNumber);
};

const getFirst = () => {
  loader.style.display = "";
  alert("go to the start of comic");
  comicId = 2;
  getComic(selectedComicNumber);
};

const getRandom = () => {
  loader.style.display = "";
  comicId = Math.floor(Math.random() * 2475);
  getComic(selectedComicNumber);
};

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
    alert("invalid comic #");
    loader.style.display = "none";
  } else {
    comicId = +searchInputValue;
    getComic(selectedComicNumber);
  }
};

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
