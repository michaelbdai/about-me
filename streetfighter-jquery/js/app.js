$(document).ready(function() {
  $('.ryu').mouseenter(function() {
    $('.ryu-still').hide();
    $('.ryu-ready').show();
  })
  .mouseleave(function() {
    $('.ryu-ready').hide();
    $('.ryu-still').show();
  })
  .mousedown(function() {
    playHadouken(); // why this works? playHadouken is not defined yet!!!
    $('.ryu-ready').hide();
    $('.ryu-throwing').show();
    $('.hadouken').finish().show()
    .animate(
      {'left': '1020px'},
      500,
      function() {
        $('.hadouken').hide();
        $('.hadouken').css('left', '520px');
      }
    );
  })
  .mouseup(function() {
    $('.ryu-throwing').hide();
    $('.ryu-ready').show();
    // ryu goes back to his ready position
  });

    $(document).keydown(function(e) {
      if (e.keyCode == 88) {
        $('.ryu-action').hide();
        $('.ryu-cool').show();
      }
    }).keyup(function(e) {
      if (e.keyCode == 88) {
        $('.ryu-cool').hide();
        $('.ryu-still').show();
      }
    })
});
function playHadouken () {
  $('#hadouken-sound')[0].volume = 0.5;
  $('#hadouken-sound')[0].load();
  $('#hadouken-sound')[0].play();
}
