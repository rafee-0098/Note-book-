

// References to DOM elements
const image = document.querySelector('img');
const input = document.querySelector('input');
const textarea1 = document.querySelector('[data-id="textarea1"]');
const textarea2 = document.querySelector('[data-id="textarea2"]');
const textarea3 = document.querySelector('[data-id="textarea3"]');

const saveBtn = document.getElementById('save-btn');
const updateBtn = document.getElementById('update-btn');
const clearBtn = document.getElementById('clear-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const book = document.querySelector('#book');

const paper1 = document.querySelector('#p1')
const paper2 = document.querySelector('#p2')
const paper3 = document.querySelector('#p3')

// change input and image 
input.addEventListener('change', (e) => {
  image.src = URL.createObjectURL(e.target.files[0]);
});

// Event listeners
prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);

// Business Logic
let currentState = 1;
let numOfPapers =  3;
let maxState = numOfPapers +1;

// Load saved data
loadData();

function openBook() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isFirstPage) {
  if(isFirstPage) {
    book.style.transform = "translateX(0%)";
  } else {
    book.style.transform = "translateX(100%)";
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";

}

function goNext() {
  if(currentState < maxState) { 
    switch(currentState) {
      case 1:
        openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        closeBook(false);
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        break;
      default: 
        throw new Error("unkown state");    
    }

    currentState++;
    saveData();
  }
}

function goPrevious() {
  if(currentState > 1) {
    switch(currentState) {
      case 2:
        closeBook(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 3;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 2;
        break;
      case 4: 
        openBook()
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 1;
        break;
    }

    currentState--;
    saveData();
  }
}

function saveData() {
    const data = {
      currentState: currentState,
      image: image.src,
      input: input.value,
    };
  
    localStorage.setItem('bookData', JSON.stringify(data));
  }
  

     
    // Save textarea data to local storage
textarea1.addEventListener('input', () => {
  localStorage.setItem('textarea1', textarea1.value);
});
textarea2.addEventListener('input', () => {
  localStorage.setItem('textarea2', textarea2.value);
});
textarea3.addEventListener('input', () => {
  localStorage.setItem('textarea3', textarea3.value);
});


// Load saved textarea data
function loadData() {
  const savedTextarea1 = localStorage.getItem('textarea1');
  const savedTextarea2 = localStorage.getItem('textarea2');
  const savedTextarea3 = localStorage.getItem('textarea3');
  const data = localStorage.getItem('bookData');
  if (data) {
    const bookData = JSON.parse(data);
    currentState = bookData.currentState;
    image.src = bookData.image;
    input.value = bookData.input;
}
  if (savedTextarea1) {
    textarea1.value = savedTextarea1;
  }
  if (savedTextarea2) {
    textarea2.value = savedTextarea2;
  }
  if (savedTextarea3) {
    textarea3.value = savedTextarea3;
  }

};
// Call loadData when the page loads
loadData();

  
      // // Update the book state
      switch (currentState) {
        case 2:
          openBook();
          paper1.classList.add("flipped");
          paper1.style.zIndex = 1;
          break;
        case 3:
          paper2.classList.add("flipped");
          paper2.style.zIndex = 2;
          break;
        case 4:
          closeBook(false);
          paper3.classList.add("flipped");
          paper3.style.zIndex = 3;
          break;
      }

        //complete ----


