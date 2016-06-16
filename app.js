$(document).ready(function(){

  var url = "https://api.spotify.com/v1/search"

  // var client_id = 'dbcc4e0718c64438976ff9bdc4af4101'; // Your client id
  // var client_secret = '12b221f2b3d84d008f1f06d9f25e079a'; // Your secret




  $("button").on("click", function(){
    var artistSearch = $("#keyword").val();
    console.log(artistSearch);
    $.ajax({
      url: url,
      type: "GET",
      data: {
        q: artistSearch,
        type: 'album'
      },
      dataType: "json"
    }).done(function(response){
      console.log("omg U SO SMART?!?!?", response)





    }).fail(function(response){
      console.log("nobody who hasn't failed succeeds", response)
    })
  });






});








//matches to artist id
//id is included in the search url for GET
