let arrayString = document.getElementById("array");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn3");
const btn2 = document.getElementById("btn2");
const btns = document.getElementById("btns");
const bars = document.getElementById("bars");
const delay = 1200;
let array = [];

function RandomArray() {
    for (let i = 0; i < 10; i++) {
        //console.log(parseInt(Math.random()*100));
        array[i] = parseInt(Math.random() * 100);
    }
    document.getElementById("sort").style.display = "inline-block";
    document.getElementById("insertSort").style.display = "inline-block";
    document.getElementById("bsort").style.display = "inline-block";
    document.getElementById("Obsort").style.display = "inline-block";
    document.getElementById("MergeSort").style.display = "inline-block";
    document.getElementById("Quicksort").style.display = "inline-block";
    makeArray();
}

function CreateArray() {
    console.log(arrayString.value.split(","));
    array = arrayString.value.split(",");
    makeArray();
    document.getElementById("sort").style.display = "inline-block";
    document.getElementById("insertSort").style.display = "inline-block";
    document.getElementById("bsort").style.display = "inline-block";
    document.getElementById("Obsort").style.display = "inline-block";
    document.getElementById("MergeSort").style.display = "inline-block";
    document.getElementById("Quicksort").style.display = "inline-block";
}

function SwitchView() {
    const wrapper = document.getElementById('wrapper');
    const currentView = document.getElementById('current-view');

    wrapper.classList.toggle('view-up');
    (currentView.innerHTML === "up") ? currentView.innerHTML = "down" : currentView.innerHTML = "up";
}

function makeArray() {
    bars.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        //console.log(array[i]);
        const bar = document.createElement("div");
        bar.style.height = "" + Math.abs(array[i]) * 3 + "px";
        bar.className = "bar";
        bar.id = "bar" + (i + 1);
        const textnode = document.createTextNode("" + array[i]);
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
    for (let i = 0; i < array.length; i++) {
        let min = i;
        const bar_min = document.getElementById("bar" + (i + 1));
        bar_min.style.background = "#f44336";
        for (let j = i + 1; j < array.length; j++) {
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
        const temp = array[min];
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

async function InsertionSort() {
    //assume first item is 'sorted'
    for (let i = 0; i < array.length; i++) {
        const tmp = array[i]; //Copy current element
        const bar_tmp = document.getElementById("bar" + (i + 1));
        bar_tmp.style.background = "#64dd17";
        for (var j = i - 1; j >= 0 && (array[j] > tmp); j--) {
            array[j + 1] = array[j]; // Shift number
            document.getElementById("bar" + (j + 1)).style.background = "#f44336";
        }
        // insert copied # at correct place at sorted section
        array[j + 1] = tmp;
        await sleep(500);
    }
    makeArray();
}

async function BubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            document.getElementById("bar" + (j + 1)).style.background = "#64dd17";
            document.getElementById("bar" + (j + 2)).style.background = "#64dd17";
            await sleep(600);
            if (parseInt(array[j], 10) > parseInt(array[j + 1], 10)) {
                document.getElementById("bar" + (j + 1)).style.background = "#f44336";
                document.getElementById("bar" + (j + 2)).style.background = "#f44336";
                const temp = array[j];
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
    for (let i = 0; i < array.length; i++) {
        let swap = false;
        for (let j = 0; j < array.length - i - 1; j++) {
            document.getElementById("bar" + (j + 1)).style.background = "#64dd17";
            document.getElementById("bar" + (j + 2)).style.background = "#64dd17";
            await sleep(500);
            if (parseInt(array[j], 10) > parseInt(array[j + 1], 10)) {
                swap = true;
                document.getElementById("bar" + (j + 1)).style.background = "#f44336";
                document.getElementById("bar" + (j + 2)).style.background = "#f44336";
                const temp = array[j];
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
    const temp = document.createElement("div");
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

    const len = list.length;

    // an array of length == 1 is technically a sorted list
    if (len === 1) {
        return list
    }

    // get mid item
    const middleIndex = Math.ceil(len / 2);

    // split current list into two: left and right list
    let leftList = list.slice(0, middleIndex);
    let rightList = list.slice(middleIndex, len);

    for (let i = 0; i < leftList.length; i++) {
        document.getElementById("bar" + (i + 1)).style.background = "#64dd17";
        await sleep(500);
    }

    for (let i = 0; i < rightList.length; i++) {
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

    for (let i = 0; i < sorted.length; i++) {
        array[i] = sorted[i];
    }

    makeArray();

    // merge the left and right list
    return sorted;
}


async function swap(items, leftIndex, rightIndex) {
    await sleep(delay);
    document.getElementById("bar" + (leftIndex + 1)).style.background = "#f44336";
    document.getElementById("bar" + (rightIndex + 1)).style.background = "#f44336";
    await sleep(delay);
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    makeArray();

    document.getElementById("bar" + (leftIndex + 1)).style.background = "#64dd17";
    document.getElementById("bar" + (rightIndex + 1)).style.background = "#64dd17";
    await sleep(delay);
}

async function partition(items, left, right) {
    let center = Math.floor((right + left) / 2);
    let pivot = items[center], //middle element
        i = left, //left pointer
        j = right; //right pointer

    console.log('center:', center);
    console.log('pivot:', pivot);
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            document.getElementById("bar" + (center + 1)).style.background = "#f1f400";
            await swap(items, i, j); //swapping two elements
            makeArray();
            i++;
            j--;
        }
    }
    return i;
}

async function Quicksort(items = null, left = null, right = null) {
    console.log('Calling Quicksort');
    items = (!items) ? array : items;
    if (!items.length) {
        console.log("array has no length");
        return;
    }

    if (items.length <= 1) {
        return items;
    }

    left = (left) ? left : 0;
    right = (right) ? right : items.length - 1;
    console.log('left:', left);
    console.log('right:', right);
    partition(items, left, right).then(async (index) => {
        console.log('index:', index);
        if (left < index - 1) { //more elements on the left side of the pivot
            await Quicksort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await Quicksort(items, index, right);
        }
    }); //index returned from partition

    return items;
}
