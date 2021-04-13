export function DFS(grid, startNode, finishNode, visitedNodesInOrder) {
  if (JSON.stringify(startNode) === JSON.stringify(finishNode)) {
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    return visitedNodesInOrder;
  }
  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);
  let currentNeighbors = getNeighbors(startNode, grid);

  var calls = 0;
  let inv = 0;

  console.log("Outside for each");
  currentNeighbors.forEach((neighbor) => {
    console.log(neighbor);
    console.log(neighbor.isVisited);
    if (neighbor.isVisited !== true) {
      calls++;
      neighbor.previousNode = startNode;
      var ans = DFS(grid, neighbor, finishNode, visitedNodesInOrder);
      if (ans !== -1) return visitedNodesInOrder;
    }
  });

  return -1;
}

export function DFS_controller(grid, startNode, finishNode) {
  console.log("In DFS");
  var visitedNodesInOrder = [];
  visitedNodesInOrder = DFS(grid, startNode, finishNode, visitedNodesInOrder);
  return visitedNodesInOrder;
}

function getNeighbors(currentNode, grid) {
  let x = currentNode.row;
  let y = currentNode.col;
  let neighbors = [];
  let potentialNeighbor;
  if (grid[x - 1] && grid[x - 1][y]) {
    potentialNeighbor = grid[x - 1][y];
    if (potentialNeighbor.isWall !== true) {
      neighbors.push(potentialNeighbor);
    }
  }
  if (grid[x][y + 1]) {
    potentialNeighbor = grid[x][y + 1];
    if (potentialNeighbor.isWall !== true) {
      neighbors.push(potentialNeighbor);
    }
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    potentialNeighbor = grid[x + 1][y];
    if (potentialNeighbor.isWall !== true) {
      neighbors.push(potentialNeighbor);
    }
  }
  if (grid[x][y - 1]) {
    potentialNeighbor = grid[x][y - 1];
    if (potentialNeighbor.isWall !== true) {
      neighbors.push(potentialNeighbor);
    }
  }
  return neighbors;
}

export function getNodesInShortestPathOrderDFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
