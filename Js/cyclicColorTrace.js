async function isGraphCyclicTracePath(graphCompenentMatrix, cyclicresponce){ // for tracking the color path
    let [srcr , srcc] = cyclicresponce;
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

    // for(let i = 0; i < rows; i++){
    //     for(let j = 0; j < cols; j++){
    //         if(visited[i][j] === false){
    //             let response = dfsCycleDetection( graphCompenentMatrix , i , j , visited,  dfsvisited );
    //             if(response === true){  
    //                 return true;
    //             }
    //         }
    //     }  
    // }

    let response = await dfsCycleDetectionTracePath( graphCompenentMatrix , srcr , srcc , visited,  dfsvisited );
    if(response === true) return Promise.resolve(true);

    return Promise.resolve(false);


}


function colorPromise(){
    return new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

// coloring cell for tracing


async function dfsCycleDetectionTracePath(graphCompenentMatrix , srcr , srcc , visited , dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;
    let cell =  document.querySelector(`.cell[row_id = "${srcr}"][col_id = "${srcc}"]`);
    
    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // wait till 1 sec
    for(let children = 0 ; children < graphCompenentMatrix[srcr][srcc].length; children++){
        let [nbrr , nbrc]  = graphCompenentMatrix[srcr][srcc][children]; //get addrss
        if(visited[nbrr][nbrc] === false){
            let response = await dfsCycleDetectionTracePath(graphCompenentMatrix , nbrr , nbrc , visited , dfsvisited );
            if(response === true){ // Found cycle so return immediatly, no need to explore;
                cell.style.backgroundColor = "transparent";
                await colorPromise(); // wait till 1 sec
                return Promise.resolve(true);
            }

        }
        else if(visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true ){
            let CyclicCell =  document.querySelector(`.cell[row_id = "${nbrr}"][col_id = "${nbrc}"]`);
            CyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise(); // wait till 1 sec
            CyclicCell.style.backgroundColor = "transparent";
            await colorPromise(); // wait till 1 sec
            cell.style.backgroundColor = "transparent";
            await colorPromise(); // wait till 1 sec
            return Promise.resolve(true);  // Found cycle so return immediatly, no need to explore;
        }

    }

    dfsvisited[srcr][srcc] = false; 
    return Promise.resolve(false);
}