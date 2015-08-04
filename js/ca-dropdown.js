$(document).ready(function(){

	//Hook up ca-dropdown for each jq panel
	$('.jq-dropdown').each(function(index, el) {
		console.log(index);
		var _ = $(this);
		var menuWindow = _.find('.ca-menu-window');
		var menuContainer = _.find('.ca-menus-container');
		var menu = _.find('.ca-menu');
		var triggerID = _.attr('id');

		var childVisible = 0;

		// Dynamically set height...
		function setMenuHeight(m){
			menuWindow.height(m.height());
		};

		//Set height on select.
		$('#'+triggerID).on('show', function(event, dropdownData){
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

});