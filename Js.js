const btn = document.querySelector(".btn");
const buttons = document.querySelector(".buttons");
const mainField = document.querySelector(".mainField");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const output2 = document.querySelector(".output2");
const sixButton = document.querySelector(".sixButton");
const addDice = document.querySelector(".addDice");
const historyDice = document.querySelector(".historyDice");

let three = 0;
let six = 0;
let throws = 1;

let history = [];

btn.addEventListener("click", throwManyDice);

function CreateDice() {
  const result = Math.floor(Math.random() * 6 + 1);
  const element = document.createElement("img");
  element.className = "image_item";
  element.src = `./img/img${result}.jpg`;
  if (result >= 3) {
    three++;
  }
  if (result === 6) {
    six++;
  }
  return { element, result };
}

function throwManyDice() {
  three = 0;
  six = 0;
  addDice.innerHTML = "";
  sixButton.innerHTML = "";
  mainField.innerHTML = "";
  let count = input.value;
  if (count < Number(input.min)) {
    count = Number(input.min);
  }
  if (count > Number(input.max)) {
    count = Number(input.max);
  }
  let objValues = {
    id: Math.random().toString().substring(2, 9),
    dices: [],
    extraDices: [],
    hits: null,
    reThrows: null,
    wasRethrow: false,
  };

  for (let index = 0; index < count; index++) {
    const dice = CreateDice();
    mainField.appendChild(dice.element);
    objValues.dices.push(dice.result);
  }

  if (six) {
    const element2 = document.createElement("button");
    element2.className = "button__element";
    element2.textContent = "Переброс 6-ки";
    sixButton.appendChild(element2);
    element2.addEventListener("click", throwExtraDice);
  }

  output.innerHTML = "Число попаданий:" + three;
  output2.innerHTML = "Число дополнительных бросков:" + six;
  objValues.hits = three;
  objValues.reThrows = six;
  history.push(objValues);

  const newElement3 = document.createElement("div");
  newElement3.className = "addHistory";
  newElement3.id = "throw" + throws;
  historyDice.appendChild(newElement3);
  const element4 = CreateHistoryBlock(throws);
  newElement3.appendChild(element4);
  newElement3.onclick = () => render(objValues);

  throws += 1;
}

function throwExtraDice() {
  let reThrow = six;
  for (let index = 0; index < reThrow; index++) {
    const dice = CreateDice();
    addDice.appendChild(dice.element);
    history[history.length - 1].extraDices.push(dice.result);
  }
  history[history.length - 1].wasRethrow = true;
  history[history.length - 1].hits = three;

  const element5 = document.getElementById("throw" + (throws - 1));
  element5.innerHTML = "";

  const element6 = CreateHistoryBlock(throws - 1);

  element5.appendChild(element6);

  output.innerHTML = "Число попаданий:" + three;
  sixButton.innerHTML = "";
}

function CreateHistoryBlock(throws) {
  const element6 = document.createElement("output");
  element6.className = "History__block";

  element6.innerHTML = `
  Бросок: ${throws}<br>
  Попадания: ${history[history.length - 1].hits}<br>
  Переброс: ${history[history.length - 1].reThrows}<br>
  Был переброс?: ${history[history.length - 1].wasRethrow ? "Был" : "Не был"}
  `;

  return element6;
}

function render(objValues) {
  addDice.innerHTML = "";
  mainField.innerHTML = "";
  sixButton.innerHTML = "";
  if (objValues.id !== history[history.length - 1].id) {
    sixButton.innerHTML = "";
  } else {
    if (six && !history[history.length - 1].wasRethrow) {
      const element2 = document.createElement("button");
      element2.className = "button__element";
      element2.textContent = "Переброс 6-ки";
      sixButton.appendChild(element2);
      element2.addEventListener("click", throwExtraDice);
    }
  }

  objValues.dices.forEach((item) => {
    const element = document.createElement("img");
    element.className = "image_item";
    element.src = `./img/img${item}.jpg`;
    mainField.appendChild(element);
  });

  objValues.extraDices.forEach((item) => {
    const element = document.createElement("img");
    element.className = "image_item";
    element.src = `./img/img${item}.jpg`;
    addDice.appendChild(element);
  });

  output.innerHTML = "Число попаданий:" + objValues.hits;
  output2.innerHTML = "Число дополнительных бросков:" + objValues.reThrows;
}

console.log(Math.random().toString().substring(2, 9));

// function throwDice() {
//   container.innerHTML = "";
//   const result = Math.floor(Math.random() * 6 + 1);
//   const element = document.createElement("img");
//   element.className = "image_item";
//   element.src = `./img/img${result}.jpg`;
//   container.appendChild(element);
//   console.log(result);
// }

// function throwDice() {
//   container.innerHTML = "";
//   const element = CreateDice();
//   element.className = "image_item";
//   element.src = `./img/img${result}.jpg`;
//   container.appendChild(element);
//   console.log(result);
// }
