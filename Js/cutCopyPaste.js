let ctrlKey;
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})
let coyBtn = document.querySelector(".copy");
let pasteBtn = document.querySelector(".paste");
let cutBtn = document.querySelector(".cut")

for (let i =0;i < rows;i++) {
    for (let j = 0;j < cols;j++) {
        let cell =  document.querySelector(`.cell[row_id = "${i}"][col_id = "${j}"]`);
        handleSelectedCells(cell);
    }
}


let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        // Select cells range work
        if (!ctrlKey) return;
        if (rangeStorage.length >= 2) {
            handleSelectedCellsUI();
            rangeStorage = [];
        }

        // UI
        cell.style.border = "3px solid #218c74";

        let rid = Number(cell.getAttribute("row_id"));
        let cid = Number(cell.getAttribute("col_id"));
        rangeStorage.push([rid, cid]);
        console.log(rangeStorage);
    })
}

function handleSelectedCellsUI(){
    for(let i = 0; i < rangeStorage.length; i++ ){
        let cell =  document.querySelector(`.cell[row_id = "${rangeStorage[i][0]}"][col_id = "${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgray";
    }
}


let copyData = [];

coyBtn.addEventListener("click" , (e) => {
    let startRow = rangeStorage[0][0];
    let endRow = rangeStorage[1][0];
    let startCol = rangeStorage[0][1];
    let endCol = rangeStorage[1][1];

    for(let  i = startRow ; i <= endRow; i++){
        let copyRow = [];
        for(let j = startCol; j <= endCol; j++){
            let cellProp = sheetDP[i][j];
            copyRow.push(cellProp);

        }
        copyData.push(copyRow);
    }
    console.log(copyData);
    handleSelectedCellsUI();
})


pasteBtn.addEventListener("click" , (e) => {
    let address = addressBar.value;
    if(rangeStorage.length < 2 ) return;
    let [stRow,  stCol] =  decordRIDCIDfromAdress(address);
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    for(let  i = stRow , r = 0; i <= rowDiff + stRow; i++, r++){
        for(let j = stCol , c = 0; j <= colDiff + stCol; j++ , c++){
            let cell =  document.querySelector(`.cell[row_id = "${i}"][col_id = "${j}"]`);
            let data = copyData[r][c];
            let cellProp = sheetDP[i][j];
            if(!cell) continue;

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.alignment = data.alignment;
            cellProp.fontsize = data.fontsize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.formula = data.formula;
            cellProp.children = data.children;

            cell.click();
        }
    }
    

})
cutBtn.addEventListener("click" , (e) => {
    let startRow = rangeStorage[0][0];
    let endRow = rangeStorage[1][0];
    let startCol = rangeStorage[0][1];
    let endCol = rangeStorage[1][1];

    for(let  i = startRow ; i <= endRow; i++){
        let copyRow = [];
        for(let j = startCol; j <= endCol; j++){
            let cell =  document.querySelector(`.cell[row_id = "${i}"][col_id = "${j}"]`);
            let cellProp = sheetDP[i][j];
            

            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.alignment = "left";
            cellProp.fontsize = "14";
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "white";
            cellProp.formula = "";
            cellProp.children = [];

            cell.click();

        }
        
    }
    
    handleSelectedCellsUI();

})