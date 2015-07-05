// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
var gmapsAPI = "https://maps.googleapis.com/maps/api/streetview?location={0} {1}&size=800x600";
var nyTimesAPI = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=0e053e4d1fbb2fbd1386812b0ff6d4b9:15:72433640&sort=newest&h1=true";
var wikiAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search={0}&callback=wikiCallBack&format=json";
var $street = $('#street').val();
var $city = $('#city').val();
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
    var $nytHeaderElem = $('#nytimes-header');
    var $greeting = $('#greeting');


    // load streetview

    // YOUR CODE GOES HERE!
    var location = gmapsAPI.format($street, $city);
    $body.append('<img class="bgimg" src="' + location + '"></img>')

    getNews();
    getWiki();

    return false;
};

function getNews(){
    var $nytElem = $('#nytimes-articles');
    $nytElem.html("");
    $street = $('#street').val();
    $city = $('#city').val();

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
    })
    .error(function(){
        $nytElem.append('New York Times news could not be loaded');
    });
};

function getWiki(){
    var $wikiElem = $('#wikipedia-links');
    $wikiElem.html("");
    $street = $('#street').val();
    $city = $('#city').val();

    $.ajax({
      url: wikiAPI.format($city),
      dataType: 'jsonp'
    })
    .complete(function(data){
        console.log(data.responseJSON);
        var html = "";
        for(i = 1; i <= 3; i++){
            for(n = 0; n <= data.responseJSON[1].length; n++){
                html += '<a href="' + data.responseJSON[3][n] + '"><h4>' + data.responseJSON[1][n] + '</h4></a>';
                html += '<p>' + data.responseJSON[2][n] + '</p>';
            }
        }
        $wikiElem.append(html);
    })
    .error(function(){
        $wikiElem.append('Wikipedia entries could not be loaded');
    });

}

$('#form-container').submit(loadData);
