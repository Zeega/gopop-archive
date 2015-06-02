// http://archive.gopop.co/users/1-0.json

$(document).ready(function() {

    fetchUser();

    window.onhashchange = function() {
        $(".post-grid-wrapper ul").empty();
        fetchUser();
    };
});

function fetchUser() {
    window.user = new UserModel();
    user.username = username();
    user.reset();
    user.fetch()
        .success(function() {
            onSuccess( user );
        });

    window.onscroll = function() {
        loadMoreOnScroll( user );
    };
}

function username() {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

      return hash;
  } else {
    return "brandao";
  }
}

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


    if ( shouldLoadMore() ) {
        user.postCollection.fetch({remove: false}).success(function() {
            onSuccess( user );
        });
    }
}

var loadMoreOnScroll = _.debounce(function( user ) {
    if ( shouldLoadMore() ) {
        user.postCollection.fetch({remove: false}).success(function() {
            onSuccess( user );
        });
    }
}, 1000);

var shouldLoadMore = function() {
    if (window.user.postCollection.canFetchMore) {
        var bottomPosition = $(".post-grid-wrapper").offset().top + $(".post-grid-wrapper").height();
        bottomPosition -= $("body").scrollTop();

        if ( bottomPosition > window.innerHeight ) {
            return false;
        }

        return true;
    }

    return false;
};


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
            userId: user.username,
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
        this.$el.remove();
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
        $("body").prepend( this.overlay.el );
    }
});

var PostCollection = Backbone.Collection.extend({

    canFetchMore: true,

    url: function() {
        var pageNumber = Math.floor(this.length / 10);
        var userId = username();
        return "http://archive.gopop.co/users/"+ user.userId +"-"+ pageNumber +".json";
    },

    model: PostModel,

    parse: function( response ) {
        this.canFetchMore = response.posts.length == 10;

        return response.posts;
    }

});

var UserModel = Backbone.Model.extend({

    username: "brandao",

    url: function() {
        return "http://archive.gopop.co/users/"+ this.username +"-0.json";
    },

    postCollection: new PostCollection(),

    parse: function( response ) {
        this.postCollection.add(response.posts);
        this.postCollection.canFetchMore = response.posts.length == 10;

        return response.user;
    },

    reset: function() {
        this.postCollection.reset();
    }

});



