import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import Node from "./Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
  getAllNodes,
} from "./algorithms/dijkstra";
import { BFS, getNodesInShortestPathOrderBFS } from "./algorithms/bfs";
import {
  DFS,
  DFS_controller,
  getNodesInShortestPathOrderDFS,
} from "./algorithms/dfs";
// import { recursiveDivisionMaze, wallsToAnimate } from "./maze/maze";
import Countdown from "./Countdown";

// Position of the cup and harry

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;
const height = 20;
const width = 50;
var wallsToAnimate = [];

const Pathfinder = () => {
  const {
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    setSnodeRow,
    setSnodeCol,
  } = useAuth();
  const [grid, setGrid] = useState([]);
  const [endGame, setEndGame] = useState(false);

  const [seconds, setSeconds] = useState(1);

  function recursiveDivisionMaze(
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

          if (r === 0 || c === 0 || r === 49 || c === width - 1) {
            // let currentHTMLNode = document.getElementById(node); height - 1
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // console.log(seconds);
  useEffect(() => {
    const maze = initializeGrid();

    maze.forEach((node) => {
      node.map((innerNode) => {
        if (
          wallsToAnimate.some(
            (item) => item.col === innerNode.col && item.row === innerNode.row
          )
        ) {
          innerNode.isWall = true;
        }
      });
    });

    // For random changing mazes
    if (seconds % 10 === 0 && seconds > 30) {
      grid.forEach((node) => {
        node.map((innerNode) => {
          innerNode.isWall = false;
        });
      });
      // setGrid(maze);
      wallsToAnimate.splice(0, wallsToAnimate.length);
      console.log("Cleared the walls list");
      console.log(wallsToAnimate);
      visualizeMaze();
    }

    setGrid(maze);
    try {
      if (
        grid[START_NODE_ROW][START_NODE_COL] ===
        grid[FINISH_NODE_ROW][FINISH_NODE_COL]
      ) {
        setEndGame(true);
      }
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }

    console.log(grid);
    console.log(`Harry is at ${START_NODE_ROW} ${START_NODE_COL}`);
    try {
      grid[START_NODE_ROW][START_NODE_COL].isHarry = true;
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    // console.log(grid[START_NODE_ROW][0]);
    // console.log(randomMaze);
    animateWalls(wallsToAnimate);
  }, [START_NODE_ROW, START_NODE_COL]);
  // console.log(grid);

  // Grid builder functions start
  const createNode = (row, col) => {
    // Returns an object with the following properties
    return {
      row,
      col,
      isHarry: row === START_NODE_ROW && col === START_NODE_COL,
      isCup: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < 50; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        //   console.log("In inner for loo[");
        // push() adds the element to the array
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    console.log("Grid is done");
    return grid;
  };

  // Grid builder functions end

  //   For animation
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          // console.log(i, visitedNodesInOrder.length);
          // console.log("now starting shortest path");
          animateShortestPath(nodesInShortestPathOrder);
          // For fading walls
          for (let i = 0; i <= visitedNodesInOrder.length - 1; i++) {
            // if (i === visitedNodesInOrder.length) {
            //   setTimeout(() => {
            //     // console.log(i, visitedNodesInOrder.length);
            //     // console.log("now starting shortest path");
            //     animateShortestPath(nodesInShortestPathOrder);
            //   }, 15 * i);
            //   return;
            // }
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              // console.log(node);
              if (node.isHarry) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node node-start";
              } else if (node.isCup) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node node-finish ";
              } else if (node.isVisited) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node ";
              }
            }, 7 * i);
          }
        }, 7 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // console.log(node);
        if (node.isHarry) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-visited";
        } else if (node.isCup) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 7 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isHarry) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-shortest-path";
        } else if (node.isCup) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-shortest-path";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 10 * i);
    }
  }

  function animateWalls(wallsToAnimate) {
    // console.log(wallsToAnimate);
    for (let i = 0; i < wallsToAnimate.length; i++) {
      setTimeout(() => {
        const node = wallsToAnimate[i];
        try {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        } catch (error) {
          console.error(error);
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }
      }, 1 * i);
    }
  }

  //   For Djikstra
  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  //   For Djikstra
  function visualizeBFS() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  function visualizeDFS() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = DFS_controller(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function visualizeMaze() {
    const allNodes = getAllNodes(grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    // console.log(wallsToAnimate);
    recursiveDivisionMaze(
      allNodes,
      2,
      // height - 3,
      47,
      2,
      width - 3,
      "horizontal",
      false,
      "wall",
      startNode,
      finishNode
    );
    // console.log(wallsToAnimate);
    var half = wallsToAnimate.length / 20;
    for (let i = 0; i < half; i++) {
      let randomIndex = Math.floor(Math.random() * wallsToAnimate.length);
      if (
        wallsToAnimate[randomIndex].row === 0 ||
        wallsToAnimate[randomIndex].row === 49 ||
        wallsToAnimate[randomIndex].col === 0 ||
        wallsToAnimate[randomIndex].col === 49
      ) {
        i--;
        continue;
      }
      wallsToAnimate.splice(randomIndex, 1);
    }

    // console.log(wallsToAnimate);
    animateWalls(wallsToAnimate);
    // setRandomMaze(wallsToAnimate);
  }

  // Movement of the start node
  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      console.log("Up key");
      if (!grid[START_NODE_ROW - 1][START_NODE_COL].isWall) {
        setSnodeRow(START_NODE_ROW - 1);
      }
    } else if (e.keyCode == "40") {
      console.log("Down key");
      if (!grid[START_NODE_ROW + 1][START_NODE_COL].isWall) {
        setSnodeRow(START_NODE_ROW + 1);
      }
      // down arrow
    } else if (e.keyCode == "37") {
      console.log("Left key");
      if (!grid[START_NODE_ROW][START_NODE_COL - 1].isWall) {
        setSnodeCol(START_NODE_COL - 1);
      }
      // left arrow
    } else if (e.keyCode == "39") {
      console.log("Right key");
      if (!grid[START_NODE_ROW][START_NODE_COL + 1].isWall) {
        setSnodeCol(START_NODE_COL + 1);
      }
      // right arrow
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      {(document.onkeydown = checkKey)}
      {window.addEventListener(
        "keydown",
        function (e) {
          if (
            [
              "Space",
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
            ].indexOf(e.code) > -1
          ) {
            e.preventDefault();
          }
        },
        false
      )}
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>TriWizard Cup</h1>
      </div>
      {endGame ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>You win</h1>
          <button onClick={refreshPage}>Click to reload!</button>
        </div>
      ) : (
        <div className="parent">
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "1rem",
            }}
          >
            <button
              onClick={() => visualizeDijkstra()}
              style={{ marginRight: "10px" }}
            >
              Dijkstra's
            </button>
            <button
              onClick={() => visualizeDijkstra()}
              style={{ marginRight: "10px" }}
            >
              A*
            </button>
            <button
              onClick={() => visualizeBFS()}
              style={{ marginRight: "10px" }}
            >
              BFS
            </button>
            <button
              onClick={() => visualizeDFS()}
              style={{ marginRight: "10px" }}
            >
              DFS
            </button>
            <button onClick={() => visualizeMaze()}>Maze</button>
            {/* CountDown Button */}
            <Countdown />
            {/* CountDown Button */}
          </div>

          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className="">
                  {row.map((node, nodeIdx) => {
                    const { row, col, isHarry, isCup, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isHarry={isHarry}
                        isCup={isCup}
                        isWall={isWall}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Pathfinder;
