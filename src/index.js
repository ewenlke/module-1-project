let log = [];
let foodArr = [];
let breakfast = ["Roti Prata", "Nasi Lemak", "Porridge", "Tao Huey & You Tiao", "Carrot Cake", "Fried Bee Hoon"];
let lunch = ["Chicken Rice", "Laksa", "Char Kuay Teow", "Hokkien Prawn Mee", "Mee Goreng"];
let dinner = ["Chilli Crab", "BBQ Stingray", "Curry Fish Head", "Satay", "Bak Kut Teh"];
let foodBox = document.getElementById("foodListBox");
let foodInput = document.getElementById("foodInput");
let submitBtn = document.getElementById("submitBtn");
let clearBtn = document.getElementById("clearBtn");
let randomBtn = document.getElementById("randomBtn");
let logFoodList = document.querySelector("#logFood");
let logTimeList = document.querySelector("#logTime");
let logDeleteList = document.querySelector("#logDelete");
let breakfastBtn = document.getElementById("breakfast");
let lunchBtn = document.getElementById("lunch");
let dinnerBtn = document.getElementById("dinner");
let rptDate = document.getElementById("dayInput");

/* Submit food button eventlistener <-------- */
submitBtn.addEventListener("click", function (evt) {
  let sep = foodInput.value.split(/\s*,\s*/);
  let specChar = /^[a-zA-Z0-9, ]*$/;
  for (let i = 0; i < sep.length; i++) {
    if (sep[0] == "") {
      alert("Cannot put empty field");
      pvtDefault();
      break;
    } else if (!specChar.test(sep)) {
      alert("Do not include special characters except comma.");
      pvtDefault();
      break;
    } else {
      foodArr.push(sep[i]);
      addList();
    }
  }
  foodInput.value = "";
  console.log(foodArr);
});

function addList() {
  let list = foodArr.map((food) => `${food}`).join();
  foodBox.value = list;
}

function pvtDefault(evt) {
  document.getElementById("foodName").addEventListener("submit", evt.preventDefault(), true);
}
/* --------> */

/* Clear button eventlistener <-------- */
clearBtn.addEventListener("click", function () {
  clearList();
  console.log(foodArr);
});

function clearList() {
  foodArr = [];
  foodBox.value = foodArr;
}
clearList();
/* --------> */

/* Randomize button eventlistener <--------*/
randomBtn.addEventListener("click", function () {
  log.push({
    logFood: randomize(foodArr),
    logTime: new Date().toLocaleString(),
  });
  console.log(JSON.stringify(log));
  load();
});

function randomize(array) {
  /*throw error if "repeat food" input is not number*/
  let sep = rptDate.value;
  let specChar = /^(\s*|\d+)$/;
  for (let i = 0; i < sep.length; i++) {
    if (!specChar.test(sep)) {
      rptDate.value = "";
      throw alert("Insert only numbers or leave it empty.");
    }
  }

  /*convert "repeat food" input to date format & filter log to exclude them*/
  let revDate = new Date(Math.abs(new Date() - rptDate.value * 1000)).toLocaleString(); //1 day = 86400000 milliseconds
  let rev = log.filter((d) => {
    return d.logTime >= revDate;
  });
  // console.log(rev);

  /*convert filtered "timed" log to array format*/
  let revList = rev.reduce((a, { logFood }) => {
    if (logFood) a.push(logFood);
    return a;
  }, []);
  // console.log(revList);

  /*filter user-keyed food list box to exclude filtered "timed" log & randomize results*/
  let newArr = array.filter((food) => !revList.includes(food));
  console.log(newArr);
  let result = newArr[Math.floor(Math.random() * newArr.length)];
  if (result == undefined) {
    throw alert("No more food in the list to pick! Please enter more dishes to continue.");
  }
  console.log(result);
  document.getElementById("randomText").innerHTML = result;
  return result;
}
/* --------> */

/* Print randomized log onto html <--------*/
function load() {
  logFoodList.innerHTML = "";
  logTimeList.innerHTML = "";
  logDeleteList.innerHTML = "";
  for (let item of log) {
    logFoodList.innerHTML += `<li> <a onclick="location.href='https://www.google.com/search?q=${item.logFood}'">${item.logFood}</li>`;
    logTimeList.innerHTML += "<li>" + item.logTime + "</li>";
    logDeleteList.innerHTML += `<li> <button onclick="deleteFood('${item.logTime}')">Delete</button> </li>`;
  }
}
/* --------> */

/* Delete button <--------*/
function deleteFood(time) {
  let index = log.findIndex((food) => food.logTime == time);
  log.splice(index, 1);
  load();
}
/* --------> */

/* Randomize breakfast, lunch & dinner button eventlistener <--------*/
breakfastBtn.addEventListener("click", function () {
  log.push({
    logFood: randomize(breakfast),
    logTime: new Date().toLocaleString(),
  });
  console.log(JSON.stringify(log));
  load();
});

lunchBtn.addEventListener("click", function () {
  log.push({
    logFood: randomize(lunch),
    logTime: new Date().toLocaleString(),
  });
  console.log(JSON.stringify(log));
  load();
});

dinnerBtn.addEventListener("click", function () {
  log.push({
    logFood: randomize(dinner),
    logTime: new Date().toLocaleString(),
  });
  console.log(JSON.stringify(log));
  load();
});
/* --------> */
