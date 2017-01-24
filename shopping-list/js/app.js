$(document).ready(function() {

  $("#js-shopping-list-form").submit(function(event) {
    event.preventDefault();
    if ($("#shopping-list-entry").val() === ''){
      alert('the name cannot be blank.');
      return;
    } else if($("#shopping-list-entry").val() === ' '){
      alert('the name cannot be space only.');
      return;
    } else if(!/^[\w\s]+$/.test($("#shopping-list-entry").val())){
      alert('The name of item can only contains letter, number and space.');
      return;
    };

    $(".shopping-list").append(
    '<div class = "item-wrapper">' +
      ' <span class="shopping-item">' +
      $("#shopping-list-entry").val() +
      '</span>' +
      '<div class="shopping-item-controls">' +
        '<button class="shopping-item-toggle">' +
          '<span class="button-label">check</span>' +
        '</button>' +
        '<button class="shopping-item-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' + // + is needed here.
      '</div></div>'
    );
    $("#js-shopping-list-form")[0].reset(); // remove the submitted item from the form input
  });

  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
  $(this).closest(".item-wrapper").remove();
  });

  $(document).on('click','.shopping-item-toggle', function(event) {
   $(this).closest(".item-wrapper").find(".shopping-item").toggleClass("shopping-item__checked");

  });

});
