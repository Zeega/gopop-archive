$(document).ready(function() {

    var post = new PostModel({id: postId()});
    post.fetch()
        .success(function() {
            onSuccess( post );
        });

});

function postId() {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

      return hash;
  } else {
    return 1111;
  }
}

function onSuccess( post ) {
    $(".post-animated-image img").attr("src", post.get("video").gif_url);
    $(".post-caption").text(post.get("caption"));
    $(".user-profile-image").css({
        backgroundImage: "url("+ post.get("user").profile_image +")",
        backgroundSize: "cover",
        backgroundPosition: "center"
    });
    $(".user-username").text(post.get("user").username);
}


var PostModel = Backbone.Model.extend({

    url: function() {

        return "http://archive.gopop.co.s3-us-west-1.amazonaws.com/posts/"+ this.id +".json";
    }

});
