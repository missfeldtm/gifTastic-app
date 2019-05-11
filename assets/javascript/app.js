/*
General Comments

GET /v1/gifs/search

http://api.giphy.com/v1/gifs/search?&api_key=j80jTkTqUy0IVw0FRC2y0lp3NLCAqOCC&q=rainbow


*/

//set all fxns into an object

var library = {
    generateButtons : function(){
        for (var i = 0; i < animals.length; i++) {

            createBtn(animals[i]);
        }
    },
    
}

var gifDB = [];
var stillDB = [];

var imageStill;
var gif;

var animals = ['Golden Retriever', 'Newfoundland', 'Bernese Mountain Dog', 'Bassett Hound'];


function generateButtons() {
    for (var i = 0; i < animals.length; i++) {

        createBtn(animals[i]);
    }
}

function createBtn(val) {

    var btn = $('<button>');

    btn.attr({
        dataName: "animals",
        class: "btn dog",
    });

    btn.text(val);
    $('#btn-area').append(btn);

}

$(document).on("click",".dog", function (){
   
    var search = $(this).text();
    getGIFs(search);


});


function addButton() {
    var dogVal = $('#giphy-input').val().trim();

    //add value to array 
    animals.push(dogVal);

    //regenerate Buttons
    createBtn(dogVal);

    return false;
}
//
function getGIFs(input){
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

};

$('#addGiphy').on("click", function () {
    getGIFs($('#giphy-input').val().trim());

    addButton();
    
});


$(document).on("click", ".still-img", function() {

    var urlIndex = $(this).attr("dataIndex");
    console.log(urlIndex);

   if($(this).attr('src')===stillDB[urlIndex]){

        $(this).attr("src", gifDB[urlIndex]);

    }else{

        $(this).attr("src", stillDB[urlIndex]);
    }

});

$(document).on("click", "#clear", function() {

$('.giphy').empty();

});

generateButtons();