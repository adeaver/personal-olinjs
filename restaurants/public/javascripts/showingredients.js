var baseUpdateUrl = "http://127.0.0.1:3000/ingredients/update?";

function addIngredient() {
	var name = $("#name").val();
	var price = $("#price").val();
	var quantity = $("#quantity").val();

	$("#name").val("");
	$("#price").val("");
	$("#quantity").val("");

	var params = "name=" + name;
	params += "&price=" + price;
	params += "&quantity=" + quantity;

	var fullUrl = baseUpdateUrl + params;

	$.ajax({
		url:fullUrl,
		success: function(result) {
			var row = "<tr id=\"" + result._id + "\"></tr>";

			$("#ingredients").append(row);
			$("#" + result._id).html(updateRow(result));

			if(parseInt(result.quantity) == 0) {
				$("#" + result._id).css({"background-color": "#A3C00F"});
			} else {
				$("#" + result._id).css({"background-color": "#ee6a50"});
			}
		}
	});
}

function editPrice(id, name) {
	var newPrice = $("#price_" + id).val();
	var params = "name=" + name;
	params += "&price=" + newPrice;

	var fullUrl = baseUpdateUrl + params;

	$.ajax({
		url:fullUrl,
		success: function(result) {
			$("#" + result._id).html(updateRow(result));
		}
	});
}

function restock(id, name, quantity) {
	var addQuantity = $("#restock_" + id).val();
	var newQuantity = parseInt(quantity) + parseInt(addQuantity);

	console.log(newQuantity);

	var params = "name=" + name;
	params += "&quantity=" + newQuantity;

	var fullUrl = baseUpdateUrl + params;

	$.ajax({
		url:fullUrl,
		success: function(result) {
			$("#" + result._id).html(updateRow(result));

			if(parseInt(result.quantity) == 0) {
				$("#" + result._id).css({"background-color": "#A3C00F"});
			} else {
				$("#" + result._id).css({"background-color": "#ee6a50"});
			}
		}
	});
}

function updateRow(result) {
	var quantity = result.quantity > 0 ? result.quantity : "Out of Stock";

	var row = "<td>" + result.name + "</td>";
	row += "<td>" + result.price + "</td>";
	row += "<td>" + buildPriceInput(result.name, result._id) + "</td>";
	row += "<td>" + quantity + "</td>";
	row += "<td>" + buildRestockInput(result.name, result._id, result.quantity) + "</td>";

	return row;
}

function buildRestockInput(name, id, quantity) {
	var input = "<input type=\"number\" ";
	input += "name=\"restock_" + id + "\" ";
	input += "id=\"restock_" + id + "\" ";
	input += "placeholder=\"Restock ingredient\" ";
	input += "/><br /> ";

	input += "<input type=\"submit\" ";
	input += "value=\"Restock\" ";
	input += "onclick=\"restock('" + id + "', '" + name + "', '" + quantity + "')\" ";
	input += "/>"

	return input;
}

function buildPriceInput(name, id) {
	var input = "<input type=\"number\" ";
	input += "name=\"price_" + id + "\" ";
	input += "id=\"price_" + id + "\" ";
	input += "placeholder=\"Edit Price\" ";
	input += "step=\"0.01\" ";
	input += "/><br /> ";

	input += "<input type=\"submit\" ";
	input += "value=\"Update Price\" ";
	input += "onclick=\"editPrice('" + id + "', '" + name + "')\" ";
	input += "/>"

	return input;
}