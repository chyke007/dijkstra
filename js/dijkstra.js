// Changes to original version
// 1. Calculate the distance between any nodes in the dataset, without needing to edit the problem dictionary.
// 2. Prevent algorithm from going back to start node if loops exist in graph (e.g., in problem below)

const problem = {
  start: {B: 3, D: 3, E: 1},
  B: {C: 2, E: 2, F: 4},
  C: {B: 2, D: 2, E: 1, G: 1},
  D: {C: 2, E: 2, J: 4},
  E: {B: 2, C: 1, D: 2},
  F: {B: 4, G: 2, H: 1, finish: 3},
  G: {C: 1, F: 2, H: 2, J: 2},
  H: {F: 1, G: 2, finish: 3, J: 1},
  J: {D: 4, G: 2, H: 1, finish: 3},
  finish:{}
  
};


function log(message) {
    const logging = false;
    if (logging) {
        console.log(message);
    }
}

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph, startNodeName, endNodeName) => {

    // track the lowest cost to reach each node
    let costs = {};
    costs[endNodeName] = "Infinity";
    costs = Object.assign(costs, graph[startNodeName]);

    // track paths
    const parents = {endNodeName: null};
    for (let child in graph[startNodeName]) {
        parents[child] = startNodeName;
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            if (String(n) === String(startNodeName)) {
                log("WE DON'T GO BACK TO START");
            } else {
                log("StartNodeName: " + startNodeName);
                log("Evaluating cost to node " + n + " (looking from node " + node + ")");
                log("Last Cost: " + costs[n]);
                let newCost = cost + children[n];
                log("New Cost: " + newCost);
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                    log("Updated cost und parents");
                } else {
                    log("A shorter path already exists");
                }
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

	//used for getting the full path of the shortest path
	//this is done by appending all the elements in the 
	// parents array and then reversing it 
    let optimalPath = [endNodeName];
    let parent = parents[endNodeName];
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs[endNodeName],
        path: optimalPath
    };

    return results;
};


//console.log(dijkstra(problem, "start", "finish"));
//console.log(dijkstra(problem, "start", "J"));
//console.log(dijkstra(problem, "A", "start"));
