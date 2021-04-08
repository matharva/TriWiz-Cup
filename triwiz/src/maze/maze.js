// Return all the nodes to the colored

// The start and end nodes are defined here

const height = 20;
const width = 50;
let wallsToAnimate = [];

export function recursiveDivisionMaze(
  board,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls,
  type,
  startNode,
  finishNode
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    let relevantIds = [startNode, finishNode];
    // if (board.object) relevantIds.push(board.object);
    // Object.keys(board.nodes).forEach((node) => {
    board.forEach((node) => {
      if (!relevantIds.includes(node)) {
        // console.log(node.row, node.col);
        let r = node.row;
        let c = node.col;

        if (r === 0 || c === 0 || r === height - 1 || c === width - 1) {
          // let currentHTMLNode = document.getElementById(node);
          wallsToAnimate.push(node);
          if (type === "wall") {
            node.isWall = true;
            // board.nodes[node].weight = 0;
          }
          // else if (type === "weight") {
          //   board.nodes[node].status = "unvisited";
          //   board.nodes[node].weight = 15;
          // }
        }
        // console.log("Walls are done");
      }
    });
    // console.log(wallsToAnimate);
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    // console.log("In horizontal if");
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    board.forEach((node) => {
      // let r = parseInt(node.split("-")[0]);
      // let c = parseInt(node.split("-")[1]);
      let r = node.row;
      let c = node.col;
      if (
        r === currentRow &&
        c !== colRandom &&
        c >= colStart - 1 &&
        c <= colEnd + 1
      ) {
        // let currentHTMLNode = document.getElementById(node);
        // if (
        //   currentHTMLNode.className !== "start" &&
        //   currentHTMLNode.className !== "target" &&
        //   currentHTMLNode.className !== "object"
        // ) {
        if (
          node.isHarry === false &&
          node.isCup === false &&
          node.isWall === false
        ) {
          wallsToAnimate.push(node);
          if (type === "wall") {
            node.isWall = true;
            // board.nodes[node].weight = 0;
          }
          //else if (type === "weight") {
          //   board.nodes[node].status = "unvisited";
          //   board.nodes[node].weight = 15;
          // }
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    } else {
      recursiveDivisionMaze(
        board,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    }
  }

  // ELSE STARTS HERE
  else {
    // console.log("In else");
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    board.forEach((node) => {
      // let r = parseInt(node.split("-")[0]);
      // let c = parseInt(node.split("-")[1]);
      let r = node.row;
      let c = node.col;
      if (
        c === currentCol &&
        r !== rowRandom &&
        r >= rowStart - 1 &&
        r <= rowEnd + 1
      ) {
        // let currentHTMLNode = document.getElementById(node);
        // if (
        //   currentHTMLNode.className !== "start" &&
        //   currentHTMLNode.className !== "target" &&
        //   currentHTMLNode.className !== "object"
        // ) {
        // console.log(node);
        if (
          node.isHarry === false &&
          node.isCup === false &&
          node.isWall === false
        ) {
          wallsToAnimate.push(node);
          // console.log("Wall added");
          // console.log(node);
          if (type === "wall") {
            node.isWall = true;
          }
          // else if (type === "weight") {
          //   board.nodes[node].status = "unvisited";
          //   board.nodes[node].weight = 15;
          // }
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    } else {
      recursiveDivisionMaze(
        board,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        type,
        startNode,
        finishNode
      );
    }
  }
  // console.log(wallsToAnimate);
}
export { wallsToAnimate };
export default recursiveDivisionMaze;
