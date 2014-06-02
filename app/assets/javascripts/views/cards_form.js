window.Trellino.Views.CardsForm = Backbone.View.extend({
  templateFullForm: JST["cards/form"],
  templateButton: JST["cards/form_button"],

  initialize: function(options) {
    this.list = options.list;
    this.open = false;
  },

  events: {
    "submit form": "submit",
    "click button.display-add-card": "toggleForm"
  },

  toggleForm: function() {
    this.open = true;
    this.render();
  },

  render: function() {
    var renderedContent;

    if (!this.open) {
      renderedContent = this.templateButton();
    } else {
      renderedContent = this.templateFullForm({
        list: this.list
      });
    }
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["card"];
    var card = new Trellino.Models.Card(params);
    var view = this;
    card.save({}, {
      success: function(response) {
        card.collection = view.list.cards();  // test without this
        view.list.cards().add(card);
        view.open = false;
        view.render();
      }
    });
  }

});
