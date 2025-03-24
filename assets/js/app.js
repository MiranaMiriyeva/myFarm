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

// Function to get random position in bottom 60% of screen
function getRandomPosition() {
  // 40% to 95% for top position (avoid top 40%)
  const top = 40 + Math.random() * 55;
  // 5% to 95% for left position
  const left = 5 + Math.random() * 90;
  return { top, left };
}

// LOCAL STORAGE
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

    // Create animals with their saved positions
    animal.positions.forEach((pos) => {
      // Ensure saved positions are in bottom 60%
      const safeTop = Math.max(40, pos.top);
      createAnimalImage(animal.img, pos.left, safeTop);
    });
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

// Function to create animal image with drag functionality
function createAnimalImage(imgSrc, left = null, top = null) {
  let image = document.createElement("img");
  mainContainer.appendChild(image);
  image.src = imgSrc;
  image.classList.add("animalImg");

  // Set position (use random position in bottom 60% if not provided)
  const position = left && top ? { left, top } : getRandomPosition();
  image.style.left = `${position.left}%`;
  image.style.top = `${position.top}%`;

  // Make draggable
  image.draggable = true;
  image.style.cursor = "grab";
  image.style.position = "absolute";
  image.style.width = "80px";
  image.style.height = "auto";
  image.style.zIndex = "1";

  // Drag start event
  image.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", "");
    this.style.cursor = "grabbing";
    this.style.zIndex = 1000;

    // Store initial position
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.initialLeft = parseInt(this.style.left);
    this.initialTop = parseInt(this.style.top);
  });

  // Drag end event
  image.addEventListener("dragend", function (e) {
    this.style.cursor = "grab";
    this.style.zIndex = "1";

    // Calculate new position
    let deltaX = e.clientX - this.startX;
    let deltaY = e.clientY - this.startY;

    let newLeft = this.initialLeft + (deltaX / window.innerWidth) * 100;
    let newTop = this.initialTop + (deltaY / window.innerHeight) * 100;

    // Boundary checking (keep within container and bottom 60%)
    newLeft = Math.max(0, Math.min(95, newLeft));
    newTop = Math.max(40, Math.min(95, newTop)); // Minimum 40% from top

    this.style.left = `${newLeft}%`;
    this.style.top = `${newTop}%`;

    // Update position in animalsArr
    updateAnimalPosition(this.src, newLeft, newTop);
    updateLocalStorage();
  });

  return image;
}

// Update animal position in animalsArr
function updateAnimalPosition(imgSrc, left, top) {
  animalsArr.forEach((animal) => {
    if (imgSrc.includes(animal.name)) {
      const index = Array.from(
        document.querySelectorAll(".animalImg")
      ).findIndex((img) => img.src === imgSrc);

      if (index !== -1) {
        animal.positions[index] = { left, top };
      }
    }
  });
}

// MODAL OPENING
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
buyDecorationBtn.addEventListener("click", function () {
  buyDecorationModal.style.opacity = "1";
  buyDecorationModal.style.visibility = "visible";
  clickAudio.play();
});
closeAnimalModalBtn.addEventListener("click", function () {
  buyAnimalModal.style.opacity = "0";
  buyAnimalModal.style.visibility = "hidden";
  clickAudio.play();
});
closeFeedingModal.addEventListener("click", function () {
  buyFeedingModal.style.opacity = "0";
  buyFeedingModal.style.visibility = "hidden";
  clickAudio.play();
});
closeDecorationModalBtn.addEventListener("click", function () {
  buyDecorationModal.style.opacity = "0";
  buyDecorationModal.style.visibility = "hidden";
  clickAudio.play();
});
usingInterval();

// BUY ANIMALS
buyTheAnimal.forEach((btn) => {
  btn.addEventListener("click", function () {
    animalsArr.forEach((animal) => {
      if (btn.id == animal.name) {
        if (animal.price <= coinCountValue) {
          clickAudio.play();
          coinCountValue = coinCountValue - animal.price;
          animal.count++;

          // Get position in bottom 60% of screen
          const position = getRandomPosition();
          animal.positions.push({ left: position.left, top: position.top });

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

          // Create the new animal with drag functionality
          createAnimalImage(animal.img, position.left, position.top);

          earningCoinCointValue = 0;
          expenseFeedingCointValue = 0;
        } else {
          alert("Not enough coins!");
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

// BUY FOOD
buyFeedings.forEach((btn) => {
  btn.addEventListener("click", function () {
    switch (+btn.id) {
      case 50:
        if (10 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 50;
          coinCountValue -= 10;
        } else {
          alert("Not enough coins!");
        }
        break;
      case 100:
        if (18 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 100;
          coinCountValue -= 18;
        } else {
          alert("Not enough coins!");
        }
        break;
      case 500:
        if (80 <= coinCountValue) {
          clickAudio.play();
          feedingCountValue += 500;
          coinCountValue -= 80;
        } else {
          alert("Not enough coins!");
        }
        break;
      default:
        break;
    }
    coinCount.innerHTML = coinCountValue;
    feedingCount.innerHTML = feedingCountValue;
    if (feedingCountValue > 0) {
      clearInterval(myInterval);
      usingInterval();
    }
    updateLocalStorage();
  });
});

// BUY DECORATIONS
let buyDecorations = document.querySelectorAll(".buyDecorations");
let decorationImages = [
  "./assets/imgs/dec1.jpeg",
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

buyDecorations.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    let price = parseInt(btn.previousElementSibling.textContent);

    if (price <= coinCountValue) {
      clickAudio.play();
      coinCountValue -= price;
      coinCount.innerHTML = coinCountValue;

      let decoration = document.createElement("img");
      decoration.src = decorationImages[index];
      decoration.classList.add("decoration");
      decoration.draggable = true;

      // Position in bottom 60% of screen
      const position = getRandomPosition();
      decoration.style.position = "absolute";
      decoration.style.top = `${position.top}%`;
      decoration.style.left = `${position.left}%`;
      decoration.style.width = "100px";
      decoration.style.height = "auto";
      decoration.style.zIndex = "1";

      decoration.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", "");
        this.style.cursor = "grabbing";
        this.style.zIndex = 1000;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialLeft = parseInt(this.style.left);
        this.initialTop = parseInt(this.style.top);
      });

      decoration.addEventListener("dragend", function (e) {
        this.style.cursor = "grab";
        this.style.zIndex = "1";
        let deltaX = e.clientX - this.startX;
        let deltaY = e.clientY - this.startY;
        let newLeft = this.initialLeft + (deltaX / window.innerWidth) * 100;
        let newTop = this.initialTop + (deltaY / window.innerHeight) * 100;
        newLeft = Math.max(0, Math.min(90, newLeft));
        newTop = Math.max(40, Math.min(90, newTop)); // Minimum 40% from top
        this.style.left = `${newLeft}%`;
        this.style.top = `${newTop}%`;
      });

      mainContainer.appendChild(decoration);
      updateLocalStorage();
    } else {
      alert("Not enough coins!");
    }
  });
});

// UPDATE LOCAL STORAGE
function updateLocalStorage() {
  localStorage.setItem("animalsArr", JSON.stringify(animalsArr));
  localStorage.setItem("coinCount", coinCountValue);
  localStorage.setItem("feedingCount", feedingCountValue);
  localStorage.setItem("earningCoinCointValue", earningCoinCointValue);
  localStorage.setItem("expenseFeedingCointValue", expenseFeedingCointValue);
}

// USE INTERVAL
function usingInterval() {
  myInterval = setInterval(() => {
    animalsArr.forEach((animal) => {
      coinCountValue += +animal.value * +animal.count;
      feedingCountValue -= +animal.feedingKg * +animal.count;
    });

    if (feedingCountValue < 0) {
      clearInterval(myInterval);
    } else {
      coinCount.innerHTML = coinCountValue;
      feedingCount.innerHTML = feedingCountValue;
      updateLocalStorage();
    }
  }, 5000);
  updateLocalStorage();
}
