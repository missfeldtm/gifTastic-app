/*
General Comments

GET /v1/gifs/search

http://api.giphy.com/v1/gifs/search?&api_key=j80jTkTqUy0IVw0FRC2y0lp3NLCAqOCC&q=rainbow


*/

var $form = $('form'),
    $search = $(".search"),
    $clear = $(".clear"),
    $giphy = $(".giphy img"),
    $giphyLink = $(".giphy a");



$('#addGiphy').on("click", function () {

    var url = "http://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&api_key=j80jTkTqUy0IVw0FRC2y0lp3NLCAqOCC";

    event.preventDefault();

    var query = $('#giphy-input').val().trim();


    var queryURL = url + query + apiKey;
    console.log(query);

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {

        console.log(response);
        var results = response.data;


        console.log(results);

        for (var i = 0; i < results.length; i++) {

            var animalDiv = $('<div>');
            var rating = results[i].rating;

            console.log(results[i].rating);
            var p = $('<p>').text("Rating: " + rating);

            var gifIMG = $('<img>');
            gifIMG.attr('src', results[i].images.fixed_height.url);

            animalDiv.append(p);
            animalDiv.append(gifIMG);


            $('.giphy').prepend(animalDiv);

        }




    });

});