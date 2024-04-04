function runCalculation() {
	var weight = document.getElementById('weight').value;
	var height = document.getElementById('height').value;
	var age = document.getElementById('age').value;
	var gender = document.getElementById('gender').value;
	
	if (isNaN(weight)) {
		alert('enter a valid weight');
		return;
	}
	if (isNaN(height) || Number(height) == 0) {
		alert('enter a valid height');
	}
	if (isNaN(age) || Number(age) == 0) {
		alert('enter a valid age');
	}
	
	weight = Number(weight);
	height = Number(height);
	age = Number(age);
	
	var bmi = (weight / (height * height) * 703);
	document.getElementById('bmi-result').innerHTML = 'your bmi is: ' + bmi;
	
	var bmr = (10 * weight * 0.45) + (6.25 * height * 2.54) - (5 * age);
	bmr = bmr + (gender == 'female' ? -161 : 5);
	document.getElementById('bmr').innerHTML = 'your bmr is: ' + bmr;
	document.getElementById('sed').innerHTML = 'your sedentary mainetenance is: ' + (bmr * 1.2);
	document.getElementById('light').innerHTML = 'your light exercise maintenance is: ' + (bmr * 1.375);
	document.getElementById('mod').innerHTML = 'your moderate exercise maintenance is: ' + (bmr * 1.55);
	document.getElementById('heavy').innerHTML = 'your heavy exercise maintenance is: ' + (bmr * 1.725);
	document.getElementById('athlete').innerHTML = 'your athlete exercise maintenance is: ' + (bmr * 1.9);
}