// list of comic endpoints with CORS enabled
// https://xkcd.vercel.app/?comic=1
// https://xkcd.vercel.app/?comic=2
// https://xkcd.vercel.app/?comic=3
// https://xkcd.vercel.app/?comic=4
// https://xkcd.vercel.app/?comic=5
// https://xkcd.vercel.app/?comic=6

// (function getComics() {
//   fetch("https://xkcd.vercel.app/?comic=1")
//     .then((response) => {
//       console.log("resss", response);
//       return response.json();
//     })
//     .then((data) => console.log("HERE ZE ADATA", data));
// })();

// vars to keep track of the index of the comic for next, prev button

let curComic = "";
let lastComic = "";
// convert comicId from string to int
let comicId = 1;
console.log("comicId", comicId);

const getComic = () =>
  fetch(`https://xkcd.vercel.app/?comic=${comicId}`)
    .then((res) => res.json())
    .then((data) => data);

const showComic = async () => {
  let comicJson = await getComic();
  const comicTitle = document.querySelector("#comicTitle");
  const comicImg = document.querySelector("#comicImg");
  const lastInput = document.querySelector("#lastInput");

  // if there is comic image
  console.log("comicJson", comicJson);
  if (comicJson.img) {
    // display comic # and title
    comicTitle.innerHTML = `${comicJson.num} - ${comicJson.title}`;

    // styling
    comicImg.style.maxWidth = "100%";
    comicImg.style.height = "auto";
    comicImg.src = comicJson.img;

    // assign num to current var curComic
    curComic = comicJson.num;
    if (comicId === 6) {
      // onload to define last comic
      lastComic = comicJson.num;
      console.log("last comic", lastComic);
      lastInput.innerText = lastComic;
    }
  } else {
    // if img not loading properly
    alert("no comic displaying");
    comicImg.src = "";
    comicImg.alt = "";
  }
};

const getOnLoad = () => {
  comicId = 6;
  showComic();
};

const getFirst = () => {
  console.log("getFirst");
  if (curComic === 1) {
    console.log("getFirst inside if", curComic, lastComic);
    return;
  }
  comicId = 1;
  showComic();
};
const getLast = () => {
  if (curComic === lastComic) {
    return;
  }
  comicId = lastComic;
  showComic();
};

const getNext = () => {
  console.log("inside getNext");
  if (curComic >= lastComic) {
    return;
  }
  comicId = curComic + 1;
  showComic();
};
const getPrev = () => {
  if (curComic <= 1) {
    return;
  }
  comicId = curComic - 1;
  showComic;
};

const getRandom = () => {
  comicId = Math.floor(Math.random() * 7);
  showComic();
};
const getSearch = () => {
  const searchInputValue = document.getElementById("searchInput").value;
  if (searchInputValue === "") {
    return;
  }
  comicId = searchInputValue;
  console.log("HERE", comicId);
  showComic();
  searchInputValue = ""; // reset input field
};

// handle button click event
first.addEventListener("click", getFirst);
next.addEventListener("click", getNext);
last.addEventListener("click", getLast);
prev.addEventListener("click", getPrev);
random.addEventListener("click", getRandom);
searchBtn.addEventListener("click", getSearch); // search specific number button
