window.onload = loadStuff;

let houseTypes = ["Bungalow","Country House","Detached","Semi Detached","Terraced","Flat"]
let coverTypes = ["Owner occupied","Holiday","Rental"]
let totalCost = 0, valueA = 0, valueB = 0, valueC = 0;
let total = document.getElementById("runningTotal")
const date = new Date().getFullYear();

function loadStuff(){
    document.getElementById("runningTotal").value = totalCost;
    let option = document.createElement("OPTION");
    let houseList = document.getElementById("houseType");
    let coverList = document.getElementById("coverType");
    let contentsCoverList = document.getElementById("contentsCover");
    let buildingCoverList = document.getElementById("buildingCover");

    for (let i=0;i<houseTypes.length;i++){
        option = document.createElement("OPTION");
        option.text = houseTypes[i];
        option.value = houseTypes[i];
        houseList.options.add(option);
    }
    for (let i=0;i<coverTypes.length;i++){
        option = document.createElement("OPTION");
        option.text = coverTypes[i];
        option.value = coverTypes[i];
        coverList.options.add(option);
    }
    for (let i=1;i<11;i++){
        option = document.createElement("OPTION");
        option.text = i*5000;
        option.value = i*5000;
        contentsCoverList.options.add(option);
    }
    for (let i=1;i<11;i++){
        option = document.createElement("OPTION");
        option.text = i*100000;
        option.value = i*100000;
        buildingCoverList.options.add(option);
    }

    document.getElementById("calculate").addEventListener("click",validateAndUpdate)
    return true;
}
function validateAndUpdate(){
    let ownerShip = false;

    if (document.getElementById("Tenet").checked) {
        valueA = 50;
        ownerShip = true;
    }
    else if (document.getElementById("Owner").checked) {
        valueA = 100;
        ownerShip = true;
    }
    else{
        ownerShip = false;
    }

    if (document.getElementById("name").value !== null && (document.getElementById("name").value).length
        < 10 && (document.getElementById("name").value).length > 0) {
        if (ownerShip === true) {
            if (isNumerical(((document.getElementById("numOfRooms").value).toString())) &&
                document.getElementById("numOfRooms").value.toString().length > 0) {
                document.getElementById("runningTotal").value = (valueA + valueB + valueC).toString();
            } else {
                window.alert("Error, number of rooms entered is invalid");
                document.getElementById("runningTotal").value = 0;
            }
        } else {
            window.alert("Error enter Tenant or Owner");
            document.getElementById("runningTotal").value = 0;
        }
    }
    else
        window.alert("Name cannot be empty or greater than 10");
}

function isNumerical(String){
    let valid = true;
    for (let i = 0;i<String.length;i++) {
        if (isNaN(String.charAt(i))) {
            valid = false;
            break;
        }
    }
    return valid;
}
function validEmail(String){
    let atSymbols = 0;
    for (let i = 0;i<String.length;i++) {
        if (String.charAt(i) === "@") {
            atSymbols++;
        }
    }

}
