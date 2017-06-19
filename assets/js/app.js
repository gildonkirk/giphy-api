var topics = ['denzel washington', 'big lebowski', 'game of thrones', 'star wars', 'batman', 'x-men', 'fargo', 'pulp fiction', 'samuel l jackson', 'dave chapelle']

	for(i = 0; i < topics.length; i++){
		var button = $('<button class=buttonTopic>').text(topics[i]);
		$('#buttons').append(button);
	};

var topicChoice = '';
var queryURL = '';

$(document).on('click', '.buttonTopic', function(){
	$('#response').html('');
	var topicChoice = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicChoice + "&api_key=dc6zaTOxFJmzC"
	$.ajax({
		url:queryURL, 
		method:'GET'
	}).done(function(response){
		for(i = 0; i < 10; i++){
		var container = $('<div>').addClass('img-container');
		var image = $('<img>');
		image.attr('src', response.data[i].images.fixed_height_still.url);
		image.attr('data-still', response.data[i].images.fixed_height_still.url);
		image.attr('data-animate', response.data[i].images.fixed_height.url);
		image.attr('state', 'still');
		image.addClass('gif');
		container.append(image);
		container.append('<p>Rating: ' + response.data[i].rating + '</p>');
		$('#response').append(container);        		
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