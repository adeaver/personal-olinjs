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
	var ids = "";
	var amounts = "";
	var price = $("#total_price").html().substring(1);

	/* This is a great place= to use the functional jQuery each -- a little cleaner than
		 having to index into a list everywhere

		 items.each(function(anItem) {
		   (do whatever inside)
		 });
	 */
	for(var index = 0; index < items.length; index++) {
		if(items[index].value > 0) {
			var delimiter = index == items.length-1 ? "" : ",";
			ids += items[index].name + delimiter;
			amounts += items[index].value + delimiter;
		}
	}

	$.ajax({
		url: '/order/add',
		data: {
			names: ids,
			amounts: amounts,
			price: price
		},
		/* Easier to send your data like this -- that way you don't need to string together URL query params

			 The data should be accessible at `req.body` on the serverside -- as
			 long as you're using bodyParser middleware (check `app.js`)
		 */
		success: function(result) {
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

	// Check out this jsfiddle https://jsfiddle.net/swalters4925/e8gzd6h9/1/
	// for an easier/cleaner way to construct structured HTML.
	var input = "<input type=\"number\" ";
	input += "name=\"" + name + "\" ";
	input += "class=\"order_item\" ";
	input += "placeholder=\"Amount\" ";
	input += "oninput=\"" + functionParam + "\" ";
	input += quantity > 0 ? "" : "disabled ";
	input += "/>";

	return input;
}
