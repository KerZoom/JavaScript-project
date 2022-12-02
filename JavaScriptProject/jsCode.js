window.onload = loadStuff;

let houseTypes = ["Bungalow","Country House","Detached","Semi Detached","Terraced","Flat"]
let coverTypes = ["Owner occupied","Holiday","Rental"]
let totalCost = 0, ownerShipValue = 0, bedroomValue = 0, areaValue = 0, yearValue = 0, propertyTypeValue = 0,
    coverValue = 0, contentsValue = 0, buildingValue = 0, yearsFreeValue = 0;
const currentDate = new Date().getFullYear();

function loadStuff(){
    total = document.getElementById("runningTotal")
    total.value = 0;
    yearsFree = document.getElementById("yearsClaimsFree");
    yearsFree.value = 0;
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
    total.value = 0;
    let ownerShip = false, area = false;
    let owner = "", dublin = "";

    if (document.getElementById("Tenet").checked) {
        ownerShipValue = 50;
        owner = "Tenet"
        ownerShip = true;
    }
    else if (document.getElementById("Owner").checked) {
        ownerShipValue = 100;
        owner = "Owner"
        ownerShip = true;
    }

    if (document.getElementById("Dublin").checked) {
        areaValue = 100;
        dublin = "Dublin"
        area = true;
    }
    else if (document.getElementById("OutsideDublin").checked) {
        areaValue = 50;
        dublin = "Outside Dublin"
        area = true;
    }

    // Input fields

    let userName = document.getElementById("name");
    let userEmail = document.getElementById("email");
    let numRooms = document.getElementById("numOfRooms");
    let year = document.getElementById("yearBuilt");
    let house = document.getElementById("houseType");
    let cover = document.getElementById("coverType");

    let contents = document.getElementById("contentsCover");
    contentsValue = contents.options[contents.selectedIndex].text / 5000 * 10

    let building = document.getElementById("buildingCover");
    buildingValue = building.options[building.selectedIndex].text / 100000 * 20

    switch (house.selectedIndex){
        case(0):
            propertyTypeValue = 75;
            break;
        case(1):
            propertyTypeValue = 100;
            break;
        case(2):
            propertyTypeValue = 50;
            break;
        case(3):
            propertyTypeValue = 40;
            break;
        case(4):
            propertyTypeValue = 30;
            break;
        case(5):
            propertyTypeValue = 20;
            break;
    }
    switch (cover.selectedIndex) {
        case(0):
            coverValue = 50;
            break;
        case(1):
            coverValue = 60;
            break;
        case(2):
            coverValue = 70;
            break;
    }

    // Labels
    let nameLabel = document.getElementById("nameLabel");
    let emailLabel = document.getElementById("emailLabel");
    let ownerLabel = document.getElementById("ownerLabel");
    let roomsLabel = document.getElementById("roomsLabel");
    let yearBuiltLabel = document.getElementById("yearBuiltLabel");
    let dublinLabel = document.getElementById("dublinLabel");
    let freeYearsLabel = document.getElementById("freeYearsLabel");

    if (userName.value !== null && userName.value.length < 20 &&
        userName.value.length > 0) {
        nameLabel.style.color = '#000000';
        if (validEmail(userEmail.value)) {
            emailLabel.style.color = '#000000';
            if (ownerShip) {
                ownerLabel.style.color = '#000000';
                if (isNumerical(numRooms.value).toString() && numRooms.value.toString().length > 0 &&
                    numRooms.value < 50 && numRooms.value > 0) {
                    roomsLabel.style.color = '#000000';
                    bedroomValue = 10 * numRooms.value;
                    if (validYear(year.value.toString())) {
                        yearBuiltLabel.style.color = '#000000';
                        yearValue = 10 * (currentDate-year.value);
                        if (area) {
                            dublinLabel.style.color = '#000000';
                            if (validYearsFree(yearsFree, year)) {
                                freeYearsLabel.style.color = '#000000';
                                total.value = (ownerShipValue + bedroomValue + areaValue + yearValue + propertyTypeValue +
                                    coverValue + contentsValue + buildingValue - yearsFreeValue).toString();

                                window.alert("Name: " + userName.value + "\nEmail: " + userEmail.value + "\nOwner/Tenet: " +
                                    owner + "\nNumber of rooms: " + numRooms.value + "\nDublin/Outside Dublin: " + dublin +
                                    "\nHouse-type: " + house.options[house.selectedIndex].text + "\nCover type: " +
                                    cover.options[cover.selectedIndex].text + "\nContents Cover: "
                                    + contents.options[contents.selectedIndex].text + "\nBuilding Cover: " +
                                    building.options[building.selectedIndex].text + "\nYears claims free: " +
                                    yearsFree.value + "\n\nPrice quote: " + total.value)
                            }
                            else{
                                window.alert("Error, you can't have more years free than the age of the house and it can't be negative");
                                freeYearsLabel.style.color = '#ff0000';
                                freeYearsLabel.focus();
                            }
                        }
                        else{
                            window.alert("Error, you must select if the property is within dublin or not");
                            dublinLabel.style.color = '#ff0000';
                            dublinLabel.focus();
                        }
                    }
                    else{
                        window.alert("Error, house must be at least 1 year older than the current date and has to be 4 digits");
                        yearBuiltLabel.style.color = '#ff0000';
                        yearBuiltLabel.focus();
                    }
                } else {
                    window.alert("Error, number of rooms entered is invalid, cannot be a number or greater than 50 or less than 1");
                    roomsLabel.style.color = '#ff0000';
                    roomsLabel.focus();
                }
            } else {
                window.alert("Error enter Tenant or Owner");
                ownerLabel.style.color = '#ff0000';
                ownerLabel.focus();
            }
        }
        else{
            window.alert("Error email cannot be empty, has to have an @ symbol and must end with .com");
            emailLabel.style.color = '#ff0000';
            emailLabel.focus();
        }
    }
    else {
        window.alert("Name cannot be empty or greater than 10 or less than 1");
        nameLabel.style.color = '#ff0000';
        nameLabel.focus();
    }
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
    let validTopLevelDomain = false;
    for (let i = 0;i<String.length;i++) {
        if (String.charAt(i) === "@") {
            atSymbols++;
        }
    }
    if (String.charAt(String.length-1)==='m' && String.charAt(String.length-2)==='o' && String.charAt(String.length-3)==='c' &&
        String.charAt(String.length-4)==='.'){
        validTopLevelDomain = true;
    }
    return atSymbols === 1 && validTopLevelDomain;
}
function validYear(date){
    if (date.length === 4 && isNumerical(date)){
        if (date < currentDate.toString()){
            return true;
        }
    }
}
function validYearsFree(years, year){
    if (years.value <= (currentDate - year.value) && years.value >= 0){
        return true;
    }
}
function help(String){
    console.log("works");
    let helpBox = document.getElementById("helpBox");
    switch (String){
        case("userName"):
            helpBox.style.visibility = "visible";
            break;
    }
}
