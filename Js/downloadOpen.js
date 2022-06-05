let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

// Download Task
downloadBtn.addEventListener("click", (e) => {
    let jsonData = JSON.stringify([sheetDP, graphCompenentMatrix]);
    let file = new Blob([jsonData], { type: "application/json" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})

// Open task (upload)
openBtn.addEventListener("click", (e) => {
    // Opens file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            // Basic sheet with default data will be created
            sheetAdd.click();

            // SheetDB, graphComponent
            sheetDP = readSheetData[0];
            graphCompenentMatrix = readSheetData[1];

            collectorSheetDP[collectorSheetDP.length-1] = sheetDP;
            collectedGraphComponentMatrix[colletedgraphCompenentMatrix.length-1] = graphComponentMatrix;

            handleSheetProperties();
        })
    })
})