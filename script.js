$(document).ready(function(){
    $('body').hide().fadeIn(3000);
    $('body').css('background','linear-gradient(-90deg, #9303EF, #F5008B)')

});

var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "http://twitter.com/intent/tweet?text=";
var quoteUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";


function getQuote() {
    $.getJSON(quoteUrl, createTweet);
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false });
}


function createTweet(input){ // Gdzie w kodzie przekazujemy jakiś parametr do tej funkcji?
    var data = input[0]; // Zapisujemy w zmiennej pierwszą pozycję z tablicy 

    var quoteText = $(data.content).text().trim(); // co pobiera metoda .content  ze zmiennej data?
    var quoteAuthor = data.title; // O co chodzi z tym title tutaj ?

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    
    
    //if sprawdzający czy cytat nie wykaracza poza 140 symboli 
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text("Author: " + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
    
    $('.tweet').attr('href', tweet);
}


$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});

