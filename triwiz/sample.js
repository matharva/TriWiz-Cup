const grid = [];
for (let row = 0; row < 20; row++) {
  const currentRow = [];
  for (let col = 0; col < 50; col++) {
    //   console.log("In inner for loo[");
    // push() adds the element to the array
    currentRow.push([]);
  }
  grid.push(currentRow);
}
console.log("Grid is done");

grid.forEach((node) => {
  console.log(node);
});
