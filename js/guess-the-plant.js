function guessThePlantInit(){

	var html = '<i class="fa fa-home round-icon" style="float: right;" onclick="homeInit()"></i>'+

			'<h1> Guess The Plant </h1>'+

			'<div>'+
				'<img id="guess-the-plant-img" src="http://az616578.vo.msecnd.net/files/2016/06/26/636025571697066617-178154223_lambs-quarter.jpg">'+
			'</div>'+

			'<button value="black-medic" class="big-btn" > Black Medic </button> <br>'+

			'<button value="lambsquarters" class="big-btn" > Lambsquarter </button> <br>'+

			'<button value="garlic-chives" class="big-btn" > Garlic Chives </button> <br>';

	var main = document.getElementById('main');
	main.innerHTML = html;

	var plant = 'lambsquarters';

	var guess;

	var buttons = document.getElementsByTagName('button');

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener( 'click', function(){

			guess = this.value;
			
			makeGuess();

		} );
	};

	function makeGuess(){

		if ( plant == guess ){

			alert( 'YEEEAAA' );
			loadUpPlant();
		}

		else {

			alert( 'boooo' );

		}	
	}

	function loadUpPlant(){

		var number = Math.floor( Math.random() * plantDatabase.length );

		var plantData = plantDatabase[ number ];


		var img = document.getElementById('guess-the-plant-img');
		img.src = plantData.img;

		plant = plantData.name;
	}

	loadUpPlant();

}