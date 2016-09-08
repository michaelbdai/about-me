$(document).ready(function() {
	doIntro();
	playGame();
});

var hadoukenSound = false;
function playHadouken () {
  hadoukenSound = !hadoukenSound;
  if (hadoukenSound) {
    $('#hadouken-sound').volume = 0.5;
    $('#hadouken-sound').load();
    $('#hadouken-sound').play();
    // $('#hadouken-sound')[0].volume = 0.5;
    // $('#hadouken-sound')[0].load();
    // $('#hadouken-sound')[0].play();
  }
}

var coolSound = false;
function playCool () {
  coolSound = !coolSound;
  if (coolSound) {
    $('#theme-song')[0].pause();
    $('#cool')[0].play();
  }
}


function playGame() {
  $('.ryu').mouseenter(function() {
    $('.ryu-action').hide();
    $('.ryu-ready').show();
  })
  .mouseleave(function() {
    $('.ryu-action').hide();
    $('.ryu-still').show();
  })
  .mousedown(function() {
    playHadouken();
    $('.ryu-action').hide();
    $('.ryu-throwing').show();
    $('.hadouken')
    .finish()
    .show()
    .animate(
      {'left': '300px'},
      500,
      function() {
        $('.hadouken').stop();
        $('.hadouken').hide();
        $('.hadouken').css('left', '-212px');
      }
    );
  })
  .mouseup(function() {
    $('.ryu-action').hide();
    $('.ryu-still').show();
  });

  $(document).keydown(function(key) {
    if (key.keyCode == 88) {
      playCool();
      $('.ryu-action').hide();
      $('.ryu-cool').show();
    }
  })
  .keyup(function(key) {
    if (key.keyCode == 88) {
      $('#cool')[0].pause();
      $('#cool')[0].load();
      $('.ryu-cool').hide();
      $('.ryu-still').show();
    }
  });
}

function doIntro() {
  $('#theme-song')[0].volume = 0.1;
  $('#theme-song')[0].play();
  $('.sf-logo').fadeIn(3500, function() {
    $('.sf-logo').fadeOut(1000, function() {
      $('.brought-by').fadeIn(1500, function() {
        $('.brought-by').fadeOut(1000, function() {
          $('.jquery-logo').fadeIn(1500, function() {
            $('.jquery-logo').fadeOut(1500, function(){
              $('.how-to').fadeIn(1000);
            });
          })
        })
      })
    })
  })
}
