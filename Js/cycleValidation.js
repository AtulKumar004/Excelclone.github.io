let colletedgraphCompenentMatrix = [];
// Storage of 2D matrix (Basic need)
let graphCompenentMatrix = [];
// for(let i = 0; i < rows; i++){
//     let row = [];
//     for(let j = 0; j < cols; j++){
//         row.push([]);

//     }
//     graphCompenentMatrix.push(row);

// }


function isGraphCyclic(graphCompenentMatrix){
    let visited = [];
    let dfsvisited = [];
    for(let i = 0; i < rows; i++){
        let visitedRow = [];
        let dfsvisitedRow = [];
        for(let j = 0; j < cols; j++){
            visitedRow.push(false);         // Default False set 
            dfsvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow);


    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(visited[i][j] === false){
                let response = dfsCycleDetection( graphCompenentMatrix , i , j , visited,  dfsvisited );
                if(response === true){  
                    return [ i , j];
                }
            }
        }
    }
    return null;


}



function dfsCycleDetection(graphCompenentMatrix , srcr , srcc , visited , dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;
    for(let children = 0 ; children < graphCompenentMatrix[srcr][srcc].length; children++){
        let [nbrr , nbrc]  = graphCompenentMatrix[srcr][srcc][children]; //get addrss
        if(visited[nbrr][nbrc] === false){
            let response = dfsCycleDetection(graphCompenentMatrix , nbrr , nbrc , visited , dfsvisited );
            if(response === true){ // Found cycle so return immediatly, no need to explore;
                return true;
            }

        }
        else if(visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true ){
            return true;  // Found cycle so return immediatly, no need to explore;
        }

    }

    dfsvisited[srcr][srcc] = false; 
    return false;
}