var nameArrST = [];
var artistArrST = [];
var countST = 0;
var dispQuanity = 16;
var searchMax = 50;
var resetGlobalVar = function(){
	nameArrST = [];
	artistArrST = [];
	searchCount = 0;
	return;
}
//This function search on spotify.com ofr artist, album
var displayTracks = function(tracksInfo){
	//pass tracksInfo object to html
  var result = $('.templates .tracks-result').clone();
	var dispAlbName = result.find('.display-text1');
	dispAlbName.text('Name: '+ tracksInfo.album.name);
	var dispArtName = result.find('.display-text2');
	dispArtName.text('Singer: ' + tracksInfo.artists[0].name);
	result.attr('style','background-image: linear-gradient(rgba(0, 0, 0, 1) , rgba(0, 0, 0, 0.3)),url(\'' + tracksInfo.album.images[1].url +'\'); background-size: contain;' )
	return result;
}
var searchSpotify = function(searchQuery, searchType, searchLimit){
	var request = {
		q: searchQuery,
		type: searchType,
		limit: searchLimit
	}
	var settings = {
		async: true,
		crossDomain: true,
		url: "https://api.spotify.com/v1/search",
		method: "GET",
		data: request,
		type: 'json',
	}
	switch(searchType){
		case 'artist':
			searchArtist(settings);
			break;
		case 'album':
			searchAlbum(settings);
			break;
		default:
			searchTracks(settings);
	}
	return;
}

var searchTracks = function(settings){
	$.ajax(settings)
	.done(function(result){
		console.log('loaded searchTracks->');
		console.log(result.tracks.items);

		(result.tracks.items).forEach(function(element,index){
			nameArrST.push(element.album.name);
			artistArrST.push(element.artists[0].name)
			//The following code prevents repeating songs.
			if(nameArrST.indexOf(element.album.name) != index && artistArrST.indexOf(element.artists[0].name) != index ){
				console.log('there is repeat!');
				return;
			}
			searchCount ++;
			if (searchCount > dispQuanity){return;}
			$('.result-body').append(displayTracks(element));
		})
		console.log(searchCount);
	})
}
var searchArtist = function(settings){
	$.ajax(settings)
	.done(function(result){
		console.log(result);
		console.log(result.artists.items);
	})
}
var searchAlbum = function(settings){
	$.ajax(settings)
	.done(function(result){
		console.log(result);
	})
}


$(document).ready( function() {
	event.preventDefault();
		// $('.result').show();
	$('.top-layer').show();
	$('.search-spotify, nav .search-general').submit( function(e){
		e.preventDefault();
		$('.top-layer').hide();
		$('.result').show();
		// zero out results if previous search has run
		// !!! need to change this later !!!
		$('.result-body').html('');
    resetGlobalVar();
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		$('nav .text-input').attr('value',tags);
    searchSpotify(tags,'track', searchMax);


		// $('.search-spotify')[0].reset();
	});
	$('.logo-small').on('click',function(){
		$('.result').hide();
		$('.top-layer').show();
	})
});

//****************************************************************************************************************

var getLyrics = function(name,artist){
	console.log(name + ' by ' + artist);
	$.ajax({

			url: "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
	    //jsonp: false,
	    dataType: "jsonp",
			jsonp: 'callback',
	    data: {
							q_track: name,
							q_artist: artist,
							apikey: '33620d00ea8d8795ff4e49f0b4549d03',
							format: 'jsonp',
	    }
	}).done(function(result){
		// console.log(result);
		console.log(result.message.body.lyrics.lyrics_id);
		console.log(result.message.body.lyrics.lyrics_body);
	});
	$.ajax({
			url: "https://www.tastekid.com/api/similar",
	    //jsonp: false,
	    dataType: "jsonp",
			jsonp: 'callback',

	    data: {
							k: '240254-BingDai-6SQWHIFJ',
							q: artist,
							info: 1,
							type: 'music',
							format: 'jsonp',
	    }
	}).done(function(result){
		console.log('search tastekid');
		console.log(result);
		console.log(result.Similar.Info[0]);
	});

	var urlBandsintown1 = 'http://api.bandsintown.com/artists/' + artist + '/events.json?api_version=2.0&app_id=spotifisearch&callback=?';
	$.getJSON(urlBandsintown1,
		function(data){
			console.log('search bandsintown1')
			console.log(data);
		})
	var urlBandsintown2 = 'http://api.bandsintown.com/artists/'+ artist +'/events/search?format=json&app_id=spotifisearch&api_version=2.0&location=use_geoip&radius=150&callback=?'
	$.getJSON(urlBandsintown2,
		function(data){
			console.log('search bandsintown2')
			console.log(data);
		})
	return;
}

var showAlbum = function(item) {
	var result = $('.templates .question').clone();
	var displayText = result.find('.display-text');
	displayText.text(item.name);
	var displayImg = result.find('.display-img');
	var imgHtml = '<img src="'+
	item.album.images[0].url +
	'" alt="'+
	item.id +
	'" />';
	displayImg.html(imgHtml)
	return result;
};


// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
