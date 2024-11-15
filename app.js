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

let animalsArr = [
  {
    name: "sheep",
    price: 20,
    count: 1,
    value: 5,
    feedingKg: 3,
    img: "https://cdn-icons-png.flaticon.com/128/2931/2931515.png",
  },
  {
    name: "chicken",
    price: 10,
    count: 0,
    value: 2,
    feedingKg: 1,
    img: "https://cdn-icons-png.flaticon.com/128/1886/1886890.png",
  },
  {
    name: "cow",
    price: 40,
    count: 0,
    feedingKg: 4,
    value: 10,
    img: "https://cdn-icons-png.flaticon.com/128/2395/2395796.png",
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
});
buyFoodBtn.addEventListener("click", function () {
  buyFeedingModal.style.opacity = "1";
  buyFeedingModal.style.visibility = "visible";
});
closeAnimalModalBtn.addEventListener("click", function () {
  buyAnimalModal.style.opacity = "0";
  buyAnimalModal.style.visibility = "hidden";
});
closeFeedingModal.addEventListener("click", function name(params) {
  buyFeedingModal.style.opacity = "0";
  buyFeedingModal.style.visibility = "hidden";
});

usingInterval();
//  ANIMAL ALMAQ
buyTheAnimal.forEach((btn) => {
  btn.addEventListener("click", function () {
    animalsArr.forEach((animal) => {
      if (btn.id == animal.name) {
        if (animal.price <= coinCountValue) {
          coinCountValue = coinCountValue - animal.price;
          animal.count++;
          coinCount.innerHTML = coinCountValue;

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
          feedingCountValue += 50;
          coinCountValue -= 10;
        }
        break;
      case 100:
        console.log("100e dusdu");
        if (18 <= coinCountValue) {
          feedingCountValue += 100;
          coinCountValue -= 18;
        }
        break;
      case 500:
        console.log("500e dusdu");
        if (80 <= coinCountValue) {
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