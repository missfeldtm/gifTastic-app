/*
General Comments

GET /v1/gifs/search

http://api.giphy.com/v1/gifs/search?&api_key=j80jTkTqUy0IVw0FRC2y0lp3NLCAqOCC&q=rainbow


*/

//set all fxns into an object
var gifDB = [];
var stillDB = [];

var imageStill;
var gif;

var animals = ['Golden Retriever', 'Newfoundland', 'Bernese Mountain Dog', 'Bassett Hound'];

var library = {
    generateButtons: function () {
        for (var i = 0; i < animals.length; i++) {

            library.createBtn(animals[i]);
        }
    },
    createBtn: function (val) {

        var btn = $('<button>');

        btn.attr({
            dataName: "animals",
            class: "btn dog",
        });

        btn.text(val);
        $('#btn-area').append(btn);

    },
    dogButton: function () {

        var search = $(this).text();
        library.getGIFs(search);

    },
    addButton: function () {
        var dogVal = $('#giphy-input').val().trim();

        //add value to array 
        animals.push(dogVal);

        //regenerate Buttons
        library.createBtn(dogVal);

        return false;
    },
    getGIFs: function (input) {
        gifDB = [];
        stillDB = [];

        var url = "http://api.giphy.com/v1/gifs/search?q=";
        var apiKey = "&api_key=j80jTkTqUy0IVw0FRC2y0lp3NLCAqOCC";



        event.preventDefault();

        var query = input;


        var queryURL = url + query + apiKey;
        console.log(query);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {

            console.log(response);
            var results = response.data;



            console.log(results);

            for (var i = 0; i < 10; i++) {

                var animalDiv = $('<div>');
                var rating = results[i].rating;

                imageStill = results[i].images.fixed_height_still.url;
                gif = results[i].images.fixed_height.url;

                gifDB.push(gif);
                stillDB.push(imageStill);


                console.log(results[i].rating);
                var p = $('<p>').text("Rating: " + rating);

                var gifIMG = $('<img>');

                gifIMG.attr({
                    src: imageStill,
                    alt: 'stillframe of image',
                    class: 'still-img',
                    dataIndex: i
                });

                animalDiv.append(p);
                animalDiv.append(gifIMG);


                $('.giphy').prepend(animalDiv);
            }
        });
    },
    newDogButton : function(){

        library.getGIFs($('#giphy-input').val().trim());
        library.addButton();

    },
    animateGIF : function(){

        var urlIndex = $(this).attr("dataIndex");
    console.log(urlIndex);

    if ($(this).attr('src') === stillDB[urlIndex]) {

        $(this).attr("src", gifDB[urlIndex]);

    } else {

        $(this).attr("src", stillDB[urlIndex]);
    }
    },
    clear : function(){
        $('.giphy').empty();
    }
    

}

//Start Up 

$( document ).ready(function() {

$(document).on("click", ".dog", library.dogButton);
$(document).on("click",'#addGiphy', library.newDogButton);
$(document).on("click", ".still-img", library.animateGIF);
$(document).on("click", "#clear",library.clear);

});

library.generateButtons();