export function Astar(allnodes, grid, startNode, finishNode) {
  var h = [],
    visitednodesinorder = [];
  //Created h(n)
  for (let i = 0; i < allnodes.length; i++) {
    var x = finishNode.row - allnodes[i].row;
    var y = finishNode.col - allnodes[i].col;
    h[i] = Math.sqrt(x * x + y * y);
  }
  console.log(h);
  let q = [],
    p = [];
  console.log(startNode);
  q.push(startNode);
  p.push(h[allnodes.findIndex((node) => node === startNode)]);
  while (q[0] !== finishNode) {
    // console.log(q[0][0]);

    var currentNode = q[0];
    console.log(q);
    console.log(currentNode);
    // currentNode.isVisited = true;
    //  = JSON.parse(JSON.stringify(q[0][0]));
    // console.log(currentNode[0]);
    visitednodesinorder.push(currentNode);

    var neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      var ni = allnodes.findIndex((node) => node === neighbors[i]);
      //   console.log("Before second loop");
      for (let j = 0; j < q.length; j++) {
        console.log(h[ni] + 1, p[j]);
        if (h[ni] + 1 > p[j]) {
          //   console.log("In splice");
          q.splice(j + 1, 0, neighbors[i]);
          p.splice(j + 1, 0, h[ni] + 1);
          neighbors[i].previousNode = currentNode;
          break;
        }
      }
    }
    q.shift();
    p.shift();
    // q[1].shift();
  }
  var temp = q[0][0],
    path = [];
  while (temp !== startNode) {
    path.push(temp);
    temp = temp.previousNode;
  }
  path.push(startNode);
  return visitednodesinorder;
  // q[0] = 1 2 5 4 3
  // q[1] = 1 2 3 3 4
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
  console.log(x, y);
  if (grid[x - 1] && grid[x - 1][y]) {
    // potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`;
    potentialNeighbor = grid[x - 1][y];
    if (potentialNeighbor.isWall !== true) {
      neighbors.push(potentialNeighbor);
    }
  }
  if (grid[x][y + 1]) {
    // potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`;
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

export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
