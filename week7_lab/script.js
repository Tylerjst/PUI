function redPanda(name, age){
	this.name = name;
	this.age = age;
	this.type = "Red Panda";
	this.image = "anImageOfMyAnimal.jpg";
}

function penguin(name, age){
	this.name = name;
	this.age = age;
	this.type = "Penguin";
	this.image = "anImageOfMyAnimal.jpg";
}

function doubleWattledCassowary(name, age){
	this.name = name;
	this.age = age;
	this.type = "Double-Wattled Cassowary";
	this.image = "anImageOfMyAnimal.jpg";
}

var animal = [new redPanda("Cornelius", 22), new penguin("Giuseppe", 4), new doubleWattledCassowary("Fred", 99)];

var animalNames = ["Angelina", "Frakenstein", "Guadalquivir"];

function generateRandomIndex(maxIndex){

	return Math.floor(Math.random() * maxIndex);

}

function generateRandomName(){

	var randomIndex = generateRandomIndex(animalNames.length);
	return animalNames[randomIndex];

}

function generateRandomAge(){
	return generateRandomIndex(99);
}

function generateRandomAnimal(){

	var randomAnimalIndex = generateRandomIndex(animal.length);
	var randomAnimal = animal[randomAnimalIndex];

	if (randomAnimal instanceof redPanda){
		console.log("Congrats! You have a Red Panda!");
		return new redPanda(generateRandomName(),generateRandomAge());
	} else if (randomAnimal instanceof penguin){
		console.log("Congrats! You have a new penguin!");
		return new penguin(generateRandomName(),generateRandomAge());
	} else {
		console.log("You hit the jackpot! You have a new double-wattled cassowary!");
		return new doubleWattledCassowary(generateRandomName(),generateRandomAge());
	}

}

$(document).ready(function() {
	var animal = generateRandomAnimal();
	if (animal.type == "Red Panda"){
		$("img").attr("src", function(){
		return "images/redpanda.jpg"
	});
	} else if( animal.type == "Penguin") {
		$("img").attr("src", function(){
		return "images/penguin.jpg"
	});
	} else {
		$("img").attr("src", function(){
		return "images/cassowary.jpg"
	});
	}
	

});


