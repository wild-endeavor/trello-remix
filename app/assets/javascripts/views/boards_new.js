window.Trellino.Views.BoardsNew = Backbone.View.extend({

  template: JST["boards/new"],

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});