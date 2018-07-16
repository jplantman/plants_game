function databaseViewerInit(){ // displays menu that lets user pick what database to view


	document.getElementById('main').innerHTML = '<i class="fa fa-home round-icon" style="float: right;" onclick="homeInit()"></i>'+

		'<h1> Which plants do you want to learn about? </h1>'+

		(function(){
			var buttons = '';
			for (var i = activeCategories.length - 1; i >= 0; i--) 
			{ 
				var category = activeCategories[i];
				buttons +='<button onclick="initDatabase(\''+category+'\')" class="big-btn" > '+category+'s </button> <br>'
			};
			return buttons;
		}());

}

function initDatabase(category){ // opens a database viewing interface for the chosen database
	activeDatabase = [];
	for (var i = plantDatabase.length - 1; i >= 0; i--) 
	{
		var plant = plantDatabase[i];
		if ( plant.category == category )
		{
			activeDatabase.push( plant );
		}
	};

	// console.log( 'database loaded', activeDatabase )
	var main = document.getElementById('main');

	main.innerHTML = '<i class="fa fa-home round-icon" style="float: right;" onclick="homeInit()"></i>'+
		'<h1> '+category+'s </h1>';

	var plantsList = document.createElement('div');

	var elem;

	for (var i = activeDatabase.length - 1; i >= 0; i--) {
		( function(i){
			var plant = activeDatabase[i];
			var plantCard = document.createElement('div');
			plantCard.className = "plant-card";

			// Family
			elem = document.createElement('div');
			elem.innerHTML = '<i style=" float: right; color: #777; margin-right: 10px; ">'+plant.family+'</i>';
			plantCard.appendChild( elem );

			// Title
			var elem = document.createElement('h3');
			elem.style.cursor = 'pointer'
;			elem.innerHTML = plant.commonName + " - <i>"+ plant.latinName +"</i>";
			elem.addEventListener( 'click', function(){
				openPopUp( plant )
			} );
			plantCard.appendChild( elem );


			// Image
			var height = 'height: 80vw; min-height: 400px; max-height: 600px;';
			elem = document.createElement('div');
			elem.className = "swiper-container";
			elem.style = height;
			var wrapper = document.createElement('div');
			wrapper.className = 'swiper-wrapper';

			var slide;
			slide = document.createElement('div');
			slide.className = "swiper-slide";
			slide.innerHTML += '<img src="'+ plant.imgs[0].src +'" style="width: 100%; '+height+'" />'; //height: 80vw; min-height: 400px; max-height: 600px;
			wrapper.appendChild( slide );

			


			elem.appendChild( wrapper );
			plantCard.appendChild( elem );

			plantsList.appendChild( plantCard )
		} )(i);
	};

	main.appendChild( plantsList );

	// 'additional info' window, appears when you click on a plant
	var popUp = document.createElement('div'); 
	popUp.style = ' position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: auto;'+
				  ' z-index: 1; background-color: #efefef; visibility: hidden ';
	var wrapper = document.createElement('div');
	wrapper.className = 'wrapper';
	wrapper.style = 'height: 100%;';
	popUp.appendChild( wrapper );

	// open popUp
	function openPopUp( plant ){
		
		pWindowInfo.style.display = 'block';
		pWindowPics.style.display = 'none';
		pWindowWiki.style.display = 'none';

		pTitle.innerHTML = plant.commonName + " - <i>"+ plant.latinName +"</i>";

		pFamily.innerHTML = "<i style='color: #777'>"+ plant.family +"</i>";

		// info window
		var stats = [ 
			{key: 'category', label: 'Category'},
			{key: 'lifeCycle', label: 'Life Cycle'},
			{key: 'edibleParts', label: 'Edible Parts'}
		];
		// print out each stat that is present
		var html = '<h3><b>'+plant.commonName+'</b></h3>';
		for (var i = 0; i < stats.length; i++) {
			var stat = stats[i];
			if ( plant[stat.key] ){
				html += '<b>'+stat.label+':</b> ' + ( function(data){
					if ( typeof data == 'string' ){
						return data;
					} else if ( Array.isArray(data) ){
						return data.join(', ');
					} else {
						console.log( 'not set up to handle this data structure yet', typeof data,  )
						return 'not set up to handle this data structure yet';
					}
				} )( plant[stat.key] );
				html += '<br/>';
			}
		};
		pWindowInfo.innerHTML = html;
		
		// pics window
		pWindowPics.imgsArray = [];
		pWindowPics.innerHTML = '';

		var tagsDiv = document.createElement('div');
		var imgsDiv = document.createElement('div');

		var searchBar = document.createElement('input');
		searchBar.type = 'text';
		searchBar.style = "width: 100%; font-size: 120%; padding: 2px; margin: 2px 2px 8px; border-radius: 5px;";
		searchBar.placeholder = "Search...";
		searchBar.search = function(){
			imgsDiv.innerHTML = "";
			var results = document.createElement('div');
			results.count = 0;
			imgsDiv.appendChild( results );

			for (var i = 0; i < plant.imgs.length; i++) {
				var imgData = plant.imgs[i];
				// check if the img contains any of the search terms
				var searchTerms = searchBar.value.split(" ").filter( function(term){ return term.length  } );
				if ( searchTerms.length == 0 || imgData.tags.some( function(tag){ return searchTerms.includes( tag ) } ) ){
					// include this img in the results
					results.count++;
					var img = document.createElement('img');
					img.src = imgData.src;
					img.tags = imgData.tags;
					img.className = 'plant-card img-size-media';
					imgsDiv.appendChild( img );
				}
			};

			if ( searchTerms.length > 0 ){
				results.innerHTML = 'Results: ('+results.count+')<br/>';
			}
		}
		searchBar.addEventListener( 'input', searchBar.search );
		pWindowPics.appendChild( searchBar );

		var tagsDiv = document.createElement('div');

		var imgsDiv = document.createElement('div');

		tagsDiv.array = [];

		pWindowPics.appendChild( tagsDiv );

		for (var i = 0; i < plant.imgs.length; i++) {
			var img = document.createElement('img');
			img.src = plant.imgs[i].src;
			img.tags = plant.imgs[i].tags;
			for (var j = 0; j < img.tags.length; j++) {
				(function(j){
					var tag = img.tags[j];
					if ( tagsDiv.array.indexOf( tag ) < 0 ){
						tagsDiv.array.push( tag );
						var tagElem = document.createElement('span');
						tagElem.innerHTML = tag;
						tagElem.style = " cursor: pointer; color: steelblue; text-decoration: underline; padding: 2px 4px; margin: 1px 2px;";
						tagElem.addEventListener( 'click', function(){
							searchBar.value += ' '+tag;
							searchBar.search();
						} );
						tagsDiv.appendChild( tagElem );
					}
				})(j);
				
			};
			img.className = 'plant-card img-size-media';
			pWindowPics.imgsArray.push( img );
			imgsDiv.appendChild( img );
		};

		pWindowPics.appendChild( imgsDiv );

		// wiki iframe
		pWindowWiki.innerHTML = '<iframe src="'+plant.wikiSrc+'" style="width: 100%; height: 100%;" ></iframe>';

		popUp.style.visibility = 'visible';
	}
	
	// close popUp button
	elem = document.createElement('div');
	elem.innerHTML = '<i class="fa fa-window-close"></i>';
	elem.style = " float: right; font-size: 1.5em; cursor: pointer; margin: 5px 10px; ";
	elem.addEventListener( 'click', function(e){
		popUp.style.visibility = 'hidden';
	} );
	wrapper.appendChild( elem );

	// popUp title
	var pTitle = document.createElement('h2');
	wrapper.appendChild( pTitle );

	var pFamily = document.createElement('h3');
	wrapper.appendChild( pFamily );

	// Info Window
	pWindowInfo = document.createElement('div');
	pWindowInfo.className = 'plant-card';
	pWindowInfo.style = 'margin: 0 5px; ';

	// Pics Window
	pWindowPics = document.createElement('div');
	pWindowPics.className = 'plant-card';
	pWindowPics.style = 'margin: 0 5px; display: none; ';

	// Wiki Window
	pWindowWiki = document.createElement('div');
	pWindowWiki.className = 'plant-card';
	pWindowWiki.style = 'margin: 0 5px; display: none; height: 100%; ';

	// Tabs
	function createTab(label, currentWindow){
		var tab = document.createElement('div');
		tab.className = "big-btn";
		tab.style = "width: 30%; display: inline-block;";
		tab.innerHTML = '<b>'+label+'</b>';
		tab.addEventListener('click', function(){
			pWindowInfo.style.display = 'none';
			pWindowPics.style.display = 'none';
			pWindowWiki.style.display = 'none';
			currentWindow.style.display = 'block';
		});
		wrapper.appendChild( tab );
		return tab;
	}
	pTabInfo = createTab('Info', pWindowInfo);

	pTabOverview = createTab('Pics', pWindowPics);

	pTabWiki = createTab('Wiki', pWindowWiki);

	// append Windows after Tabs
	wrapper.appendChild( pWindowInfo );
	wrapper.appendChild( pWindowPics );
	wrapper.appendChild( pWindowWiki );

	







	main.appendChild( popUp );


	new Swiper( '.swiper-container' );


}

// helpers
function toggleText( text ){
	console.log( this )
}