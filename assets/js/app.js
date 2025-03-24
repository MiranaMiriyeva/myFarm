let buyAnimalBtn = document.querySelector(".buyAnimalBtn");
let buyAnimalModal = document.querySelector(".buyAnimalModal");
let closeAnimalModalBtn = document.querySelector(".closeAnimalModal");
let buyTheAnimal = document.querySelectorAll(".buyTheAnimal");
let chickenHeading = document.querySelector(".chickenHeading");
let sheepHeading = document.querySelector(".sheepHeading");
let cowHeading = document.querySelector(".cowHeading");
let mainContainer = document.querySelector(".mainContainer");
let buyFoodBtn = document.querySelector(".buyFoodBtn");
let buyFeedingModal = document.querySelector(".buyFeedingModal");
let closeFeedingModal = document.querySelector(".closeFeedingModal");
let buyFeedings = document.querySelectorAll(".buyFeedings");
let buyDecorationBtn = document.querySelector(".buyDecorationBtn");
let buyDecorationModal = document.querySelector(".buyDecorationModal");
let closeDecorationModalBtn = document.querySelector(".closeDecorationModal");
let infoBtn = document.querySelector(".info_btn");
let infoModal = document.querySelector(".info_modal");
let closeInfoBtn = document.querySelector(".close_info_btn");
let buyDecorations = document.querySelectorAll(".buyDecorations");

let earningCoinCoint = document.querySelector(".earningCoinCoint");
let expenseFeedingCoint = document.querySelector(".expenseFeedingCoint");
let coinCount = document.querySelector(".coinCount");
let feedingCount = document.querySelector(".feedingCount");
let coinCountValue = 0;
let feedingCountValue = 100;
let earningCoinCointValue = 0;
let expenseFeedingCointValue = 0;
let myInterval = null;
let clickAudio = new Audio(
  "https://cdn.pixabay.com/audio/2024/08/20/audio_4316b51e13.mp3"
);

let animalsArr = [
  {
    name: "sheep",
    price: 20,
    count: 1,
    value: 5,
    feedingKg: 3,
    img: "https://i.pinimg.com/originals/77/be/45/77be45145d0f912de33ed819b1a6fae7.gif",
    sound: "https://cdn.pixabay.com/audio/2024/07/09/audio_cfc596bcb9.mp3",
    positions: [],
  },
  {
    name: "chicken",
    price: 10,
    count: 0,
    value: 2,
    feedingKg: 1,
    img: "https://i.pinimg.com/originals/46/4e/88/464e88b64ed00fa395b38b23da0aa4c4.gif",
    sound: "https://cdn.pixabay.com/audio/2024/07/30/audio_c9a02641ca.mp3",
    positions: [],
  },
  {
    name: "cow",
    price: 40,
    count: 0,
    feedingKg: 4,
    value: 10,
    img: "https://i.gifer.com/Za9e.gif",
    sound: "https://cdn.pixabay.com/audio/2024/07/10/audio_5a876052c2.mp3",
    positions: [],
  },
];

let decorationsArr = [];
let decorationImages = [
  "./assets/imgs/dec1.webp",
  "./assets/imgs/dec2.webp",
  "./assets/imgs/dec3.webp",
  "./assets/imgs/dec4.webp",
  "./assets/imgs/dec5.webp",
  "./assets/imgs/dec6.webp",
  "./assets/imgs/dec7.webp",
  "./assets/imgs/dec8.webp",
  "./assets/imgs/dec9.webp",
  "./assets/imgs/dec10.webp",
];

function getAnimalPosition() {
  return {
    top: 40 + Math.random() * 55,
    left: 7 + Math.random() * 90,
  };
}

function getDecorationPosition() {
  return {
    top: 40 + Math.random() * 55,
    left: 7 + Math.random() * 90,
  };
}

function loadFromLocalStorage() {
  if (JSON.parse(localStorage.getItem("animalsArr"))) {
    animalsArr = JSON.parse(localStorage.getItem("animalsArr"));
    animalsArr.forEach((animal, animalIndex) => {
      switch (animal.name) {
        case "chicken":
          chickenHeading.children[1].textContent = animal.count;
          chickenHeading.style.display = "flex";
          break;
        case "sheep":
          sheepHeading.children[1].textContent = animal.count;
          sheepHeading.style.display = "flex";
          break;
        case "cow":
          cowHeading.children[1].textContent = animal.count;
          cowHeading.style.display = "flex";
          break;
      }

      animal.positions.forEach((pos, positionIndex) => {
        const animalImg = createAnimalImage(animal.img, pos.left, pos.top);
        animalImg.dataset.animalIndex = animalIndex;
        animalImg.dataset.positionIndex = positionIndex;
      });
    });
  }

  if (JSON.parse(localStorage.getItem("decorationsArr"))) {
    decorationsArr = JSON.parse(localStorage.getItem("decorationsArr"));
    decorationsArr.forEach((dec, index) => {
      const decoration = createDecoration(dec.imgSrc, dec.left, dec.top);
      decoration.dataset.positionId = index;
    });
  }

  if (localStorage.getItem("coinCount")) {
    coinCountValue = +localStorage.getItem("coinCount");
    coinCount.innerHTML = coinCountValue;
  }
  if (localStorage.getItem("feedingCount")) {
    feedingCountValue = +localStorage.getItem("feedingCount");
    feedingCount.innerHTML = feedingCountValue;
  }
  if (localStorage.getItem("earningCoinCointValue")) {
    earningCoinCointValue = +localStorage.getItem("earningCoinCointValue");
    earningCoinCoint.textContent = earningCoinCointValue;
  }
  if (localStorage.getItem("expenseFeedingCointValue")) {
    expenseFeedingCointValue = +localStorage.getItem(
      "expenseFeedingCointValue"
    );
    expenseFeedingCoint.innerHTML = expenseFeedingCointValue;
  }
}

function createAnimalImage(imgSrc, left, top) {
  const image = document.createElement("img");
  image.src = imgSrc;
  image.classList.add("animalImg");
  image.style.left = `${left}%`;
  image.style.top = `${top}%`;
  image.style.position = "absolute";
  image.style.width = "80px";
  image.style.height = "auto";
  image.style.zIndex = "1";
  image.draggable = true;

  image.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", "");
    this.style.cursor = "grabbing";
    this.style.zIndex = 1000;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.initialLeft = parseFloat(this.style.left);
    this.initialTop = parseFloat(this.style.top);
  });

  image.addEventListener("dragend", function (e) {
    this.style.cursor = "grab";
    this.style.zIndex = "1";

    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    let newLeft = this.initialLeft + (deltaX / window.innerWidth) * 100;
    let newTop = this.initialTop + (deltaY / window.innerHeight) * 100;

    newLeft = Math.max(5, Math.min(93, newLeft));
    newTop = Math.max(40, Math.min(90, newTop));

    this.style.left = `${newLeft}%`;
    this.style.top = `${newTop}%`;

    const animalIndex = parseInt(this.dataset.animalIndex);
    const positionIndex = parseInt(this.dataset.positionIndex);

    if (!isNaN(animalIndex) && !isNaN(positionIndex)) {
      animalsArr[animalIndex].positions[positionIndex] = {
        left: newLeft,
        top: newTop,
      };
      updateLocalStorage();
    }
  });

  mainContainer.appendChild(image);
  return image;
}

function createDecoration(imgSrc, left, top) {
  const decoration = document.createElement("img");
  decoration.src = imgSrc;
  decoration.classList.add("decoration");
  decoration.style.left = `${left}%`;
  decoration.style.top = `${top}%`;
  decoration.style.position = "absolute";
  decoration.style.width = "100px";
  decoration.style.height = "auto";
  decoration.style.zIndex = "1";
  decoration.draggable = true;

  decoration.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", "");
    this.style.cursor = "grabbing";
    this.style.zIndex = 1000;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.initialLeft = parseFloat(this.style.left);
    this.initialTop = parseFloat(this.style.top);
  });

  decoration.addEventListener("dragend", function (e) {
    this.style.cursor = "grab";
    this.style.zIndex = "1";

    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    let newLeft = this.initialLeft + (deltaX / window.innerWidth) * 100;
    let newTop = this.initialTop + (deltaY / window.innerHeight) * 100;

    newLeft = Math.max(5, Math.min(90, newLeft));
    newTop = Math.max(40, Math.min(90, newTop));

    this.style.left = `${newLeft}%`;
    this.style.top = `${newTop}%`;

    if (this.dataset.positionId !== undefined) {
      decorationsArr[this.dataset.positionId] = {
        imgSrc,
        left: newLeft,
        top: newTop,
      };
      updateLocalStorage();
    }
  });

  mainContainer.appendChild(decoration);
  return decoration;
}

function updateLocalStorage() {
  localStorage.setItem("animalsArr", JSON.stringify(animalsArr));
  localStorage.setItem("decorationsArr", JSON.stringify(decorationsArr));
  localStorage.setItem("coinCount", coinCountValue);
  localStorage.setItem("feedingCount", feedingCountValue);
  localStorage.setItem("earningCoinCointValue", earningCoinCointValue);
  localStorage.setItem("expenseFeedingCointValue", expenseFeedingCointValue);
}

buyAnimalBtn.addEventListener("click", () => toggleModal(buyAnimalModal));
buyFoodBtn.addEventListener("click", () => toggleModal(buyFeedingModal));
buyDecorationBtn.addEventListener("click", () =>
  toggleModal(buyDecorationModal)
);
infoBtn.addEventListener("click", () => toggleModal(infoModal));

closeAnimalModalBtn.addEventListener("click", () =>
  toggleModal(buyAnimalModal)
);
closeFeedingModal.addEventListener("click", () => toggleModal(buyFeedingModal));
closeDecorationModalBtn.addEventListener("click", () =>
  toggleModal(buyDecorationModal)
);
closeInfoBtn.addEventListener("click", () => toggleModal(infoModal));

function toggleModal(modal) {
  modal.style.opacity = modal.style.opacity === "1" ? "0" : "1";
  modal.style.visibility =
    modal.style.visibility === "visible" ? "hidden" : "visible";
  clickAudio.play();
}

buyTheAnimal.forEach((btn) => {
  btn.addEventListener("click", function () {
    animalsArr.forEach((animal, animalIndex) => {
      if (btn.id === animal.name && animal.price <= coinCountValue) {
        clickAudio.play();
        coinCountValue -= animal.price;
        animal.count++;

        const position = getAnimalPosition();
        animal.positions.push(position);
        const animalImg = createAnimalImage(
          animal.img,
          position.left,
          position.top
        );
        animalImg.dataset.animalIndex = animalIndex;
        animalImg.dataset.positionIndex = animal.positions.length - 1;

        updateAnimalUI(animal);
        updateEarnings();
        updateLocalStorage();
      } else if (btn.id === animal.name) {
        alert("Not enough coins!");
      }
    });
  });
});

function updateAnimalUI(animal) {
  switch (animal.name) {
    case "chicken":
      chickenHeading.children[1].textContent = animal.count;
      chickenHeading.style.display = "flex";
      break;
    case "sheep":
      sheepHeading.children[1].textContent = animal.count;
      sheepHeading.style.display = "flex";
      break;
    case "cow":
      cowHeading.children[1].textContent = animal.count;
      cowHeading.style.display = "flex";
      break;
  }
  coinCount.innerHTML = coinCountValue;
  new Audio(animal.sound).play();
}

buyFeedings.forEach((btn) => {
  btn.addEventListener("click", function () {
    const amount = +btn.id;
    const prices = { 50: 10, 100: 18, 500: 80 };

    if (prices[amount] <= coinCountValue) {
      clickAudio.play();
      feedingCountValue += amount;
      coinCountValue -= prices[amount];

      coinCount.innerHTML = coinCountValue;
      feedingCount.innerHTML = feedingCountValue;

      if (feedingCountValue > 0 && !myInterval) {
        usingInterval();
      }
      updateLocalStorage();
    } else {
      alert("Not enough coins!");
    }
  });
});

buyDecorations.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const price = parseInt(btn.previousElementSibling.textContent);

    if (price <= coinCountValue) {
      clickAudio.play();
      coinCountValue -= price;
      coinCount.innerHTML = coinCountValue;

      const position = getDecorationPosition();
      const imgSrc = decorationImages[index];
      const decoration = createDecoration(imgSrc, position.left, position.top);
      decorationsArr.push({ imgSrc, left: position.left, top: position.top });
      decoration.dataset.positionId = decorationsArr.length - 1;

      updateLocalStorage();
    } else {
      alert("Not enough coins!");
    }
  });
});

function usingInterval() {
  clearInterval(myInterval);
  myInterval = setInterval(() => {
    animalsArr.forEach((animal) => {
      coinCountValue += animal.value * animal.count;

      const feedingCost = animal.feedingKg * animal.count;
      if (feedingCountValue >= feedingCost) {
        feedingCountValue -= feedingCost;
      } else {
        feedingCountValue = 0;
      }
    });

    if (feedingCountValue <= 0) {
      clearInterval(myInterval);
      myInterval = null;
      alert("Out of feed! Purchase more to continue.");
    }

    coinCount.innerHTML = coinCountValue;
    feedingCount.innerHTML = feedingCountValue;
    updateEarnings();
    updateLocalStorage();
  }, 5000);
}

function updateEarnings() {
  earningCoinCointValue = animalsArr.reduce(
    (sum, animal) => sum + animal.value * animal.count,
    0
  );
  expenseFeedingCointValue = animalsArr.reduce(
    (sum, animal) => sum + animal.feedingKg * animal.count,
    0
  );

  earningCoinCoint.textContent = earningCoinCointValue;
  expenseFeedingCoint.innerHTML = expenseFeedingCointValue;
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  if (feedingCountValue > 0) {
    usingInterval();
  }
  updateEarnings();
});
