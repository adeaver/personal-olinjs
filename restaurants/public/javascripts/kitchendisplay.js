function completeOrder(id) {
	var url = "http://127.0.0.1:3000/order/remove?id=" + id;

	$.ajax({
		url:url,
		success: function(result) {
			$("#" + id).remove();
		}
	});
}