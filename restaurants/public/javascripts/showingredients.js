$(document).ready(function() {
	refreshData();
});

function addData() {
	var price = $("#price").val();
	var name = $("#name").val();

	var url = "http://127.0.0.1:3000/ingredients/update?name=" + name;
	url += "&price=" + price + "&quantity=0";

	$.ajax({
		url:url,
		success:function(result) {
			refreshData();
		}
	});
}

function updateQuantities(name, currentQuantity) {
	var id = "#restock_" + name;
	var value = $(id).val() == "" ? 0 : parseInt($(id).val());

	var url = "http://127.0.0.1:3000/ingredients/update?name=" + name;
	url += "&quantity=" + (value+parseInt(currentQuantity));

	$.ajax({
		url:url,
		success:function(result) {
			refreshData();
		}
	});
}

function buildInputs(type, id_prefix, name, value, currentQuantity, isSubmit) {
	var id = id_prefix + name;
	var input = "<input type=\"" + type + "\" ";
	input += "id=\"" + id + "\" ";
	input += "value=" + value;
	input += isSubmit ? "onclick=\"updateQuantities('" + name + "', '" + currentQuantity + "')\" " : "";
	input += "/>";

	return input;
}

function refreshData() {
	var url = "http://127.0.0.1:3000/ingredients/data";

	$("#ingredients").html("");

	first_row = "<tr><td>Name</td><td>Price</td><td>Quantity</td><td>Restock Amount</td></tr>";
	$("#ingredients").append(first_row);

	$.ajax({
		url:url,
		success:function(result) {
			for(var index = 0; index < result.length; index++) {
				var rowClass = result[index].quantity > 0 ? "stocked" : "restock";
				var row = "<tr class=\"" + rowClass + "\">";

				// TODO clean this up
				row += "<td>" + result[index].name + "</td>";
				row += "<td>" + result[index].price + "</td>";
				row += "<td>" + result[index].quantity + "</td>";
				row += "<td>" + buildInputs("number", "restock_", result[index].name, 0, 0, false) + "<br />";
				row += buildInputs("submit", "restock_submit_", result[index].name, "\"Restock\"", result[index].quantity, true) + "</td>";
				row += "</tr>";

				$("#ingredients").append(row);
			}
		}
	});
}