var arrayString = document.getElementById("array");
var btn = document.getElementById("btn");
var btn1 = document.getElementById("btn3");
var btn2 = document.getElementById("btn2");
var btns = document.getElementById("btns");
var bars = document.getElementById("bars");
var array = [];

function RandomArray() {
  for (var i = 0; i < 10; i++) {
    //console.log(parseInt(Math.random()*100));
    array[i] = parseInt(Math.random() * 100);
  }
  document.getElementById("sort").style.display = "inline-block";
  document.getElementById("bsort").style.display = "inline-block";
  document.getElementById("Obsort").style.display = "inline-block";
  document.getElementById("MergeSort").style.display = "inline-block";
  makeArray();
}

function CreateArray() {
  console.log(arrayString.value.split(","));
  array = arrayString.value.split(",");
  makeArray();
  document.getElementById("sort").style.display = "inline-block";
  document.getElementById("bsort").style.display = "inline-block";
  document.getElementById("Obsort").style.display = "inline-block";
  document.getElementById("MergeSort").style.display = "inline-block";
}

function SwitchView() {
  var wrapper = document.getElementById('wrapper');
  var currentView = document.getElementById('current-view');

  wrapper.classList.toggle('view-up');
  (currentView.innerHTML === "up") ? currentView.innerHTML = "down" : currentView.innerHTML = "up";
}

function makeArray() {
  bars.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    //console.log(array[i]);
    var bar = document.createElement("div");
    bar.style.height = "" + Math.abs(array[i]) * 3 + "px";
    bar.className = "bar";
    bar.id = "bar" + (i + 1);
    var textnode = document.createTextNode("" + array[i]);
    if (Math.abs(array[i]) < 5) {
      bar.style.color = "black";
    }
    bar.appendChild(textnode);
    bars.appendChild(bar);
  }
  btn.style.display = "none";
  btn2.style.display = "none";

  arrayString.style.display = "none";

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function SelectionSort() {
  for (var i = 0; i < array.length; i++) {
    var min = i;
    var bar_min = document.getElementById("bar" + (i + 1));
    bar_min.style.background = "#f44336";
    for (var j = i + 1; j < array.length; j++) {
      document.getElementById("bar" + (j + 1)).style.background = "#64dd17";
      console.log(array[j] + " " + array[min]);
      console.log(array[j] < array[min]);

      if (parseInt(array[j], 10) < parseInt(array[min], 10)) {
        document.getElementById("bar" + (i + 1)).style.background = "#64dd17";
        document.getElementById("bar" + (min + 1)).style.background = "#64dd17";
        document.getElementById("bar" + (j + 1)).style.background = "#f44336";
        min = j;

      }
      console.log(min);
      await sleep(1000);

    }
    var temp = array[min];
    array[min] = array[i];
    array[i] = temp;
    /*for(var m=0; m<array.length; m++)
    {
        document.getElementById("bar"+(m+1)).style.background="#2979ff";
    }*/
    makeArray();
    //swapElements(document.getElementById("bar"+(i+1)),document.getElementById("bar"+(min+1)))
  }
}

async function BubbleSort() {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      document.getElementById("bar" + (j + 1)).style.background = "#64dd17";
      document.getElementById("bar" + (j + 2)).style.background = "#64dd17";
      await sleep(600);
      if (parseInt(array[j], 10) > parseInt(array[j + 1], 10)) {
        document.getElementById("bar" + (j + 1)).style.background = "#f44336";
        document.getElementById("bar" + (j + 2)).style.background = "#f44336";
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        await sleep(500);

      }
      makeArray();

    }
    makeArray();
  }
}

async function OBubbleSort() {
  for (var i = 0; i < array.length; i++) {
    var swap = false;
    for (var j = 0; j < array.length - i - 1; j++) {
      document.getElementById("bar" + (j + 1)).style.background = "#64dd17";
      document.getElementById("bar" + (j + 2)).style.background = "#64dd17";
      await sleep(500);
      if (parseInt(array[j], 10) > parseInt(array[j + 1], 10)) {
        swap = true;
        document.getElementById("bar" + (j + 1)).style.background = "#f44336";
        document.getElementById("bar" + (j + 2)).style.background = "#f44336";
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        await sleep(400);

      }
      if (swap) {
        makeArray();
      }
    }
    makeArray();
  }
}

function swapElements(obj1, obj2) {
  // create marker element and insert it where obj1 is
  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);
  // move obj1 to right before obj2
  obj2.parentNode.insertBefore(obj1, obj2);
  // move obj2 to right before where obj1 used to be
  temp.parentNode.insertBefore(obj2, temp);
  // remove temporary marker node
  temp.parentNode.removeChild(temp);
}

async function mergeSortFunction() {
  array = await mergeSort(array);
  makeArray();
}

async function mergeSort(list) {

  makeArray();

  var len = list.length;

  // an array of length == 1 is technically a sorted list
  if (len === 1) {
    return list
  }

  // get mid item
  var middleIndex = Math.ceil(len / 2);

  // split current list into two: left and right list
  var leftList = list.slice(0, middleIndex);
  var rightList = list.slice(middleIndex, len);

  for (var i = 0; i < leftList.length; i++) {
    document.getElementById("bar" + (i + 1)).style.background = "#64dd17";
    await sleep(500);
  }

  for (var i = 0; i < rightList.length; i++) {
    document.getElementById("bar" + (list.length - i)).style.background = "#f44336";
    await sleep(500);
  }

  console.log(leftList);
  console.log(rightList);

  leftList = await mergeSort(leftList);
  rightList = await mergeSort(rightList);
  return merge(leftList, rightList);

}

// Solve the sub-problems and merge them together
function merge(leftList, rightList) {

  const sorted = [];

  while (leftList.length > 0 && rightList.length > 0) {
    const leftItem = leftList[0];
    const rightItem = rightList[0];
    if (leftItem > rightItem) {
      sorted.push(rightItem);
      rightList.shift()
    } else {
      sorted.push(leftItem);
      leftList.shift()
    }
  }

  // if left list has items, add what is left to the results
  while (leftList.length !== 0) {
    sorted.push(leftList[0]);
    leftList.shift()
  }

  // if right list has items, add what is left to the results
  while (rightList.length !== 0) {
    sorted.push(rightList[0]);
    rightList.shift()
  }

  for (var i = 0; i < sorted.length; i++) {
    array[i] = sorted[i];
  }

  makeArray();

  // merge the left and right list
  return sorted;
}