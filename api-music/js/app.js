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
	var dispArtName = result.find('.display-text2');
	var detailInfo = result.find('.display-text3');
	var infoStr = '';

	dispAlbName.text('Name: '+ tracksInfo.album.name);
	dispArtName.text('Singer: ' + tracksInfo.artists[0].name);
	result.attr('style','background-image: linear-gradient(rgba(0, 0, 0, 1) , rgba(0, 0, 0, 0.3)),url(\'' + tracksInfo.album.images[1].url +'\'); background-size: contain;' )
	infoStr += 'mp3-preview-url' + '->' + tracksInfo.preview_url + '_';
	infoStr += 'id' + '->' + tracksInfo.id +'_';
	infoStr += 'popularity' + '->' + tracksInfo.popularity +'_';
	infoStr += 'external-url' + '->' + tracksInfo.external_urls.spotify +'_';
	infoStr += 'img-url' + '->' + tracksInfo.album.images[1].url;
	detailInfo.text(infoStr);
	return result;
}
var displaySpotifyDetails = function(songNameStr,singerNameStr,detailArr){
	var details = $('.spotify-details').clone();
	var dispVid = details.find('video');
	var dispBas = details.find('.display-text1');
	var dispPop = details.find('.display-text2')
	var dispIcon = details.find('.icon');

	dispVid.attr('src', detailArr[0].split('->')[1]);
	dispVid.attr('poster', detailArr[4].split('->')[1]);
	dispIcon.attr('href', detailArr[3].split('->')[1]);
	dispBas.text(songNameStr + ' by ' + singerNameStr + '. ');
	dispPop.text('Song popularity: ' + detailArr[2].split('->')[1] + '/100');
  return details;
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



$(document).ready( function() {
	event.preventDefault();
		// $('.result').show();
	$('.top-layer').show();
	$('.detail-result').hide();
	$('.result-body').hide();
	$('.result').hide();
	$('.search-spotify, nav .search-general').submit( function(e){
		e.preventDefault();
		$('.top-layer').hide();
		$('.result-body').show();
		$('.result').show();
		$('.detail-result').hide();

		// zero out results if previous search has run
		// !!! need to change this later !!!
		$('.spotify-wrapper').html('');
		$('.result-body').html('');
    resetGlobalVar();
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		$('nav .text-input').attr('value',tags);
    searchSpotify(tags,'track', searchMax);


		// $('.search-spotify')[0].reset();
	});
	$(document).on('click','.tracks-result',function(event){
		var nameStr = $(this).find('.display-text1').text().split(': ', 2)[1];
		var singerStr = $(this).find('.display-text2').text().split(': ', 2)[1];
		var detailArr = $(this).find('.display-text3').text().split('_');
		// console.log(nameStr);
		// console.log(singerStr);
		console.log(detailArr);
		$('.detail-result .spotify-wrapper').append(displaySpotifyDetails(nameStr,singerStr,detailArr))
		getMM(nameStr,singerStr);
		// getTK(nameStr,singerStr);
		// getBT(nameStr,singerStr);
		$('.detail-result').show();

	})

	$('.logo-small').on('click',function(){
		$('.result-body').hide();
		$('.result').hide();
		$('.detail-result').hide();
		$('.top-layer').show();
	});
});

var getMM = function(name,artist){
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
		console.log('searched musizmatch');
		console.log(result);
		if(result.message.body.length === 0){
			console.log('no result from musizmatch');
			return;
		};
		// console.log(result.message.body.length);
		console.log(result.message.body.lyrics.lyrics_id);
		console.log(result.message.body.lyrics.lyrics_body);
	});
	return;
};
var getTK = function(name,artist){
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
			console.log('searched tastekid');
			console.log(result);
			if(result.length === 0){
				console.log('no result from tastekid');
				return
			};
			// console.log(result.Similar.Info[0]);
		});
}

var getBT = function(name,artist){
	var urlBandsintown1 = 'http://api.bandsintown.com/artists/' + artist + '/events.json?api_version=2.0&app_id=spotifisearch&callback=?';
	$.getJSON(urlBandsintown1,
		function(result){
			console.log('search bandsintown1')
			console.log(result);
			if(result.length === 0){
				console.log('no result from bandsintown1');
				return
			};
		})
	var urlBandsintown2 = 'http://api.bandsintown.com/artists/'+ artist +'/events/search?format=json&app_id=spotifisearch&api_version=2.0&location=use_geoip&radius=150&callback=?'
	$.getJSON(urlBandsintown2,
		function(result){
			console.log('search bandsintown2')
			console.log(result);
			if(result.length === 0){
				console.log('no result from bandsintown2');
				return;
			};
		})
	return;
}



// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
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
