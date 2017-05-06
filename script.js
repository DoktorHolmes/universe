document.getElementById("locationStatus").innerHTML = "Loading..."

function makeStarName()
{
    var txt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 5; i++ )
        txt += possible.charAt(Math.random() * possible.length);

    return txt;
}

var player = function() {
	this.locationPlanet = null;
	this.locationSystem = null;
	this.x = 0;
	this.y = 0;
}

var tile = function(){
	this.parentObj = new planet();
	this.biome = "Wasteland";
	this.x = 0;
	this.y = 0;
	this.structures = [];
	this.generateStructures = function(){
		maxStructures = Math.floor(Math.random() * (12-1) + 1);
		possibleStructures = ["villageruins", "wildlife", "mushroomtrees", "abandonedcamp"]
		if(maxStructures > 11){
			structures.push(possibleStructures[Math.floor(Math.random() * maxStructures.length)]);
		}
			
	}
}

var planet = function () {
    this.temperature = 16;
    this.atmosphere = false;
	this.atmosphereColor = "Blue";
    this.name = "Earth";
    this.moons = [];
	this.biomes = ["a field", "a savannah", "a lake", "woods", "a tundra"]
	this.weathers = ["clear", "rainy", "cloudy", "foggy"]
	this.weather = "clear";
	this.size = 10;
	this.dayLength = 24;
	this.time = 12;
	this.tiles = [];
	this.parentObj = new starSystem();
	this.generateTiles = function(){
		
		for(var i1 = 0; i1 <= this.size; i1++){
			tileArray = new Array();
			for(var i2 = 0; i2 <= this.size; i2++){
				
				newTile = new tile();
				newTile.x = i1;
				newTile.y = i2;
				newTile.biome = this.biomes[Math.floor(Math.random() * (this.biomes.length - 1))];
				
				tileArray.push(newTile);
				
				console.log("Created tile with " + newTile.biome + " at " + i1.toString() + ", " + i2.toString() + " on planet " + this.name);
				
			}
			this.tiles.splice(i1, 0, tileArray);
			
		}
	}
	console.log(this.tiles);
	this.generate = function(){
        this.temperature = Math.random() * (12 - 1) + 1;
		this.size = Math.floor(Math.random() * (18 - 6) + 6);
        atmosRand = Math.random() * (9 - 1) + 1;
        if(atmosRand > 6){
            this.atmosphere = true;
}
        else{
            this.atmosphere = false;
			
			}
		this.dayLength = Math.floor(Math.random() * (32 - 8) + 8);
		
		this.time = Math.floor(Math.random() * (this.dayLength - 1) + 1)
		
}

     /*this.generateMoons = function(){
        this.numMoons = Math.floor(Math.random * 4);
        index = 1;
        for (i = 0; i < this.numMoons;){
        moon = new planet();
        moon.generate();
        index += 1;
        moon.name = this.name + "-" + String.fromCharCode(index);
        this.moons.push(moon);
        console.log("Moon of " + this.name + ": " + moon.name);
        console.log(moon.name + " temperature in Celsius: " + moon.temperature.toString());
        console.log(moon.name + " has atmosphere: " + moon.atmosphere);
}*/
};

var starSystem = function () {
    this.numPlanets = 0;
    this.name = "Sol";
    this.planets = [];
    

this.generate = function(){
    this.numPlanets = Math.random() * (7 - 1) + 1;
    index = 0;
	this.name = makeStarName();
	console.log("Generating planets for Solar System " + this.name + ": ")
    for(var i = 0; i < this.numPlanets; i++){
        planet1 = new planet();
        planet1.generate();
        index += 1;
        planet1.name = this.name + "-" + index.toString();
        //planet1.generateMoons();
		planet1.parentObj = this;
		planet1.generateTiles();
        console.log("Planet: " + planet1.name);
console.log(planet.name + " temperature in Celsius: " + planet1.temperature.toString());
        console.log(planet.name + " has atmosphere: " + planet1.atmosphere);
        this.planets.push(planet1);
		//TEST
}
}
};

var galaxySize = 10;
var starSystems = [];
function generateGalaxy(size){
    for(var i = 0; i < size; i++){
        system = new starSystem();
        system.generate();
        console.log(system.name + "System");
        starSystems.push(system);
		if(i < galaxySize){
			setTimeout(generateGalaxy, 10)
		}
}
console.log("Generation complete! Placing player...")

}

generateGalaxy(galaxySize);

function addToDialog(textToAdd){
	dialogBox.innerHTML = dialogBox.innerHTML + textToAdd;
}

function showDialog(system, plan, x, y){
	dialogBox = document.getElementById("dialogbox");
	coordsBox = document.getElementById("coordsBox");
	dialogBox.innerHTML = "";
	locationStatus = document.getElementById("locationStatus");
	coordsBox.innerHTML = x + ", " + y;
	locationStatus.innerHTML = "On the planet " + plan.name + ", in the " + system.name + " system."
	if(plan.tiles[x][y].biome == "woods"){
		addToDialog("You are in a shaded forest of evergreen trees.  No sound can be heard but the wind rustling through the trees. ")
	}
	
	else if(plan.tiles[x][y].biome == "a tundra"){
		addToDialog("You are in a desolate tundra.  Snow blankets the ground here, and sparse, dying trees dot the landscape.  ")
	}
	else if(plan.tiles[x][y].biome == "a field"){
		addToDialog("You are in a grassy field, with the occasional flower poking out of the dirt.  Life perseveres, even here.  ")
	}
	else if(plan.tiles[x][y].biome == "a savannah"){
		addToDialog("You are in a savannah, though the beastly creatures who usually inhabit this sort of place have long since moved on.  ")
	}
	else if(plan.tiles[x][y].biome == "a lake"){
		addToDialog("You are on the shore of a peaceful lake, surrounded by evergreen trees.  The only sound is the lapping of the water against the shore.  ")
	}
	else if(plan.tiles[x][y].biome == "wasteland"){
		addToDialog("The land here is made up of miles of nothing but barren rock.  ")
	}
	else if(plan.tiles[x][y].biome == "wasteland cliff"){
		addToDialog("You are standing on the edge of .  ")
	}
	if(plan.tiles[x][y].weather != "clear"){
		addToDialog("It is " + plan.weather + " here.  ")
	}
	else{
		addToDialog("The sky is " + plan.weather + " here.  ")
	}
	if(plan.tiles[x][y].structures.length > 0){
	for(var i = 0; i < plan.tiles[x][y].structures.length; i++){
		if(plan.tiles[x][y].structures[i] == "crudehouse"){
			addToDialog("Your house is here, a lonely refuge amongst the endless void.  ")
		}
		if(plan.tiles[x][y].structures[i] == "campfire"){
			addToDialog("A warm campfire keeps the cold at bay.  ")
		}
		if(plan.tiles[x][y].structures[i] == "villageruins"){
			addToDialog("The ruins of an ancient village sit here, abandoned by their inhabitants centuries ago.  ")
		}
		if(plan.tiles[x][y].structures[i] == "wildlife"){
			addToDialog("Small alien animals dart around this place.  You welcome the company.  ")
		}
		if(plan.tiles[x][y].structures[i] == "abandonedcamp"){
			addToDialog("An abandoned campsite rests here, its denizens gone without a trace.  Minus the campsite itself, of course.  ")
		}
		if(plan.tiles[x][y].structures[i] == "mushroomtrees"){
			addToDialog("A small forest of tree-sized mushrooms has grown here.  They're somewhere on every planet, though nobody knows how they spread across the void.  ")
		}
	}
	}
	
}

function changeWeather(plan, x, y){
	plan.weather = plan.weathers[Math.floor(Math.random() * (plan.weathers.length) + 0)];
	dialogBox = document.getElementById("dialogbox");
	
}


player1 = new player();
player1.locationSystem = starSystems[Math.floor(Math.random() * (starSystems.length, 0) + 0)];
player1.locationPlanet = player1.locationSystem.planets[Math.floor(Math.random() * (player1.locationSystem.planets.length, 0) + 0)];
player1.x = Math.floor(Math.random() * (player1.locationPlanet.size, 0));
player1.y = Math.floor(Math.random() * (player1.locationPlanet.size, 0));


function calculatePlayerHour(){
	for(var i1 = 0; i1 < starSystems.length; i1++){
		for(var i2 = 0; i2 < starSystems[i1].planets.length; i2++){
			//var plan = starSystems[i1].planets[i2]
			starSystems[i1].planets[i2].time++;
			if(starSystems[i1].planets[i2].time >= starSystems[i1].planets[i2].dayLength - 1){
				starSystems[i1].planets[i2].time = 0;
			}
			
		}
	}
	addToDialog("The time is "+ player1.locationPlanet.time + "00 hours.  ");
	
	if(player1.locationPlanet.time == 0){
		addToDialog("Midnight has fallen.  ")
	}
	else if(player1.locationPlanet.time == Math.floor(player1.locationPlanet.dayLength / 2)){
		addToDialog("It is noon.  ")
	}
	else if(player1.locationPlanet.time == Math.floor(player1.locationPlanet.dayLength - (player1.locationPlanet.dayLength / 4))){
		addToDialog("The sun sinks below the horizon.  ")
	}
	
	else if(player1.locationPlanet.time == Math.floor(0 + (player1.locationPlanet.dayLength / 4))){
		addToDialog("The sun rises over the horizon.  ")
	}
	
	
}


function updateDialog(){
	showDialog(player1.locationSystem, player1.locationPlanet, player1.x, player1.y);
}

function populatePlanetDropdown(){
	var dropdown = document.getElementById("planetDropdown")
	//console.log(player1.locationSystem);
	for(var i = 0; i < player1.locationSystem.planets.length; i++){
		var plan = player1.locationSystem.planets[i];
		var planName = plan.name;
		var planOption = document.createElement("option");
		planOption.text = planName;
		dropdown.add(planOption);
	}
}

updateDialog();
populatePlanetDropdown();

function warpToPlanet(){
	var dropdown = document.getElementById("planetDropdown");
	player1.locationPlanet = player1.locationSystem.planets[dropdown.selectedIndex];
	player1.x = 0;
	player1.y = 0;
	updateDialog();
}

function goNorth(){
	if(player1.y < player1.locationPlanet.size){
		player1.y ++;
		updateDialog();
		calculatePlayerHour();
	}
	else{
		player1.y = 0;
	}
}

function goSouth(){
	
	if(player1.y > 0){
		player1.y --;
		updateDialog();
		calculatePlayerHour();
	}
	else{
		player1.y = player1.locationPlanet.size;
	}
}

function goWest(){
	if(player1.x > 0){
		player1.x --;
		updateDialog();
		calculatePlayerHour();
	}
	else{
		player1.x = player1.locationPlanet.size;
	}
}


function goEast(){
	if(player1.x < player1.locationPlanet.size){
		player1.x ++;
		updateDialog();
		calculatePlayerHour();
	}
	else{
		player1.x = 0;
	}
}

function wait(){
	updateDialog();
	calculatePlayerHour();
}

inputBox = document.getElementById("commandBox");
inputBox.onkeydown = function(e){
   if(e.keyCode == 13){
	   checkInput(inputBox.value);
     }
   }
function checkInput(val){
	val = val.toLowerCase();
	if(val == "build house"){
		player1.locationPlanet.tiles[player1.x][player1.y].structures.push("crudehouse");
	}
	if(val == "build campfire"){
		player1.locationPlanet.tiles[player1.x][player1.y].structures.push("campfire");
	}
	inputBox.value = "";
	updateDialog();
}

   
//REMOVE ME

