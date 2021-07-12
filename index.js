// list of comic endpoints with CORS enabled
// https://xkcd.vercel.app/?comic=1
// https://xkcd.vercel.app/?comic=2
// .....

// function getData() {
//   let firstAPICall = fetch(`https://xkcd.vercel.app/?comic=${comicId}`);
//   let secondAPICall = fetch("https://api.endpoint.com/second");

//   Promise.all([firstAPICall, secondAPICall])
//     .then(values => Promise.all(values.map(value => value.json())))
//     .then(finalVals => {
//       let firstAPIResp = finalVals[0];
//       let secondAPIResp = finalVals[1];
//       renderHTML(firstAPIResp, secondAPIResp);
//     });
// }

const spinner = document.getElementById("spinner");
let curComic = "";
let lastComic = "";
// convert comicId from string to int
let comicId = 1;
let prevComicId = comicId - 1;
let nextComicId = comicId + 1;

const dropDownSelection = () => {
  // if select 1, hide both left and right comic, left middle
  // if select 2, hide left
  // if select 3, show all -> default 3 screens
};

const getComic = () =>
  // convert to Promise.all
  fetch(`https://xkcd.vercel.app/?comic=${comicId}`)
    .then((res) => res.json())
    .then((data) => data);
fetch(`https://xkcd.vercel.app/?comic=${prevComicId}`)
  .then((res) => res.json())
  .then((data) => data);
fetch(`https://xkcd.vercel.app/?comic=${nextComicId}`)
  .then((res) => res.json())
  .then((data) => data);

const showComic = async (selectedOption) => {
  // get next, cur and prev comics
  let comicJson = await getComic();

  // if there is comic image
  console.log("comicJson", comicJson);
  if (comicJson.img) {
    // display comic # and title
    if (comicJson.num !== 1) {
      prevComicTitle.innerHTML = `${comicJson.num - 1} - ${comicJson.title}`;
    } else {
      prevComicTitle.innerHTML = "Start";
    }
    comicTitle.innerHTML = `${comicJson.num} - ${comicJson.title}`;
    if (comicJson.num + 1 <= lastComic) {
      nextComicTitle.innerHTML = `${comicJson.num + 1} - ${comicJson.title}`;
    } else {
      nextComicTitle.innerHTML = "End";
    }

    // styling
    // hide this if selectedOption == 2 and == 1
    console.log("curComic", curComic);
    if (!curComic) {
      comicImgPrev.style.visibility = "hidden";
    } else {
      comicImgPrev.style.maxWidth = "10%";
      comicImgPrev.style.height = "auto";
      comicImgPrev.src = comicJson.img;
    }

    comicImg.style.maxWidth = "50%";
    comicImg.style.height = "auto";
    comicImg.src = comicJson.img;

    // hide this if selectedOption == 1
    if (comicJson.num + 1 <= lastComic) {
      comicImgNext.style.maxWidth = "10%";
      comicImgNext.style.height = "auto";
      comicImgNext.src = comicJson.img;
    } else {
      comicImgNext.style.visibility = "hidden";
    }

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
  showComic();
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
