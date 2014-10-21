// http://archive.gopop.co/users/1-0.json

$(document).ready(function() {

    var user = new UserModel();
    user.fetch()
        .success(function() {
            onSuccess( user );
        });

});


function onSuccess( user ) {
    $(".user-profile-image").css({
        backgroundImage: "url("+ user.get("profile_image") +")",
        backgroundSize: "cover",
        backgroundPosition: "center"
    });
    $(".user-username").text(user.get("username"));
    $(".user-fullname").text(user.get("full_name"));

    user.postCollection.each(function(postModel) {
        var gridSquare = postModel.view;

        gridSquare.render();
        $(".post-grid-wrapper ul").append( gridSquare.el );
    });
}


var PostGridView = Backbone.View.extend({
    tagName: "li",
    className: "post-grid-square",

    events: {
        click: "viewPost"
    },

    viewPost: function() {
        this.model.showPostOverlay();
    },

    render: function () {
        var template = _.template($('#post-grid-template').html());
        var args = {
            postId: this.model.id,
            coverA: this.model.get("clips")[0].thumbnail_url,
            coverB: this.model.get("clips")[1].thumbnail_url
        };

        this.$el.html(template(args));
    }
});

var PostOverlayView = Backbone.View.extend({
    tagName: "div",
    className: "post-overlay",

    events: {
        "click .close-overlay": "closeOverlay"
    },

    closeOverlay: function() {
        console.log('closeOverlay')
        this.$el.remove()
    },

    render: function () {
        var template = _.template( $('#post-overlay-template').html() );

        this.$el.html(template({model: this.model }));
    }
});

var PostModel = Backbone.Model.extend({
    view: undefined,
    overlay: undefined,

    initialize: function() {
        this.view = new PostGridView({model: this});
    },

    showPostOverlay: function() {
        this.overlay = new PostOverlayView({model: this});
        this.overlay.render();
        $("body").prepend( this.overlay.el )
    }
});

var PostCollection = Backbone.Collection.extend({

    model: PostModel
    // url: function() {
    //     return "http://archive.gopop.co/users/1-0.json";
    // }

});

var UserModel = Backbone.Model.extend({

    url: function() {
        return "http://archive.gopop.co/users/1-0.json";
    },

    postCollection: new PostCollection(),

    parse: function( response ) {
        this.postCollection.add(response.posts)

        return response.user;
    }

});



