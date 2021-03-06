var quantites = [];
var totalPrice = 0;

function clearQuantities() {
	quantites = [];
	totalPrice = 0;
}

function updatePrice(element, name, price, quantity) {
	var q = parseInt(quantity);
	if(element.value <= q) {
		var oldValue = searchQuantities(name, element.value);
		totalPrice = totalPrice + price * (element.value-oldValue);

		$("#total_price").text("$" + totalPrice.toFixed(2).toString());
	} else {
		alert("You can not exceed the quantity of items available!");
		element.value = q;
	}
}

function searchQuantities(name, quantity) {
	var oldValue = 0;

	for(var index = 0; index < quantites.length; index++) {
		if(quantites[index][0] == name) {
			oldValue = quantites[index][1];
			quantites[index][1] = quantity;
		}
	}

	if(oldValue === 0) {
		quantites.push([name, quantity]);
	}

	return oldValue;
}