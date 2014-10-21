$(document).ready(function() {

    var post = new PostModel();
    post.fetch()
        .success(function() {
            onSuccess( post );
        });

});


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
        return "http://archive.gopop.co.s3-us-west-1.amazonaws.com/posts/118680.json";
    }

});
