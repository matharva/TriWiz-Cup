import React, { useEffect, useState } from "react";
import Node from "./Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
  getAllNodes,
} from "./algorithms/dijkstra";
import { recursiveDivisionMaze, wallsToAnimate } from "./maze/maze";

// Position of the cup and harry
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const height = 20;
const width = 50;

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  console.log(grid);
  //   First things that runs after the page is rendered
  useEffect(() => {
    const maze = initializeGrid();
    setGrid(maze);
  }, []);
  console.log(grid);

  //   For animation
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          console.log(i, visitedNodesInOrder.length);
          console.log("now starting shortest path");
          animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 15 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
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
      height - 3,
      2,
      width - 3,
      "horizontal",
      false,
      "wall",
      startNode,
      finishNode
    );
    console.log(wallsToAnimate);
    animateWalls(wallsToAnimate);
  }

  return (
    <>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => visualizeMaze()}>Maze</button>
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
  for (let row = 0; row < 20; row++) {
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
