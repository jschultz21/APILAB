$(document).ready(function(){

  $('input').keypress(function (e) {
  if (e.keycode === 13) {
    $('button').submit();
  }
});

  var url = "https://api.spotify.com/v1/search"

  $("button").on("click", function(){

    $('#relatedArtists img').remove();
    var keyword = $("#keyword").val();
    console.log(keyword);
    $.ajax({
      url: url,
      type: "GET",
      data: {
        q: keyword,
        type: 'artist'
      },
      dataType: "json"
    }).done(function(response){
      test=response;
      console.log("omg u so SMRT?!", response);
      var artistSearch = response.artists.items[0].id;
      var artistChosen = response.artists.items[0].name;

      $("h1").html("so you like "+artistChosen+"? check out these bands:")

      relatedArtists(artistSearch);
    }).fail(function(response){
      console.log("failure is the tuition you pay for success", response)
    })


    var relatedArtists = function (artistSearch){
      $.ajax({
        url: "https://api.spotify.com/v1/artists/"+artistSearch+"/related-artists",
        type: "GET",
        data: {
          type: 'related-artists'
        },
        dataType: "json"
      }).done(function(response){
        console.log("RELATED ARTISTS SUCCESS", response);
        for (var i=0; i<response.artists.length; i++){
          var imgUrl = response.artists[i].images[0].url;
          var artistName = response.artists[i].name;
          var artistPageUrl = response.artists[i].external_urls.spotify

          var link=$('<a href="'+artistPageUrl+'"></a>')

          var img = $("<img/>");
          img.attr("src", imgUrl)
          img.attr("alt", artistName)
          link.append(img);
          $("#relatedArtists").append(link);

          var artistHeading = '<h2><span>'+artistName+'</span></h2>'
          $("#relatedArtists img").append(artistHeading);
        }


      }).fail(function(response){
        console.log("failure is the tuition you pay for success pt II", response)
      })
    }
  });

});
