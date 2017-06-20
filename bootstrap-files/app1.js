var topics = ['Denzel Washington', 'Big Lebowski', 'Game of Thrones', 'Star Wars', 'Batman', 'X-Men', 'Fargo', 'Pulp Fiction', 'Samuel L Jackson', 'Dave Chapelle']

	for(i = 0; i < topics.length; i++){
		var button = $('<button class=buttonTopic>').text(topics[i]);
		$('#buttons').append(button);
	};

var topicChoice = '';
var queryURL = '';

$(document).on('click', '.buttonTopic', function(){
	$('.response').html('');
	var topicChoice = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicChoice + "&api_key=dc6zaTOxFJmzC"
	$.ajax({
		url:queryURL, 
		method:'GET'
	}).done(function(response){
		for(i = 0; i < 10; i++){
			var container = $('<div>').addClass('col-xs-4 img-container');
			var image = $('<img>').addClass('img-responsive center-block');
			image.attr('src', response.data[i].images.fixed_height_still.url);
			image.attr('data-still', response.data[i].images.fixed_height_still.url);
			image.attr('data-animate', response.data[i].images.fixed_height.url);
			image.attr('state', 'still');
			image.addClass('gif');
			container.append(image);
			container.append('<p class="col-xs-12 label">Rating: ' + response.data[i].rating + '</p>');
			if (i <= 2){
				$('#response1').append(container);
			} else if (i <= 5) {
				$('#response2').append(container);
			} else if (i <= 8) {
				$('#response3').append(container); 
			} else {
				$('#response4').append(container);
			}
		};	
	});
});

$(document).on('click', '.gif', function(){

	if ($(this).attr('state') === 'still'){
	$(this).attr('src', $(this).attr('data-animate'));
	$(this).attr('state', 'animate');
	} else {
	// make it so url turns back to _s in middle
	$(this).attr('src', $(this).attr('data-still'));
	$(this).attr('state', 'still');
	}
});



$("#add-movie").on("click", function() {
	// This function below prevents the page from reloading
	event.preventDefault(); 
	var input = $('#movie-input').val()
	if (input.length > 0){
		var button1 = $('<button class=buttonTopic>').text(input)
		$('#buttons').append(button1)
		$('#movie-input').val("");
	};
});