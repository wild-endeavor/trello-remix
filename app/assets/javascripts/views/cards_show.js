window.Trellino.Views.CardsShow = Backbone.CompositeView.extend({
  template: JST["cards/show"],

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "mouseenter .well" : "toggleCardDelete",
    "mouseleave .well" : "toggleCardDelete",
    "click button.delete-card": "deleteCard"
  },

  // Set attributes so that sortable can properly serialize
  attributes: function() {
    return { 
      id: "card_" + this.model.id,
    };
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  toggleCardDelete: function(event) {
    if (event.type === "mouseenter") {
      $(event.currentTarget).find('button').show();
    }
    else {
      $(event.currentTarget).find('button').hide();
    }
  },

  deleteCard: function(event) {
    event.preventDefault();
    this.collection.get($(event.target).attr("data-id")).destroy();
  }

});