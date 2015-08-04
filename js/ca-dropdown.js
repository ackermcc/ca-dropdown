$(document).ready(function(){

	//Hook up ca-dropdown for each jq panel
	$('.jq-dropdown').each(function(index, el) {
		var _ = $(this);
		var menuWindow = _.find('.ca-menu-window');
		var menuContainer = _.find('.ca-menus-container');
		var menu = _.find('.ca-menu');
		var triggerID = _.attr('id');

		var childVisible = 0;

		//All child options are stored here.
		var production = ['ISO Full Load Output', 'ISO Full Load Heat Rate', 'Fuel Varience'];
		var reliability = ['Commercial Availability', 'Equivalent Availability Factor', 'Equivalent Demand Forced Outage Rate'];
		var optimization = ['Hot Start Time','Warm Start Time','Cold Start Time','Hot Start Fuel','Warm Start Fuel','Cold Start Fuel','Turn Downs','Ramp Rate'];

		// Dynamically set height...
		function setMenuHeight(m){
			menuWindow.height(m.outerHeight());
		};

		function addChildOptions(options) {
			$.each(options, function(i) {
				console.log(options[i]);
				var newOption = $('<li class="added-title">'+options[i]+'</li>');
				newOption.insertAfter( menu.find('.title'));
				bindOptionActions(newOption);
			});
		}

		//Set height on select.
		$('#'+triggerID).on('show', function(event, dropdownData){
			if (childVisible == 0) {
				setMenuHeight(menu.first());
			} else {
				setMenuHeight(menu.last());
			}
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

		function bindOptionActions(o) {
			o.on('click', function() {
			var _ = $(this);
			//Select option that is not a group, navigate and change selected state.
			if (!_.hasClass('group')) {
				if (!_.hasClass('title')) {
					menu.find('li').removeClass('ca-menu-selected');
				_.addClass('ca-menu-selected');
				}
			}
			//Select group option and slide menu
			else {
				//Find the selected group title and update the menu title to match;
				var groupTitle =  $.trim(_.find('.ca-group-title').text());
				menu.find('.ca-menu-title').text(groupTitle);

				//Empty child menu in preperation for new items
				$('.added-title').remove();

				//Select array based on title and add options
				if (groupTitle === 'Production') {
					addChildOptions(production);
				} else if (groupTitle === 'Reliability') {
					addChildOptions(reliability);
				} else if (groupTitle === 'Optimization') {
					addChildOptions(optimization);
				};

				//Animate to the child view
				menuContainer.animate({
					left: -menu.width()
				}, 350, function(){
					childVisible = 1;
					setMenuHeight(menu.last());
				});
			}
		});

		}

		bindOptionActions(menu.find('li'));

	});

});