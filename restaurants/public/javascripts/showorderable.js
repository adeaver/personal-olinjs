$(document).ready(function() {
	setUpForm();
});

function setUpForm() {
	clearQuantities();
	$("#total_price").html("$0.00");

	var url = "http://127.0.0.1:3000/ingredients/data";

	$.ajax({
		url:url,
		success: function(result) {
			$("#order_space").html("");
			for(var index = 0; index < result.length; index++) {
				var row = "<tr>";
				row += "<td>" + result[index].name + "</td>";
				row += "<td>" + result[index].price + "</td>";
				row += "<td>" + buildInput(result[index]) + "</td>";
				row += "</tr>";

				$("#order_space").append(row);
			}
		}
	});
}

function sendData() {
	var items = $(".order_item");
	var baseUrl = "http://127.0.0.1:3000/order/add?";
	var ids = "";
	var amounts = "";
	var price = $("#total_price").html().substring(1);

	for(var index = 0; index < items.length; index++) {
		if(items[index].value > 0) {
			var delimiter = index == items.length-1 ? "" : ",";
			ids += items[index].name + delimiter;
			amounts += items[index].value + delimiter;
		}
	}

	var url = baseUrl + "names=" + ids;
	url += "&amounts=" + amounts;
	url += "&price=" + price;

	$.ajax({
		url:url,
		success:function(result) {
			console.log(url);
			alert("Successfully added order");
			setUpForm();
		},
		error: function(xml, text, err) {
			alert("Unsuccessful");
		}
	});
}

function buildInput(dataObject) {
	var id = dataObject._id;
	var name = dataObject.name;
	var price = dataObject.price;
	var quantity = dataObject.quantity;

	var functionParam = "updatePrice(this, ";
	functionParam += "'" + name + "', ";
	functionParam += "'" + price + "', ";
	functionParam += "'" + quantity + "')"; 

	var input = "<input type=\"number\" ";
	input += "name=\"" + name + "\" ";
	input += "class=\"order_item\" ";
	input += "placeholder=\"Amount\" ";
	input += "oninput=\"" + functionParam + "\" ";
	input += quantity > 0 ? "" : "disabled ";
	input += "/>";

	// secret input
	input += "<input type=\"hidden\" ";
	input += "id=\"" + name.replace(/\s+/g, '') + "_quantity\" ";
	input += "name=\"" + name + "_quantity\" ";
	input += "value=\"" + quantity + "\" />";

	return input;
}