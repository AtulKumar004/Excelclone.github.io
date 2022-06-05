let sheetAdd = document.querySelector(".sheet-add-icon");
let sheetFoldercont = document.querySelector(".sheets-folder-cont");

sheetAdd.addEventListener("click", (e) => {
    let Sheet = document.createElement("div");
    let SheetCont = document.querySelectorAll(".sheet-content");
    Sheet.setAttribute("id" , `${SheetCont.length }`);
    Sheet.setAttribute("class", "sheet-content");
    
    
    Sheet.innerText = ` Sheet ${SheetCont.length + 1} `
    sheetFoldercont.appendChild(Sheet);
    // DP
    createSheetDB();
    createGraphComponentMatrix();

    handleSheetActiveness(Sheet);
    Sheet.click();



})
function handleSheetProperties() {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let cell =  document.querySelector(`.cell[row_id = "${i}"][col_id = "${j}"]`);
            cell.click();
        }
    }
    let FirstCell = document.querySelector(".cell");
    FirstCell.click();
}

function handleSheetUI(Sheet){
    let SheetCont = document.querySelectorAll(".sheet-content");
    for(let i = 0 ; i< SheetCont.length; i++){
        SheetCont[i].style.backgroundColor = "transparent"
    }
    Sheet.style.backgroundColor = "#ced6e0"

}
function handleSheetActiveness(Sheet){
    Sheet.addEventListener("click" , (e) => {
        let sheetIdx = Number(Sheet.getAttribute("id"));
        handleSheetDP(sheetIdx);
        handleSheetProperties();
        handleSheetUI(Sheet);

    });
}
function handleSheetDP(sheetIdx){
    sheetDP = collectorSheetDP[sheetIdx];
    graphCompenentMatrix = colletedgraphCompenentMatrix[sheetIdx];
}

function createSheetDB() {
    let sheetDP = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < cols; j++) {
            let cellprop = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontsize: "14",
                fontFamily: "monospace",
                fontColor: "#000000",
                BGcolor: "white",
                value: "",
                formula: "",
                children: []

            }
            sheetRow.push(cellprop);
        }
        sheetDP.push(sheetRow);

    }
    collectorSheetDP.push(sheetDP);

}


function createGraphComponentMatrix() {
    let graphCompenentMatrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push([]);

        }
        graphCompenentMatrix.push(row);

    }
    colletedgraphCompenentMatrix.push(graphCompenentMatrix);

}