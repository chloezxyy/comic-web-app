const dropDownSelection = () => {
  // if select 1, hide both left and right comic, left middle
  // if select 2, hide left
  // if select 3, show all -> default 3 screens
};

const spinner = document.getElementById("spinner");
let curComic;
let lastComic;
let comicId;
let prevComicId = comicId - 1;
let nextComicId = comicId + 1;

async function getComic() {
  console.log("indexes", prevComicId, comicId, nextComicId);

  let prevComicFetch = fetch(
    `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${prevComicId}`
  );
  let comicFetch = fetch(
    `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${comicId}`
  );
  let nextComicFetch = fetch(
    `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${nextComicId}`
  );
  let resData = [];
  await Promise.all([prevComicFetch, comicFetch, nextComicFetch])
    .then((values) => Promise.all(values.map((value) => value.json())))
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map((res) => res));
    })
    .then((data) => {
      console.log("data", data);
      return resData.push(data);
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log("error", error);
    });
  // console.log("resData", resData);
  return resData;
}

async function showComic() {
  spinner.removeAttribute("hidden");
  let comicJson = await getComic();
  comicJson = comicJson[0];
  spinner.setAttribute("hidden", "");

  if (comicJson) {
    for (let i = 0; i < comicJson.length - 2; i++) {
      if (comicJson[i].img) {
        prevComicTitle.innerHTML = `${comicJson[i].num} - ${comicJson[i].title}`;
        comicTitle.innerHTML = `${comicJson[i + 1].num} - ${
          comicJson[i + 1].title
        }`;
        nextComicTitle.innerHTML = `${comicJson[i + 2].num} - ${
          comicJson[i + 2].title
        }`;
      }

      comicImgPrev.style.maxWidth = "10%";
      comicImgPrev.style.height = "auto";
      comicImgPrev.src = comicJson[i].img;

      comicImg.style.maxWidth = "50%";
      comicImg.style.height = "auto";
      comicImg.src = comicJson[i + 1].img;

      comicImgNext.style.maxWidth = "10%";
      comicImgNext.style.height = "auto";
      comicImgNext.src = comicJson[i + 2].img;

      // assign num to current var curComic

      curComic = comicJson[i].num;
      console.log("hiak", lastComic);

      if (comicId === 6) {
        // onload to define last comic
        lastComic = comicJson[i].num;
        console.log("hiak", lastComic);
        lastInput.innerHTML = lastComic + 1;
      } else {
        // if img not loading properly
        console.log("no comic displaying");
      }
    }
  }
}

const getOnLoad = () => {
  comicId = 6;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};

const getFirst = () => {
  alert("start of comic");
  if (curComic === 1) {
    // console.log("getFirst inside if", curComic, lastComic);
    return;
  }
  comicId = 2;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};
const getNext = () => {
  if (curComic >= lastComic) {
    alert("end of comic");
    return;
  }
  comicId = comicId + 1;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};
const getPrev = () => {
  if (curComic <= 1) {
    return;
  }
  comicId = comicId - 1;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};
const getLast = () => {
  if (curComic === lastComic) {
    alert("last page of comic");
    return;
  }
  comicId = 7;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};

const getRandom = () => {
  comicId = Math.floor(Math.random() + 0.1 * 7);
  if (!lastComic) {
    alert("something went wrong, try refreshing the page");
  }
  comicId = curComic;
  lastComic = 6;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};
const getSearch = () => {
  const searchInputValue = document.getElementById("searchInput").value;
  if (searchInputValue === "") {
    return;
  }
  comicId = searchInputValue;
  curComic = comicId;
  prevComicId = comicId - 1;
  nextComicId = comicId + 1;
  showComic();
};

// handle button click event
first.addEventListener("click", getFirst);
next.addEventListener("click", getNext);
last.addEventListener("click", getLast);
prev.addEventListener("click", getPrev);
random.addEventListener("click", getRandom);
searchBtn.addEventListener("click", getSearch); // search specific number button
