$(document).ready(function() {
    var postChain = new PostChain($("#chain-wrapper ul"));
    postChain.start();
});


function PostChain( $container ) {

    this.postCollection = new PostCollection();
    this.$container = $container;

    this.init = function() {

    }

    this.start = function() {
        this.postCollection.on("sync", this.render, this);
        // this.postCollection.on("finished_fetching", this.onFetched, this);
        // this.postCollection.on("updated", this.onUpdated, this);

        this.postCollection.fetch();
    }

    this.render = function() {
        console.log('render', this.postCollection);

        this.postCollection.each(function( post ) {
            post.view.render();
            this.$container.append( post.view.el );
        }, this);
    }

    this.init();
}

var PostView = Backbone.View.extend({

    tagName: "li",
    className: "chain-post",

    render: function () {
        var template = _.template($('#post-chain-template').html());

        this.$el.html(template({model: this.model }));
    }
});

var PostModel = Backbone.Model.extend({

    view: undefined,

    initialize: function() {
        this.view = new PostView({model: this});
    }
});

var PostCollection = Backbone.Collection.extend({

    model: PostModel,

    url: function() {
        return "http://archive.gopop.co/conversations/11.json";
    }, 

    parse: function(response) {
        var feed = response.replies;
        feed.shift(response.post);

        return feed;
    }
});