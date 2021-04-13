import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import Node from "./Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
  getAllNodes,
} from "./algorithms/dijkstra";
import { recursiveDivisionMaze, wallsToAnimate } from "./maze/maze";
import Countdown from "./Countdown";

// Position of the cup and harry

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;
const height = 20;
const width = 50;

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
  const [flag, setFlag] = useState(true);

  // setInterval(function () {
  //   setFlag(true);
  //   console.log(`Flag is ${flag}`);
  // }, 20000);

  // console.log(grid);
  //   First things that runs after the page is rendered

  // function callAfter() {
  //   // setTimeout(() => setFlag(true), 10000);
  //   console.log("flag set as true");
  //   setFlag(true);
  // }
  // const [flag, setFlag] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    // setGrid(maze);

    // For random changing mazes

    if (seconds % 5 === 0 && seconds != 0) {
      const startNode = maze[START_NODE_ROW][START_NODE_COL];
      const finishNode = maze[FINISH_NODE_ROW][FINISH_NODE_COL];
      const vnio = dijkstra(maze, startNode, finishNode);
      const nispo = getNodesInShortestPathOrder(finishNode);

      maze[nispo[1].row][nispo[1].col].isWall = true;
      console.log(maze[nispo[1].row][nispo[1].col]);
      const vnio1 = dijkstra(maze, startNode, finishNode);
      const nispo1 = getNodesInShortestPathOrder(finishNode);
      console.log("Outside if condition");
      if (
        (nispo1.length > 1 && nispo1[nispo1.length - 1] !== finishNode) ||
        nispo1.length <= 1
      ) {
        console.log("In if condition");
        maze[nispo[1].row][nispo[1].col].isWall = false;
      }
    }

    setGrid(maze);
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
          // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          //   // if (i === visitedNodesInOrder.length) {
          //   //   setTimeout(() => {
          //   //     // console.log(i, visitedNodesInOrder.length);
          //   //     // console.log("now starting shortest path");
          //   //     animateShortestPath(nodesInShortestPathOrder);
          //   //   }, 15 * i);
          //   //   return;
          //   // }
          //   setTimeout(() => {
          //     const node = visitedNodesInOrder[i];
          //     // console.log(node);
          //     if (node.isHarry) {
          //       document.getElementById(
          //         `node-${node.row}-${node.col}`
          //       ).className = "node node-start";
          //     } else if (node.isCup) {
          //       document.getElementById(
          //         `node-${node.row}-${node.col}`
          //       ).className = "node node-finish ";
          //     } else if (node.isVisited) {
          //       document.getElementById(
          //         `node-${node.row}-${node.col}`
          //       ).className = "node ";
          //     }
          //   }, 15 * i);
          // }
        }, 15 * i);
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
      }, 15 * i);
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
      }, 15 * i);
    }
  }

  function animateWalls(wallsToAnimate) {
    for (let i = 0; i < wallsToAnimate.length; i++) {
      setTimeout(() => {
        const node = wallsToAnimate[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      }, 10 * i);
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

  function visualizeMaze() {
    const allNodes = getAllNodes(grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
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
    var half = wallsToAnimate.length / 25;
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

    console.log(wallsToAnimate);
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
        <h1>Hi from triwiz</h1>

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
            Visualize Dijkstra's Algorithm
          </button>
          <button onClick={() => visualizeMaze()}>Maze</button>
          {/* CountDown Button */}
          <Countdown />
          {/* CountDown Button */}
        </div>
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
    </>
  );
};

export default Pathfinder;
