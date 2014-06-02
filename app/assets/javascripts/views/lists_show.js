window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  events: {
    
  },

  initialize: function(options) {
    this.listenTo(this.model.cards(), "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);

    // Add subviews for the existing cards
    var thatListView = this;
    this.model.cards().each(function(card) {
      var cardView = new Trellino.Views.CardsShow({
        model: card,
        collection: thatListView.model.cards()
      });
      thatListView.addSubview(".card-container", cardView);
    });

    // Add a subview for the new card form
    var newCardView = new Trellino.Views.CardsForm({
      list: this.model
    });
    this.addSubview(".new-card-form", newCardView);
  },

  render: function() {
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  assignSortable: function() {
    var view = this;
    this.$el.find(".card-container").sortable({
      // axis: "rank",
      update: function(event, ui) {
        var data = $(this).sortable("serialize");
        var list_id = view.model.id;
        var url = "/api/lists/" + list_id + "/card_order";
        console.log(data);
        console.log(url);
        $.ajax({
          data: data,
          url: url,
          type: "POST",
          success: function(response) {
            _(response).each(function(orderPair) { view.model.cards().get(orderPair[0]).set("rank", orderPair[1])});
          }
        });
      }
    });
  },

  addCard: function(card) {
    var cardView = new Trellino.Views.CardsShow({
      model: card,
      collection: this.model.cards()
    });
    this.addSubview(".card-container", cardView);
  },

  removeCard: function(card) {
    var subview = _.find(this.subviews(".card-container"),
      function (subview) {
        return subview.model === card;
      });

    this.removeSubview(".card-container", subview);
    this.render();
  },

  addAddCardForm: function(event) {
    event.preventDefault();
    var view = this;
    // debugger

  }

});