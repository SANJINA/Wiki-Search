$(document).ready(function() {
  $('.cardarea').on('mouseenter', '.cards', function() {
    console.log('working');
    $(this).addClass('expand');
  });

  $('.cardarea').on('mouseleave', '.cards', function() {
    console.log('working');
    $(this).removeClass('expand');
  });

  var baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srsearch=';
  var basePageUrl = 'https://en.wikipedia.org/wiki/'

  $('#search').keyup(function() {
    var term = $('#search').val();
    var queryTerm = term.replace(" ", "%20");

    if (term.length > 3) {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srsearch=' + queryTerm,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data) {
          var output = ''
          for (i = 0; i < data.query.search.length; i++) {
            output += '<div class="cards">';
            var Title = data.query.search[i].title;
            var urlTitle = Title.replace(" ", "_");
            output += '<h3><a href="' + basePageUrl + urlTitle + '" target="_blank">' + Title + '</a></h3>';
            output += '<h5>' + data.query.search[i].snippet + '</h5>';
            output += '</div>'
          };
          $('.cardarea').html(output);
        },
        error: function() {
          alert('Failed!');
        },
      }); //AJAX request
    } // Start when term is > 3 chars long	
  }); //kepup function
}); //document ready