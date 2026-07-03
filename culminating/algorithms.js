//initializing variables
let targetStressA = 0;
let targetStressB = 0;
let statsA = { name: "_", steps: 0, time: 0, complexity: "_" };
let statsB = { name: "_", steps: 0, time: 0, complexity: "_" };
let sortStartTime = 0;
let totalSortSteps = 0;
let isSorting = false;
let bubbleDone = false;
let insertionDone = false;
let searchStressTimer = 0;
let sortedCount = 0;
let insertionIdx = 1;
let totalInsertionSteps = 0;

/**
 * Performs a linear search on the main data set given the target date
 * @param {arr} list The array to search through
 * @param {str} Target date
 * @return {int} steps Number of steps taken to finish search
 */
function linearSearch(list, target) {
  steps = 0;
  for (let i = 0; i < list.length - sortedCount; i++) {
    steps++;
    if (list[i][0] === target) {
      break;
    }
  }
  targetStressA = map(steps, 0, list.length, 0, 100);
  return steps;
}

/**
 * Performs binary search on the main data set given the target date
 * @param {arr} list The array to search through
 * @param {str} target Target date
 * @param {arr} left Current left side of the search window
 * @param {arr}  right Current right side of the search window
 * @param {int} global steps counter
 * @return {int} steps Number of steps taken to complete search
 */
function binarySearch(list, target, left, right, steps) {
  if (left > right) {
    targetStressB = map(steps, 0, 15, 0, 100);
    return steps;
  }
  let middle = floor((left + right) / 2);
  steps++;
  if (list[middle][0] === target) {
    targetStressB = map(steps, 0, 15, 0, 100);
    return steps;
  }
  return list[middle][0] > target
    ? binarySearch(list, target, left, middle - 1, steps)
    : binarySearch(list, target, middle + 1, right, steps);
}

/**
 * Performs bubble sort on the data set by price
 * @param {arr} list Array to sort
 * @return {obj} bool describing if the sort is complete, int number of steps taken to complet sort
 */
function bubbleSort(list) {
  sortedCount = 0;
  let swapped = false;
  let steps = 0;
  for (let i = 0; i < list.length - 1; i++) {
    steps++;
    let priceA = float(list[i][1]);
    let priceB = float(list[i + 1][1]);
    if (priceA > priceB) {
      let temp = list[i];
      list[i] = list[i + 1];
      list[i + 1] = temp;
      swapped = true;
      steps++;
    }
  }

  if (swapped) {
    targetStressA = 100;
    sortedCount++;
  } else {
    targetStressA = 0;
  }
  return {
    sortedList: swapped,
    totalLoops: steps,
  };
}

/**
 * Performs insertion sort on the data set by price
 * @param {arr} list Array to sort
 * @return {obj} bool describing if the sort is complete, int number of steps taken to complet sort
 */
function insertionSort(list) {
  let steps = 0;

  if (insertionIdx < list.length) {
    let current = list[insertionIdx];
    let currentVal = float(current[1]);
    let j = insertionIdx - 1;

    while (j >= 0 && float(list[j][1]) > currentVal) {
      steps++;
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = current;
    insertionIdx++;
    return {
      isDone: false,
      totalLoops: steps,
    };
  }
  return {
    isDone: true,
    totalLoops: steps,
  };
}

/**
 * Performs the search comparison, changing stats and stress amounts for gauges
 * @param {arr} list Array
 * @param {str} target Target date
 * @return {void} Results are visual
 */
function compareSearch(list, target) {
  //left gauge stats
  searchStressTimer = 40;
  let startA = performance.now();
  let stepsA = linearSearch(list, target);
  let endA = performance.now();

  statsA = {
    name: "Linear Search",
    steps: stepsA,
    time: (endA - startA).toFixed(2),
    complexity: "O(n)",
  };

  if (stepsA > 25) {
    targetStressA = 100;
  } else {
    targetStressA = map(stepsA, 0, 25, 0, 50);
  }

  //right gauge stats
  let startB = performance.now();
  let stepsB = binarySearch(list, target, 0, list.length - 1, 0);
  let endB = performance.now();

  statsB = {
    name: "Binary Search",
    steps: stepsB,
    time: (endB - startB).toFixed(2),
    complexity: "O(log n)",
  };

  if (stepsB > 25) {
    targetStressB = 100;
  } else {
    targetStressB = map(stepsB, 0, 25, 0, 50);
  }
}

/**
 * Begins the sorting comparison race, sets important variables for use
 * @return {void} Results are visual
 */
function startSortRace() {
  sortStartTime = performance.now();
  totalSortSteps = 0;
  totalInsertionSteps = 0;
  insertionIdx = 1;
  isSorting = true;
  bubbleDone = false;
  insertionDone = false;
}

/**
 * Performs the sort comparison, changing stats and stress amounts for gauges
 * @param {arr} listA Bubble sort array (copy of original)
 * @param {arr} listB Insertion sort array (copy of original)
 * @return {void} Results are visual
 */
function updateSortStats(listA, listB) {
  if (!bubbleDone) {
    let resultA = bubbleSort(listA);
    totalSortSteps += resultA.totalLoops;

    statsA = {
      name: "Bubble Sort",
      steps: totalSortSteps,
      time: (performance.now() - sortStartTime).toFixed(2),
      complexity: "O(n^2)",
    };

    if (resultA.sortedList) {
      bubbleDone = true;
    }
  }

  if (!insertionDone) {
    let resultB = insertionSort(listB);
    totalInsertionSteps += resultB.totalLoops;
    if (!resultB.isDone) {
      targetStressB = 100;
    } else {
      targetStressB = 0;
    }

    statsB = {
      name: "Insertion Sort",
      steps: totalInsertionSteps,
      time: (performance.now() - sortStartTime).toFixed(2),
      complexity: "O(n^2)",
    };

    if (resultB.isDone) {
      insertionDone = true;
    }
  }

  if (bubbleDone && insertionDone) {
    isSorting = false;
  }
}
