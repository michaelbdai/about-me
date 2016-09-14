$(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest1(searchTerm);
    $('#feedback').html('Click on the image and see what happens!');

  });


  $(document).on('click','img',function(event){
    console.log(this.alt);
    var urlVideo = 'https://www.youtube.com/embed/' + this.alt;
    console.log(urlVideo);
    var htmlVideo = '<iframe style="z-index:1000;" width="500" height = "400" src="' + urlVideo + '"></iframe>';
    event.stopPropagation();
    $(event.currentTarget).parent().html(htmlVideo);

  })
});

function getRequest1(searchTerm){
  var params = {
    part: 'snippet',
    key: 'AIzaSyDwXJ0nozl17ONdaoby2TqVHaTHXa8FCQ0',
    q: searchTerm
  };
  var url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, function(data){
    idUrl = showResults(data);
    console.log(idUrl);
    function toHtml(arr){
      return "<div class='new-img'><img src='" + arr[1] + "' alt='" + arr[0] + "' style='width: 500px; display:block;' /></div>";
    }
    var htmlImag = '';
    idUrl.forEach(function(element){htmlImag += toHtml(element); return;});
    console.log(htmlImag)
    $('.display-img').html(htmlImag);
  });
  return
}

function showResults(results){
  // console.log(results);
  console.log(results.items);

  var idUlrArr = results.items.map(function(element){return [element.id.videoId , element.snippet.thumbnails.high.url]})
  console.log(idUlrArr);

  return idUlrArr;
}
