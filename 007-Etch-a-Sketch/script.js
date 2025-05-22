console.log("Hello World!");
const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset-button");
const resizeButton = document.querySelector("#resize-button");
const randomColorButton = document.querySelector("#random-color-button")
const toggleGridLinesButton = document.querySelector("#toggle-grid-lines-button");
let randomColor = false
let color = "Red"

let gridSize = 16;

function createGridItem(){
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseover", () => {
        if (randomColor){
            color = getRandomColor()
        }
        gridItem.style.backgroundColor = color
    });

    return gridItem
}

for (let i=0; i<gridSize*gridSize; i++){
    const gridItem  = createGridItem();
    container.appendChild(gridItem);
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256); 
    return `rgb(${r}, ${g}, ${b})`; 
}

resetButton.addEventListener("click", () => {
    console.log("Reset button clicked!");
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((gridItem) => {
        gridItem.style.backgroundColor = "cornflowerblue";
    })

})

resizeButton.addEventListener("click", () => {
    console.log("Resize button clicked!");
    const newSize = parseInt(prompt("Enter new grid size, must be even:"), 10);

    if (isNaN(newSize) || newSize < 1 || newSize > 100 || newSize % 2 !== 0){
        alert("Please enter a valid even number between 1 and 100");
        return;
    }

    gridSize = newSize;
    container.innerHTML = "";


    const gridItemSize = Math.floor(480/gridSize)

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = createGridItem();
        gridItem.style.width = `${gridItemSize}px`;
        gridItem.style.height = `${gridItemSize}px`;
        container.appendChild(gridItem);
    }

})

randomColorButton.addEventListener("click", () => {
    randomColor = !randomColor;
})

let gridLinesVisible = true; // Boolean to track grid line visibility

toggleGridLinesButton.addEventListener("click", () => {
    console.log("Toggle Grid Lines button clicked!");
    const gridItems = document.querySelectorAll(".grid-item");
    gridLinesVisible = !gridLinesVisible; // Toggle the boolean
    gridItems.forEach((gridItem) => {
        gridItem.style.border = gridLinesVisible ? "1px solid black" : "none"; // Show or hide borders
    });
});