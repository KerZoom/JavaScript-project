window.onload = loadStuff;

let houseTypes = ["Bungalow","Country House","Detached","Semi Detached","Terraced","Flat"]
let coverTypes = ["Owner occupied","Holiday","Rental"]
let ownerShipValue = 0, bedroomValue = 0, areaValue = 0, yearValue = 0, propertyTypeValue = 0,
    coverValue = 0, contentsValue = 0, buildingValue = 0, yearsFreeValue = 0;
const currentDate = new Date().getFullYear();
let reset = false;
function loadStuff(){

    setInterval("resetPage()", 20000);
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
    document.getElementById("helpBox").style.visibility = "hidden";
    document.getElementById("calculate").addEventListener("click",validateAndUpdate)
    document.getElementById("name").addEventListener("mouseover", function(){help("name")});
    document.getElementById("email").addEventListener("mouseover",function() {help("email")});
    document.getElementById("ownerLabel").addEventListener("mouseover",function(){help("owner")})
    document.getElementById("numOfRooms").addEventListener("mouseover",function() {help("rooms")})
    document.getElementById("yearBuilt").addEventListener("mouseover",function() {help("yearBuilt")})
    document.getElementById("dublinLabel").addEventListener("mouseover",function() {help("dublin")})
    document.getElementById("houseType").addEventListener("mouseover",function() {help("houseType")})
    document.getElementById("coverType").addEventListener("mouseover",function() {help("coverType")})
    document.getElementById("contentsCover").addEventListener("mouseover",function() {help("contentsCover")})
    document.getElementById("buildingCover").addEventListener("mouseover",function() {help("buildingCover")})
    document.getElementById("yearsClaimsFree").addEventListener("mouseover",function() {help("yearsClaims")})
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

    if (!reset) {
        if (userName.value !== null && userName.value.length < 20 &&
            userName.value.length > 0) {
            nameLabel.style.color = '#000000';
            if (validEmail(userEmail.value)) {
                emailLabel.style.color = '#000000';
                if (ownerShip) {
                    ownerLabel.style.color = '#000000';
                    if (isNumerical(numRooms.value).toString() && numRooms.value.toString().length > 0 &&
                        numRooms.value < 200 && numRooms.value > 0) {
                        roomsLabel.style.color = '#000000';
                        bedroomValue = 10 * numRooms.value;
                        if (validYear(year.value.toString())) {
                            yearBuiltLabel.style.color = '#000000';
                            yearValue = 10 * (currentDate - year.value);
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
                                } else {
                                    window.alert("Error, you can't have more years free than the age of the house and it can't be negative");
                                    freeYearsLabel.style.color = '#ff0000';
                                    freeYearsLabel.focus();
                                }
                            } else {
                                window.alert("Error, you must select if the property is within dublin or not");
                                dublinLabel.style.color = '#ff0000';
                                dublinLabel.focus();
                            }
                        } else {
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
            } else {
                window.alert("Error email cannot be empty, has to have an @ symbol and must end with .com");
                emailLabel.style.color = '#ff0000';
                emailLabel.focus();
            }
        } else {
            window.alert("Name cannot be empty or greater than 10 or less than 1");
            nameLabel.style.color = '#ff0000';
            nameLabel.focus();
        }
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
    if (!reset) {
        let helpBox = document.getElementById("helpBox");
        switch (String) {
            case("name"):
                helpBox.innerText = "Please enter a name,\nThe name must be 1 or more characters and less than 20" +
                    "\nThis field cannot be left blank";
                helpBox.style.visibility = "visible";
                break;
            case("email"):
                helpBox.innerText = "Please enter an email,\nThe email must include only 1 @ symbol and must end with .com" +
                    "\nThis field cannot be left blank";
                helpBox.style.visibility = "visible";
                break;
            case("owner"):
                helpBox.innerText = "Please select if you are a tenant or the owner of the property" +
                    "\nThis field cannot be left blank";
                helpBox.style.visibility = "visible";
                break;
            case("yearBuilt"):
                helpBox.innerText = "Please enter the year the house was built, the year must be before the current year " +
                    "and must be 4 digits" +
                    "\nThis field cannot be left blank";
                helpBox.style.visibility = "visible";
                break;
            case("rooms"):
                helpBox.innerText = "Please enter how many rooms the building has, it must be greater than 1 and less than" +
                    " 200\nThis field cannot be left blank";
                helpBox.style.visibility = "visible";
                break;
            case("coverType"):
                helpBox.innerText = "Please select what type of cover you want";
                helpBox.style.visibility = "visible";
                break;
            case("dublin"):
                helpBox.innerText = "Please select if the house is located within Dublin or outside Dublin";
                helpBox.style.visibility = "visible";
                break;
            case("contentsCover"):
                helpBox.innerText = "Please select how much value worth of cover you want for the houses contents";
                helpBox.style.visibility = "visible";
                break;
            case("buildingCover"):
                helpBox.innerText = "Please select how much value worth of cover you want for the house itself";
                helpBox.style.visibility = "visible";
                break;
            case("yearsClaims"):
                helpBox.innerText = "Please enter how many years of no claims you have accumulated, it must be 0 or higher" +
                    " and cannot be greater than the age of the house itself" +
                    "\nLeaving this field blank indicates 0 years of no claims";
                helpBox.style.visibility = "visible";
                break;
            case("houseType"):
                helpBox.innerText = "Please enter the type of house you wish to insure";
                helpBox.style.visibility = "visible";
                break;
            default:
                helpBox.innerText = "";
        }
    }
}
function resetPage(){
    reset = true;
    document.getElementsByClassName("input").readOnly = true;
    let helpBox = document.getElementById("helpBox");
    helpBox.innerText= "You took longer than 4 minutes, page has to be reset, please click the button below to reset\n\n"
    helpBox.style.visibility = "visible"
    let resetButton = document.createElement("BUTTON");
    resetButton.innerText = "Click me to reset page"
    resetButton.addEventListener("click",function(){
        location.reload();
    })
    helpBox.append(resetButton);
}
