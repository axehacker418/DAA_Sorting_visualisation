document.getElementById('sortBtn').addEventListener('click', () => {
  const numbersInput = document.getElementById('numbers').value;
  const numbersArray = numbersInput.split(',').map(num => parseInt(num.trim())); 1 

  if (numbersArray.some(isNaN)) {
    alert('Please enter valid numbers separated by commas.');
    return;
  }

  // Hide the selection section and show the visualization section
  document.getElementById('selectionSection').classList.add('hidden');
  document.getElementById('visualizationSection').classList.remove('hidden');

  visualizeSorting(numbersArray);
});

function visualizeSorting(numbersArray) {
  const visualizationContainer = document.getElementById('visualization');
  visualizationContainer.innerHTML = '';

  // Adjust the container width based on the number of elements
  const containerWidth = visualizationContainer.offsetWidth;
  const barWidth = Math.max(30, containerWidth / numbersArray.length - 5);

  // Get the maximum value to scale the height
  const maxValue = Math.max(...numbersArray);
  const maxBarHeight = visualizationContainer.offsetHeight;

  // Create bars for each number in the array
  numbersArray.forEach(num => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${(num / maxValue) * maxBarHeight}px`;
    bar.style.width = `${barWidth}px`;
    bar.innerText = num;
    visualizationContainer.appendChild(bar);
  });

  // Get the selected sorting algorithm from the dropdown
  const selectedAlgorithm = document.getElementById('algorithm').value;

  // Call the appropriate sorting algorithm
  switch (selectedAlgorithm) {
    case 'bubbleSort':
      bubbleSort(numbersArray);
      break;
    case 'selectionSort':
      selectionSort(numbersArray);
      break;
    case 'insertionSort':
      insertionSort(numbersArray);
      break;
    default:
      console.error('Invalid algorithm selected.');
  }
}

// Bubble Sort with visualization
async function bubbleSort(arr) {
  let swapped;
  const visualizationContainer = document.getElementById('visualization');

  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        updateVisualization(arr);
        await new Promise(resolve => setTimeout(resolve, 1000));
        swapped = true;
      }
    }
  } while (swapped);

  finalizeSortedArray(arr, 'Bubble Sort');
}

// ... Similar implementations for selectionSort and insertionSort ...

function updateVisualization(arr) {
  const bars = document.querySelectorAll('.bar');
  const maxValue = Math.max(...arr);
  const maxBarHeight = document.getElementById('visualization').offsetHeight;
  const barWidth = Math.max(30, document.getElementById('visualization').offsetWidth / arr.length - 5);

  arr.forEach((num, index) => {
    bars[index].style.height = `${(num / maxValue) * maxBarHeight}px`;
    bars[index].style.width = `${barWidth}px`;
    bars[index].innerText = num;
  });
}

function finalizeSortedArray(arr, algorithmName) {
  // ... (similar to the previous implementation) ...
}