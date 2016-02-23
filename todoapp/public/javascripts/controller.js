var todoControllers = angular.module('todoApp', []);

todoControllers.controller('todoCtrl', function($scope, $http, $compile) {

	$scope.addTodoItem = function() {
		var todoItem = angular.element(document.querySelector('#todoitem'));
		var items = angular.element(document.querySelector('#todo'));

		var text = todoItem.val();
		todoItem.val('');

		$http.post('/add', {'todo':text}).then(function(res) {
			var span = '<span id="lesser_' + res.data._id + '" ng-click="convertToInput(\'' + res.data._id + '\')">' + res.data.text + '</span>'

			var listElement = '<li id="' + res.data._id + '">';
			listElement += '<span id="greater_' + res.data._id + '">';
			listElement += span + '</span><br />';
			listElement += '<button ng-click="deleteTodoItem(\'' + res.data._id + '\')">'
			listElement += 'Done</button>';

			var compiledListElement = $compile(listElement)($scope);

			items.prepend(compiledListElement);
		}, function(res) {
			console.log('Error');
			console.log(res);
		});
	}

	$scope.deleteTodoItem = function(id) {
		$http.get('/remove/' + id).then(function(res) {
			var elementId = '[id=\'' + res.data._id + '\']';

			var item = angular.element(document.querySelector(elementId));
			item.remove();
		}, function(res) {
			console.log('Error');
			console.log(res);
		});
	}

	$scope.convertToInput = function(id) {
		var lesserSpanId = '#lesser_' + id;
		var greaterSpanId = '#greater_' + id;

		var lesserSpan = angular.element(document.querySelector(lesserSpanId));
		var greaterSpan = angular.element(document.querySelector(greaterSpanId));

		var constructInput = '<input id="edit_' + id + '" size="' + lesserSpan.html().length + '" type="text" value="' + lesserSpan.html();
		constructInput += '" ng-blur="convertToText(\'' + id + '\')" />';

		var compiledInput = $compile(constructInput)($scope);
		greaterSpan.html("");
		greaterSpan.append(compiledInput);
	}

	$scope.extendLength = function(element) {
		element.size(element.val().length);
	}

	$scope.convertToText = function(id) {
		var inputId = "#edit_" + id;
		var greaterSpanId = "#greater_" + id;

		var input = angular.element(document.querySelector(inputId));
		var greaterSpan = angular.element(document.querySelector(greaterSpanId));

		var text = input.val();

		$http.post('/update', {id:id, todo:text}).then(function(res) {
			var constructSpan = '<span id="lesser_' + id + '" ng-click="convertToInput(\'' + id + '\')">' + input.val() + '</span>';
			var compiledSpan = $compile(constructSpan)($scope);

			greaterSpan.html("");
			greaterSpan.append(compiledSpan);
		}, function(res) {
			console.log('error');
		});
	}
});