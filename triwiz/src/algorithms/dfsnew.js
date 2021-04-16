let nodesToAnimate = [];

export function DFS(grid, startNode, finishNode) {
  //   if (!start || !target || start === target) {
  //     return false;
  //   }
  console.log("In DFS");
  let tempArray = [startNode];
  const visitedNodesInOrder = [];
  //   let exploredNodes = { startNode: true };
  //   const unvisitedNodes = getAllNodes(grid);
  while (tempArray.length) {
    console.log("In while loop");
    let currentNode = tempArray.pop();
    console.log(`Current Node: ${currentNode.isVisited}`);

    // nodesToAnimate.push(currentNode);
    // if (name === "dfs") exploredNodes[currentNode.id] = true;
    if (!!!currentNode.isVisited) {
      console.log(currentNode);
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      console.log(visitedNodesInOrder);
      if (JSON.stringify(currentNode) === JSON.stringify(finishNode)) {
        //   console.log(nodesToAnimate);
        console.log(visitedNodesInOrder);
        return visitedNodesInOrder;
      }
      // let currentNeighbors = getNeighbors(
      //   currentNode.id,
      //   nodes,
      //   boardArray,
      //   name
      // );
      let currentNeighbors = getNeighbors(currentNode, grid);
      console.log("Outside for each");
      currentNeighbors.forEach((neighbor) => {
        //   console.log(neighbor);
        console.log(neighbor.isVisited);
        if (neighbor.isVisited !== true) {
          //   visitedNodesInOrder.push(currentNode);
          // nodes[neighbor].previousNode = currentNode.id;
          // Soemthing here
          neighbor.previousNode = currentNode;
          tempArray.push(neighbor);
        }
      });
    }
  }
  //   return nodesToAnimate;
  console.log(nodesToAnimate);
}

// function getNeighbors(id, nodes, boardArray, name) {
function getNeighbors(currentNode, grid) {
  //   let coordinates = id.split("-");
  //   let x = parseInt(coordinates[0]);
  //   let y = parseInt(coordinates[1]);
  let x = currentNode.row;
  let y = currentNode.col;
  let neighbors = [];
  let potentialNeighbor;
  if (grid[x - 1] && grid[x - 1][y]) {
    // potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`;
    potentialNeighbor = grid[x - 1][y];
    if (potentialNeighbor.isWall !== true) {
      neighbors.unshift(potentialNeighbor);
    }
  }
  if (grid[x][y + 1]) {
    // potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`;
    potentialNeighbor = grid[x][y + 1];
    if (potentialNeighbor.isWall !== true) {
      neighbors.unshift(potentialNeighbor);
    }
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    potentialNeighbor = grid[x + 1][y];
    if (potentialNeighbor.isWall !== true) {
      neighbors.unshift(potentialNeighbor);
    }
  }
  if (grid[x][y - 1]) {
    potentialNeighbor = grid[x][y - 1];
    if (potentialNeighbor.isWall !== true) {
      neighbors.unshift(potentialNeighbor);
    }
  }
  return neighbors;
}

export function getNodesInShortestPathOrderBFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

// // Get all nodes from grid
// export function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }
