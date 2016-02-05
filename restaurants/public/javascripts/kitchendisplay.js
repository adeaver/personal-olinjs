$(document).ready(function(){
	showOrders();
});

function showOrders() {
	var url = "http://127.0.0.1:3000/order/data";

	$.ajax({
		url:url,
		success: function(result) {

			var baseRow = "<tr id=\"baseRow\"><td>Ingredients</td><td>Total Price</td><td>Complete</td></tr>";
			
			if(!$("#baseRow")) {
				$("#display_area").append(baseRow);
			}

			for(var index = 0; index < result.length; index++) {
				var row = "<tr>";
				row += "<td>" + displayIngredients(result[index].contents) + "</td>";
				row += "<td>$" + result[index].price + "</td>";
				row += "<td>" + buildInput(result[index]._id) + "</td>";
				row += "</tr>";

				$("#display_area").append(row);
			}
		}
	});
}

function displayIngredients(contents) {
	var displayString = "";

	for(var index = 0; index < contents.length; index++) {
		displayString += contents[index].ingredient;
		displayString += " (x" + contents[index].amount + ")<br />";
	}

	return displayString;
}

function buildInput(id) {
	var input = "<input type=\"Submit\" ";
	input += "value=\"Complete Order\" ";
	input += "onclick=\"removeOrder('" + id + "')\"";
	input += " />";

	return input;
}

function removeOrder(id) {
	var url = "http://127.0.0.1:3000/order/remove?id=" + id;

	$.ajax({
		url:url,
		success: function(result) {
			showOrders();
		}
	});
}