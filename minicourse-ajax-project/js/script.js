// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
var gmapsAPI = "https://maps.googleapis.com/maps/api/streetview?location={0} {1}&size=1920x1080";
var nyTimesAPI = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=0e053e4d1fbb2fbd1386812b0ff6d4b9:15:72433640&sort=newest&h1=true";
var news = "";

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
};


function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street').val();
    var $city = $('#city').val();

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var location = gmapsAPI.format($street, $city);
    $body.append('<img class="bgimg" src="' + location + '"></img>')



    return false;
};

function getNews(){
    var $nytElem = $('#nytimes-articles');
    $.ajax({
      url: nyTimesAPI
    })
    .done(function(data){
        news = data.response.docs;
        for(i = 0; i < 10; i++){
            var html = '<a href="' + news[i].web_url + '" target="blank"><h4>' + news[i].headline.main + '</h4></a>';
            html += '<p>' + news[i].snippet + '</p>';
            $nytElem.append(html);
        }
        console.log(news);
    });
};

$('#form-container').submit(loadData);
getNews();
