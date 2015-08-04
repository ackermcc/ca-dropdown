$(document).ready(function(){

	var menuWindow = $('.ca-menu-window');
	var menuContainer = $('.ca-menus-container');
	var menu = $('.ca-menu');

	var childVisible = 0;

	// Dynamically set height...
	function setMenuHeight(m){
		menuWindow.height(m.height());
	};

	//Set height on select.
	$('#jq-dropdown-1').on('show', function(event, dropdownData){
		console.log(menu.first());
		if (childVisible == 0) {
			setMenuHeight(menu.first());
		} else {
			setMenuHeight(menu.last());
		}
	});

	//Select option and slide menu
	menu.find('li.group').click(function(){
		menuContainer.animate({
			left: -menu.width()
		}, 350, function(){
			childVisible = 1;
			setMenuHeight(menu.last());
		});
	});

	//Select title to return
	menu.find('li.title').click(function(){
		menuContainer.animate({
			left: 0
		}, 350, function(){
			childVisible = 0;
			setMenuHeight(menu.first());
		});
	});


});