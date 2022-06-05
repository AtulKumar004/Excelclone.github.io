let rows = 100;
let cols = 26;
let AddressColcont = document.querySelector(".address-col-cont");
let AddressRowcont = document.querySelector(".adress-row-cont");
let cellCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");
for(let i = 0; i < rows; i++){
    let addressCol = document.createElement("div");
    addressCol.innerText = i+1;
    addressCol.setAttribute("class", "address-col")
    AddressColcont.appendChild(addressCol);
}

for(let i = 0; i < cols; i++){
    let addressRow = document.createElement("div");
    addressRow.innerText = String.fromCharCode(65 +i);
    addressRow.setAttribute("class", "address-row")
    AddressRowcont.appendChild(addressRow);


}

for(let i = 0; i < rows; i++){
    let rowcont = document.createElement("div");
    rowcont.setAttribute("class" , "row-cont")
    for(let j = 0; j < cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell"); 
        cell.setAttribute("contentEditable" , "true");
        cell.setAttribute("spellcheck" , "false");
        cell.setAttribute("Row_id" , i);
        cell.setAttribute("Col_id" , j);
        rowcont.appendChild(cell);
        addlistnerforAdressBarDisplay(cell, i, j);
    }
    cellCont.appendChild(rowcont);

}

function addlistnerforAdressBarDisplay(cell, i, j){
    cell.addEventListener("click" , (e)=> {
        let rowID = i + 1;
        let colID =  String.fromCharCode(65 +j);
        addressBar.value = `${colID}${rowID}`;

    })
}

