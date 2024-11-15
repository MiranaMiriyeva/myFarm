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
  },
  {
    name: "chicken",
    price: 10,
    count: 0,
    value: 2,
    feedingKg: 1,
    img: "https://i.pinimg.com/originals/46/4e/88/464e88b64ed00fa395b38b23da0aa4c4.gif",
    sound: "https://cdn.pixabay.com/audio/2024/07/30/audio_c9a02641ca.mp3",
  },
  {
    name: "cow",
    price: 40,
    count: 0,
    feedingKg: 4,
    value: 10,
    img: "https://i.gifer.com/Za9e.gif",
    sound: "https://cdn.pixabay.com/audio/2024/07/10/audio_5a876052c2.mp3",
  },
];
// LOCAL STRORAGE
if (JSON.parse(localStorage.getItem("animalsArr"))) {
  animalsArr = JSON.parse(localStorage.getItem("animalsArr"));
  animalsArr.forEach((animal) => {
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
      default:
        break;
    }
    for (let i = 0; i < animal.count; i++) {
      let image = document.createElement("img");
      mainContainer.appendChild(image);
      image.src = animal.img;
      image.classList.add("animalImg");
      image.style.top = `${70 + Math.floor(Math.random() * 20)}%`;
      image.style.left = `${Math.floor(Math.random() * 95)}%`;
    }
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
  expenseFeedingCointValue = +localStorage.getItem("expenseFeedingCointValue");
  expenseFeedingCoint.innerHTML = expenseFeedingCointValue;
}

// MODALLARIN ACILMASI
buyAnimalBtn.addEventListener("click", function () {
  buyAnimalModal.style.opacity = "1";
  buyAnimalModal.style.visibility = "visible";
  clickAudio.play();
});
buyFoodBtn.addEventListener("click", function () {
  buyFeedingModal.style.opacity = "1";
  buyFeedingModal.style.visibility = "visible";
  clickAudio.play();
});
closeAnimalModalBtn.addEventListener("click", function () {
  buyAnimalModal.style.opacity = "0";
  buyAnimalModal.style.visibility = "hidden";
  clickAudio.play();
});
closeFeedingModal.addEventListener("click", function name(params) {
  buyFeedingModal.style.opacity = "0";
  buyFeedingModal.style.visibility = "hidden";
  clickAudio.play();
});

usingInterval();
//  ANIMAL ALMAQ
buyTheAnimal.forEach((btn) => {
  btn.addEventListener("click", function () {
    animalsArr.forEach((animal) => {
      if (btn.id == animal.name) {
        if (animal.price <= coinCountValue) {
          clickAudio.play();
          coinCountValue = coinCountValue - animal.price;
          animal.count++;
          coinCount.innerHTML = coinCountValue;
          let animalSound = new Audio(animal.sound);
          animalSound.play();
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
            default:
              break;
          }
          let image = document.createElement("img");
          mainContainer.appendChild(image);
          image.src = animal.img;
          image.classList.add("animalImg");
          image.style.top = `${70 + Math.floor(Math.random() * 20)}%`;
          image.style.left = `${Math.floor(Math.random() * 95)}%`;
          earningCoinCointValue = 0;
          expenseFeedingCointValue = 0;
        }
      }
    });

    animalsArr.forEach((animal) => {
      earningCoinCointValue += +animal.value * +animal.count;
      expenseFeedingCointValue += +animal.feedingKg * +animal.count;
      earningCoinCoint.textContent = earningCoinCointValue;
      expenseFeedingCoint.innerHTML = expenseFeedingCointValue;
      updateLocalStorage();
    });

    updateLocalStorage();
  });
});

// YEMEK ALMAQ
buyFeedings.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log(btn.id);

    switch (+btn.id) {
      case 50:
        console.log("50e dusdu");

        if (10 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 50;
          coinCountValue -= 10;
        }
        break;
      case 100:
        console.log("100e dusdu");
        if (18 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 100;
          coinCountValue -= 18;
        }
        break;
      case 500:
        console.log("500e dusdu");
        if (80 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 500;
          coinCountValue -= 80;
        }

        break;

      default:
        console.log("defaulta dusdu");
        break;
    }
    coinCount.innerHTML = coinCountValue;
    feedingCount.innerHTML = feedingCountValue;
    if (feedingCountValue > 0) {
      usingInterval();
    }
  });
});

// LOCAL STRORAGE UPDATESI
function updateLocalStorage() {
  localStorage.setItem("animalsArr", JSON.stringify(animalsArr));
  localStorage.setItem("coinCount", coinCountValue);
  localStorage.setItem("feedingCount", feedingCountValue);
  localStorage.setItem("earningCoinCointValue", earningCoinCointValue);
  localStorage.setItem("expenseFeedingCointValue", expenseFeedingCointValue);
}

// INTERVALIN ISTIFADESI
function usingInterval() {
  myInterval = setInterval(() => {
    animalsArr.forEach((animal) => {
      coinCountValue += +animal.value * +animal.count;
      feedingCountValue -= +animal.feedingKg * +animal.count;
    });
    console.log(earningCoinCointValue);

    if (feedingCountValue < 0) {
      clearInterval(myInterval);
    } else {
      coinCount.innerHTML = coinCountValue;
      feedingCount.innerHTML = feedingCountValue;

      updateLocalStorage();
    }
  }, 1000);
  updateLocalStorage();
}
