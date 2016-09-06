$(document).ready(function() {

  $("#js-shopping-list-form button").click(function(event) {
    event.preventDefault(); // stops default browser behavior for form submission
    $(".shopping-list").append(
    '<li>' +
      ' <span class="shopping-item">' +
      $("#shopping-list-entry").val() +
      '</span>' +
      '<div class="shopping-item-controls">' +
        '<button class="shopping-item-toggle">' +
          '<span class="button-label">check</span>' +
        '</button>' +
        '<button class="shopping-item-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' +
      '</div>' +
    '</li>'
    );
    $("#js-shopping-list-form")[0].reset(); // remove the submitted item from the form input
  });

  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
  $(this).closest("li").remove();
  });

  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    $(this).closest("li").find(".shopping-item").toggleClass("shopping-item__checked");
  });

  // ??? why it has to be $(this)
  // $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
  //   this.closest("li").find(".shopping-item").toggleClass("shopping-item__checked");
  // });


  //??? why the following doesn't work
  // $('.shopping-item-toggle').on('click', '.shopping-item-toggle', function(event) {
  //   $(this).closest("li").find(".shopping-item").toggleClass("shopping-item__checked");
  // });

});
