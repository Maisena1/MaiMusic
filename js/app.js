import { music } from "../data/music.js";
const msjalert = document.querySelector(".container_msj_alert");
const containerall = document.querySelector(".container");
const container = document.querySelector(".list-music__music");
const containermusic = document.querySelector(".containerMusic__cards");
const pop_ups = document.querySelector(".pop-ups");
const templatemusic = document.querySelector(".templatecards");
const template = document.querySelector(".template");
const arrow = document.querySelector(".arrow-list");
const fragment = document.createDocumentFragment();
const audio = document.querySelector(".audio");
let state = false;
let statearrow = false;
let playing = false;
let music_list = [];
music.forEach((item) => {
  const clone = templatemusic.content.cloneNode(true);
  clone.querySelector("article .card-title").textContent = item.name;
  clone.querySelector("article .card-img ").src = item.disc;
  clone.querySelector("button i").dataset.disc = item.disc;
  clone.querySelector("button i").dataset.title = item.name;
  clone.querySelector("button i").dataset.path = item.music;

  fragment.appendChild(clone);
});
containermusic.appendChild(fragment);
document.addEventListener("click", (e) => {
  // quit alert card
  if (e.target.matches(".alert__btn")) {
    msjalert.style.display = "none";
    containerall.style.filter = "none";
  }
  if (e.target.matches(".bi-plus-circle-fill")) {
    addmusic(e);
  }
  // burger list
  if (e.target.matches("#burgerlist_mobile")) {
    if (state) {
      pop_ups.classList.add("showburger");
      pop_ups.classList.remove("hideburger");
      state = false;
    } else {
      pop_ups.classList.add("hideburger");
      pop_ups.classList.remove("showburger");
      state = true;
    }
  }
  // flip arrow
  if (e.target.matches(".bi-caret-up-fill")) {
    if (statearrow) {
      arrow.style.transform = "rotate(0deg)";
      statearrow = false;
    } else {
      arrow.style.transform = "rotate(180deg)";
      statearrow = true;
    }
  }
  if (e.target.matches(".bi-play-fill")) {
    btnplay(e);
  }
  if (e.target.matches(".bi-pause-fill")) {
    btnpause(e);
  }
  if (e.target.matches(".bi-trash")) {
    music_list.filter((item) => {
      return item.id !== e.target.dataset.id;
    });
  }
});

// search music
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") e.target.value = "";
  if (e.target.matches(".cards")) {
    containermusic.forEach((item) => {
      item
        .querySelectorAll("article .card-title")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
        ? item.querySelectorAll("article").classList.remove("filter")
        : item.querySelectorAll("article").classList.add("filter");
    });
  }
});

const addmusic = (e) => {
  if (music_list.length === 8) {
    return console.log("ya esta lleno");
  } else {
    const music = {
      title: e.target.dataset.title,
      id: e.target.dataset.title,
      disc: e.target.dataset.disc,
      path: e.target.dataset.path,
    };
    const position = music_list.findIndex((item) => {
      return item.title === music.title;
    });
    if (position === -1) {
      music_list.push(music);
    }
  }
  showmusic();
};

const showmusic = () => {
  container.textContent = "";
  music_list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("div .list-music-img").src = item.disc;
    clone.querySelector("div .list-music-title").textContent = item.title;
    clone.querySelector("div .delete").dataset.id = item.id;
    clone.querySelector("div .controlplay").dataset.id = item.id;
    clone.querySelector("div .bi-play-fill").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
};
const btnplay = () => {
  music_list.forEach((item) => {
    let audio = document.createElement("audio");
    if (!playing) {
      audio.setAttribute("src", item.path);
      audio.play();
      playing = true;
    } else {
      audio.pause();
      playing = false;
      audio = "";
    }
  });
};
