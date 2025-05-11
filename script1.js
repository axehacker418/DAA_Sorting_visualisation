// Event listener for the "Start Sorting" button
document.getElementById('sortBtn').addEventListener('click', function () {
  const numbersInput = document.getElementById('numbers').value;
  const numbersArray = numbersInput.split(',').map((num) => parseInt(num.trim()));

  if (numbersArray.some(isNaN)) {
    alert('Please enter valid numbers separated by commas.');
    return;
  }

  // Hide the selection section and show the visualization section
  document.getElementById('selectionSection').classList.add('hidden');
  document.getElementById('visualizationSection').classList.remove('hidden');

  // Visualize the initial list
  visualizeSorting(numbersArray);
});

// Function to visualize the sorting algorithm
function visualizeSorting(numbersArray) {
  const visualizationContainer = document.getElementById('visualization');
  visualizationContainer.innerHTML = ''; // Clear any previous bars

  // Adjust the container width based on the number of elements
  const containerWidth = visualizationContainer.offsetWidth;
  const barWidth = Math.max(30, containerWidth / numbersArray.length - 5); // Ensures bars don't become too narrow

  // Get the maximum value to scale the height
  const maxValue = Math.max(...numbersArray);
  const maxBarHeight = visualizationContainer.offsetHeight;

  // Create bars for each number in the array
  numbersArray.forEach((num) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${(num / maxValue) * maxBarHeight}px`; // Adjust the height based on the number value
    bar.style.width = `${barWidth}px`; // Adjust width to fit within the container
    bar.innerText = num;
    visualizationContainer.appendChild(bar);
  });

  // Call the selected sorting algorithm (default: Bubble Sort)
  bubbleSort(numbersArray);
}

// Bubble Sort with visualization
function bubbleSort(arr) {
  let swapped;
  const visualizationContainer = document.getElementById('visualization');

  (async function sortStepByStep() {
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Swap the elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          updateVisualization(arr);
          swapped = true;
          await sleep(1000); // Add a 1000ms delay for each swap
        }
      }
    } while (swapped);

    // Once sorting is complete, hold the final design and show sorted array
    finalizeSortedArray(arr, "Bubble Sort");
  })();
}

// Function to update the bars in the visualization after each swap
function updateVisualization(arr) {
  const bars = document.querySelectorAll('.bar');
  const maxValue = Math.max(...arr);
  const maxBarHeight = document.getElementById('visualization').offsetHeight;
  const barWidth = Math.max(30, document.getElementById('visualization').offsetWidth / arr.length - 5); // Adjust width dynamically

  arr.forEach((num, index) => {
    bars[index].style.height = `${(num / maxValue) * maxBarHeight}px`;
    bars[index].style.width = `${barWidth}px`;
    bars[index].innerText = num;
  });
}

// Function to finalize the sorted array and hold the visualization design
function finalizeSortedArray(arr, algorithmName) {
  const visualizationContainer = document.getElementById('visualization');
  const bars = document.querySelectorAll('.bar');

  const maxValue = Math.max(...arr);
  const maxBarHeight = visualizationContainer.offsetHeight;
  const barWidth = Math.max(30, visualizationContainer.offsetWidth / arr.length - 5);

  arr.forEach((num, index) => {
    bars[index].style.height = `${(num / maxValue) * maxBarHeight}px`;
    bars[index].style.width = `${barWidth}px`;
    bars[index].innerText = num;
  });

  console.log("Final array: ", arr); // Debugging line
  displaySortedArray(arr, algorithmName); // Ensure this function is called
}

function displaySortedArray(arr, algorithmName) {
  const resultSection = document.getElementById('resultSection');
  if (!resultSection) {
      console.error("Result section not found in the DOM!");
      return;
  }

  // Force display for debugging
  resultSection.style.display = 'block';
  resultSection.style.visibility = 'visible';
  resultSection.style.opacity = '1';

  document.getElementById('sortedArray').innerText = `Sorted Array: ${arr.join(', ')}`;
  document.getElementById('algorithmUsed').innerText = `Sorting Algorithm: ${algorithmName}`;
  document.getElementById('finalMessage').innerText = "Sorting Complete!";
}


// Helper function to pause for a given number of milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
