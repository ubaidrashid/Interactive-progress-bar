let progress = 16; 
let originalProgress = progress; 
let isDragging = false;

const dynamicPrices = document.querySelectorAll(".dynamicPrice"); // Select all dynamicPrice elements
const monthYears = document.querySelectorAll(".monthYear"); // Select all monthYear elements

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const views = document.querySelector(".views span");

  progressBar.style.width = `${progress}%`;

  // Update all dynamicPrice elements
  dynamicPrices.forEach(priceElement => {
    priceElement.innerText = `${progress.toFixed(2)}`;
  });

  const totalViews = Math.round((progress / 16) * 100);
  views.innerText = totalViews;
}

function hoverEffect(event) {
  const progressBarContainer = document.querySelector(".progress-container");
  const hoverDiv = document.getElementById("hover-div");

  const containerRect = progressBarContainer.getBoundingClientRect();
  const offsetX = event.clientX - containerRect.left;

  hoverDiv.style.left = `${offsetX}px`;
  hoverDiv.style.display = "flex";
}

document.querySelector(".progress-container").addEventListener("mouseleave", () => {
  const hoverDiv = document.getElementById("hover-div");
  hoverDiv.style.display = "none";
});

function startDragging(event) {
  isDragging = true;
  adjustProgress(event); 
}

function stopDragging() {
  isDragging = false;
}

function dragProgress(event) {
  if (isDragging) {
    adjustProgress(event);
  }
}

function adjustProgress(event) {
  const progressBarContainer = document.querySelector(".progress-container");
  const containerWidth = progressBarContainer.offsetWidth;

  const clickPosition = event.clientX - progressBarContainer.getBoundingClientRect().left;
  progress = (clickPosition / containerWidth) * 100;
  progress = Math.max(0, Math.min(progress, 100)); 
  originalProgress = progress; 
  updateProgressBar();
}

updateProgressBar();

const progressBarContainer = document.querySelector(".progress-container");
progressBarContainer.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", dragProgress);
document.addEventListener("mouseup", stopDragging);

let btnSwiitch = document.querySelector('.switch');
let isMonth = true;

btnSwiitch.addEventListener('click', () => {
  btnSwiitch.classList.toggle('flexEnd');
  isMonth = !isMonth;

  if (isMonth) {
    // Switch to Monthly Billing
    monthYears.forEach(monthYearElement => {
      monthYearElement.innerText = 'month';
    });
    progress = originalProgress; 
    btnSwiitch.style.backgroundColor = ' hsl(225, 20%, 60%)';
    btnSwiitch.style.borderColor = ' hsl(225, 20%, 60%)';
    console.log('Switching to Monthly Billing');
    
    // Update all dynamicPrice elements for monthly billing
    dynamicPrices.forEach(priceElement => {
      priceElement.innerText = `${progress.toFixed(2)}`;
    });
  } else {
    // Switch to Yearly Billing
    console.log('Switching to Yearly Billing');
    let yearlyBilling = originalProgress * 12; 
    let withDiscount = yearlyBilling * 0.75; 
    monthYears.forEach(monthYearElement => {
      monthYearElement.innerText = 'year';
    });
    btnSwiitch.style.backgroundColor = 'hsl(174, 84%, 39%)';
    btnSwiitch.style.borderColor = 'hsl(174, 84%, 39%)';

    progress = withDiscount;
    // Update all dynamicPrice elements for yearly billing
    dynamicPrices.forEach(priceElement => {
      priceElement.innerText = `${progress.toFixed(2)}`;
    });
  }

  console.log('Current Progress:', progress);
});
