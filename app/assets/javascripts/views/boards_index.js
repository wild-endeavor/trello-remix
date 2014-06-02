window.Trellino.Views.BoardsIndex = Backbone.View.extend({

  initialize: function (options) {
    this.collection = options.collection; // this may not be necessary
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    'click button.new-board': "navigateNewBoard"
  },

  template: JST["boards/index"],

  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },

  navigateNewBoard: function() { Backbone.history.navigate("boards/new", {trigger: true}); }

});