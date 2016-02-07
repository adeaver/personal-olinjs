$(document).ready(function() {
	refreshData();
});

function addData() {
	var price = $("#price").val();
	var name = $("#name").val();

	var checkId = "#quantity_" + name;

	var quantity = $(checkId).length && $(checkId).html() != "Out of Stock" ? $(checkId).html() : "0";

	var url = "http://127.0.0.1:3000/ingredients/update?name=" + name;
	url += "&price=" + price + "&quantity=" + quantity;

	$.ajax({
		url:url,
		success:function(result) {
			refreshData();
		}
	});
}

function updateQuantities(name, currentQuantity) {
	var id = "#restock_" + name.replace(/\s+/g, '');
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
	var id = id_prefix + name.replace(/\s+/g, '');
	var input = "<input type=\"" + type + "\" ";
	input += "id=\"" + id + "\" ";
	input += "value=\"" + value + "\" ";
	input += isSubmit ? "onclick=\"updateQuantities('" + name + "', '" + currentQuantity + "')\" " : "min=\"0\"";
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
				var style = result[index].quantity > 0 ? "" : "style=\"background-color:red;\" ";
				var row = "<tr " + style + ">";

				var quantityDisplay = result[index].quantity > 0 ? result[index].quantity : "Out of Stock";

				row += "<td>" + result[index].name + "</td>";
				row += "<td>" + result[index].price + "</td>";
				row += "<td id=\"quantity_" + result[index].name + "\">" + quantityDisplay + "</td>";
				row += "<td>" + buildInputs("number", "restock_", result[index].name, 0, 0, false) + "<br />";
				row += buildInputs("submit", "restock_submit_", result[index].name, "Restock", result[index].quantity, true) + "</td>";
				row += "</tr>";

				$("#ingredients").append(row);
			}
		}
	});
}