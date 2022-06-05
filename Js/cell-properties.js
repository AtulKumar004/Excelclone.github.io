

let collectorSheetDP = []; // containt all sheetDP
let sheetDP = [];
// for(let i = 0; i < rows; i++){
//     let sheetRow = [];
//     for(let j = 0; j < cols; j++){   
//         let cellprop = {
//             bold : false,
//             italic : false,
//             underline : false,
//             alignment : "left",
//             fontsize : "14",
//             fontFamily : "monospace",
//             fontColor : "#000000",
//             BGcolor : "white",
//             value : "" ,
//             formula: "",
//             children : []

//         }
//         sheetRow.push(cellprop);
//     }
//     sheetDP.push(sheetRow);

// }

{
    let sheetAdd = document.querySelector(".sheet-add-icon");
    sheetAdd.click();
}

let activeColor = "#d1d8e0";
let InactiveColor = "#ecf0f1";

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let LeftAlignment = alignment[0];
let CenterAlignment = alignment[1];
let RightAlignment = alignment[2];
let FontSize = document.querySelector(".font-size-prop");
let FontFamily = document.querySelector(".font-Family-prop");
let FontColor = document.querySelector(".font-color");
let BGColor = document.querySelector(".BG-color");


// Application of Two way binding
// Attach property listeners



bold.addEventListener("click" , (e) =>{
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.bold = !cellProp.bold;
    Clickcell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColor: InactiveColor;

});

italic.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
   
    // Modification
    cellProp.italic = !cellProp.italic;
    Clickcell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColor: InactiveColor;

});




underline.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.underline = !cellProp.underline;
    Clickcell.style.textDecorationLine = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColor: InactiveColor;

});

FontFamily.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.fontFamily = FontFamily.value;
    Clickcell.style.fontFamily = cellProp.fontFamily;
    FontFamily.value = cellProp.fontFamily;

});

FontSize.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.fontsize = FontSize.value;
    Clickcell.style.fontSize = cellProp.fontsize + "px";
    FontSize.value = cellProp.fontsize;

});

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click" , (e)=>{
        let address = addressBar.value;
        let [Clickcell , cellProp] = activeCell(address);
        let AlignValue  = alignElem.classList[0];
        cellProp.alignment = AlignValue; // data change
        Clickcell.style.textAlign = cellProp.alignment;
        
        switch(AlignValue){
            case "left" :
                LeftAlignment.style.backgroundColor = activeColor; 
                CenterAlignment.style.backgroundColor = InactiveColor; 
                RightAlignment.style.backgroundColor = InactiveColor; 

                break
            case "center" :
                LeftAlignment.style.backgroundColor = InactiveColor; 
                CenterAlignment.style.backgroundColor = activeColor; 
                RightAlignment.style.backgroundColor = InactiveColor;
                
                break  
                
            case "right":
                LeftAlignment.style.backgroundColor = InactiveColor; 
                CenterAlignment.style.backgroundColor = InactiveColor; 
                RightAlignment.style.backgroundColor = activeColor;
                
                break    
        }

        


            

        

    });
});



FontColor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.fontColor = FontColor.value; // data change
    Clickcell.style.color = cellProp.fontColor ;
    FontColor.value = cellProp.fontColor;

});

BGColor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [Clickcell , cellProp] = activeCell(address);
    
    // Modification
    cellProp.BGcolor = BGColor.value; // data change
    Clickcell.style.backgroundColor = cellProp.BGcolor ;
    BGColor.value = cellProp.BGcolor;

});






let Allcells = document.querySelectorAll(".cell");
for(let i = 0; i< Allcells.length; i++){
    addListenerToAttachCellProperties(Allcells[i]);
}



function activeCell(address){
    let [rid , cid ] = decordRIDCIDfromAdress(address);
    let Clickcell = document.querySelector(`.cell[row_id = "${rid}"][col_id = "${cid}"]`);
    let cellProp = sheetDP[rid][cid];
    return [Clickcell , cellProp];
}
function decordRIDCIDfromAdress(address){
    // adress "A1"
    let rid = Number(address.slice(1) - 1); //"1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65 ; 
    return [rid , cid];
   


}



function addListenerToAttachCellProperties(Clickcell){
    Clickcell.addEventListener("click" , (e)=> {
        let address = addressBar.value;
        let [rid , cid] = decordRIDCIDfromAdress(address);
        let cellProp = sheetDP[rid][cid];


        // Apply all properties = 
        Clickcell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        Clickcell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        Clickcell.style.textDecorationLine = cellProp.underline ? "underline" : "none";
        Clickcell.style.fontFamily = cellProp.fontFamily;
        Clickcell.style.fontSize = cellProp.fontsize + "px";
        Clickcell.style.textAlign = cellProp.alignment;
        Clickcell.style.color = cellProp.fontColor ;
        Clickcell.style.backgroundColor = cellProp.BGcolor ;



        // UI change in Properties container
        bold.style.backgroundColor = cellProp.bold ? activeColor: InactiveColor;
        italic.style.backgroundColor = cellProp.italic ? activeColor: InactiveColor;
        underline.style.backgroundColor = cellProp.underline ? activeColor: InactiveColor;
        FontFamily.value = cellProp.fontFamily;
        FontSize.value = cellProp.fontsize;
        switch(cellProp.alignment){
            case "left" :
                LeftAlignment.style.backgroundColor = activeColor; 
                CenterAlignment.style.backgroundColor = InactiveColor; 
                RightAlignment.style.backgroundColor = InactiveColor; 

                break
            case "center" :
                LeftAlignment.style.backgroundColor = InactiveColor; 
                CenterAlignment.style.backgroundColor = activeColor; 
                RightAlignment.style.backgroundColor = InactiveColor;
                
                break  
                
            case "right":
                LeftAlignment.style.backgroundColor = InactiveColor; 
                CenterAlignment.style.backgroundColor = InactiveColor; 
                RightAlignment.style.backgroundColor = activeColor;
                
                break    
        }
        FontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGcolor;
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula; 
        Clickcell.innerText = cellProp.value;
    })
}



