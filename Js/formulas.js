for(let i = 0; i < rows;i++){
    for(let j = 0; j < cols; j++){
        let cell =  document.querySelector(`.cell[row_id = "${i}"][col_id = "${j}"]`);
        cell.addEventListener("blur" , (e) => {
            let address = addressBar.value;
            let [ Cell , cellProp] = activeCell(address);
            let enterdata = Cell.innerText;
            if(enterdata === cellProp.value) {
                return;
            }
           
            cellProp.value = enterdata;
            // data modifies remove P -C relation , formula empty , update children with new hardcore value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";

            updateChildrenCell(address);
            // console.log(cellProp);

        

            
            
        })
    }
}



let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown" , async (e) => {

    if(e.key === "Enter" && formulaBar.value ){
        let address = addressBar.value;
        let [ Cell, CellProp] = activeCell(address); 
        if(formulaBar.value !== CellProp.formula){
            removeChildFromParent(CellProp.formula);

        }
        
        addChildToGraphCompenentMatrix(formulaBar.value  , address);
        let cyclicresponce = isGraphCyclic(graphCompenentMatrix);
        if(cyclicresponce ){
            //alert("Your formula is cyclic");
            let response = confirm("Your formula is cyclic, Do you want to trace ? ");
            while(response === true){
                //Keep on tracking color until user is setisfied
                await isGraphCyclicTracePath(graphCompenentMatrix , cyclicresponce );
                response = confirm("Your formula is cyclic, Do you want to trace ? ");



            }
            removeChildFromGraphComponenet(formulaBar.value);
            return;

        }
        
        console.log(graphCompenentMatrix);


        
        let evaluatedValue =  evaluatedFormula(formulaBar.value );
        
        setUIAndCellProp(evaluatedValue, formulaBar.value ,address );
        addChildToParent(formulaBar.value);
        
    
        updateChildrenCell(address);
    }


})
function addChildToParent(formula){
    let Childaddress = addressBar.value;
    let encoderFormula = formula.split(" ");
    for(let i = 0; i< encoderFormula.length; i++){
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<= 90){
            let [ ParentCell, ParentCellProp] = activeCell(encoderFormula[i]); 
            ParentCellProp.children.push(Childaddress);
            
           
        
        }
        

    }

}

function addChildToGraphCompenentMatrix(formula , childaddress){
    
    let [crid , ccid] = decordRIDCIDfromAdress(childaddress);
    let encoderFormula = formula.split(" ");
    for(let i = 0; i < encoderFormula.length; i++ ){
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid , pcid] = decordRIDCIDfromAdress(encoderFormula[i]);
            graphCompenentMatrix[prid][pcid].push([crid , ccid]);

        }
    }
    

}



function removeChildFromGraphComponenet(formula){
    let encoderFormula = formula.split(" ");
    for(let i = 0; i < encoderFormula.length; i++ ){
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid , pcid] = decordRIDCIDfromAdress(encoderFormula[i]);
            graphCompenentMatrix[prid][pcid].pop();

        }
    }

}

function evaluatedFormula(formula){
    let encoderFormula = formula.split(" ");
    for(let i = 0; i< encoderFormula.length; i++){
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<= 90){
            let [ Cell, CellProp] = activeCell(encoderFormula[i]);
            encoderFormula[i] = CellProp.value;
        }
    }
    let docoderFormula = encoderFormula.join(" ");

    return eval(docoderFormula);
  }


function setUIAndCellProp(evaluatedValue , inputformula , address){
    
    let [ Cell , cellProp] = activeCell(address);
    // UI update
    Cell.innerText = evaluatedValue;
    // DB Update
    cellProp.value = evaluatedValue;
    cellProp.formula = inputformula;
    


}

function updateChildrenCell(parentAdress){
    let [ ParentCell, ParentCellProp] = activeCell(parentAdress);
    let children = ParentCellProp.children;
    for(let i = 0; i< children.length; i++){
        let childAdress =children[i];
        let [ ChildCell, ChildCellProp] = activeCell(childAdress);
        let childformula = ChildCellProp.formula;
        let evaluatedValue =  evaluatedFormula(childformula);
        setUIAndCellProp(evaluatedValue ,childformula ,  childAdress)
        updateChildrenCell(childAdress);
        
    }
    
}


function removeChildFromParent(formula){
    let Childaddress = addressBar.value;
    let encoderFormula = formula.split(" ");
    for(let i = 0; i< encoderFormula.length; i++){
        let asciiValue = encoderFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<= 90){
            let [ ParentCell, ParentCellProp] = activeCell(encoderFormula[i]); 
            let idx = ParentCellProp.children.indexOf(Childaddress);
            ParentCellProp.children.splice(idx , 1); 
        }
    }
            






}