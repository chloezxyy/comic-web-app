const spinner = document.getElementById("spinner");

let comicId; // middle comic to display
let selectedComicNumber = 3; // onload display 3 comics

let curComic;
let lastComic;
let prevComicId = comicId - selectedComicNumber;
let nextComicId = comicId + selectedComicNumber;

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

  // return evaluated arr of ids for fetch processing
  return comicArr.map((idArr) => evalIds(idArr));
};

async function getComic(selectedComicNumber, comicId) {
  console.log("getComic");
  spinner.removeAttribute("hidden");
  spinner.setAttribute("hidden", "");

  let comicIdArr = getArrOfComicId(selectedComicNumber);

  console.log("getComic", comicIdArr);

  const getComicData = await Promise.all(
    comicIdArr.map(async (id) => {
      const res = await fetch(
        `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${id}`
      );
      return res.json();
    })
  );
  // map each comicId call into HTML element
  getComicData.map((res) => console.log("RES", res));
}

function displayComicSection() {
  let dropDownVal = document.getElementById("selectComicNumber").value;
  selectedComicNumber = +dropDownVal;
  let comicContent = document.getElementById("comic-content");
  comicContent.innerHTML = "";
  console.log("selectedComicNumber", selectedComicNumber);
  // generate 1/3/5 elements, start iterating at id = 1, to 3 and to 5 elements in the comicIdArr
  for (let i = 1; i < selectedComicNumber + 1; i++) {
    let displayComics = `<div id="comic-title-${i}" class="comic-title-${i}"></div>
    <div id="comic-image-${i}"></div>`;
    comicContent.append(displayComics);
  }
  getComic(selectedComicNumber, comicId);
}

const getOnLoad = () => {
  comicId = 2;
  curComic = comicId;
  displayComicSection();
  getComic(selectedComicNumber, comicId);
};

const getNext = () => {
  comicId = comicId + selectedComicNumber;
  curComic = comicId;
  getComic(selectedComicNumber, comicId);
};
const getPrev = () => {
  comicId = comicId - selectedComicNumber;
  curComic = comicId;
  getComic(selectedComicNumber, comicId);
};
const getLast = () => {
  alert("last page of comic");
  comicId = 2475;
  curComic = comicId;
  getComic(selectedComicNumber, comicId);
};

const getFirst = () => {
  alert("go to the start of comic");
  comicId = 2;
  curComic = comicId;
  getComic(selectedComicNumber, comicId);
};

const getRandom = () => {
  comicId = Math.floor(Math.random() * 2475);
  curComic = comicId;
  getComic(selectedComicNumber, comicId);
};

const getSearch = () => {
  const searchInputValue = document.getElementById("searchInput").value;
  if (searchInputValue === "") {
    return;
  }
  comicId = +searchInputValue;
  curComic = +comicId;
  getComic(selectedComicNumber, comicId);
};

// handle button click event
first.addEventListener("click", getFirst);
next.addEventListener("click", getNext);
last.addEventListener("click", getLast);
prev.addEventListener("click", getPrev);
random.addEventListener("click", getRandom);
searchBtn.addEventListener("click", getSearch); // search specific number button
selectComicNumber.addEventListener("change", displayComicSection); // search specific number button
