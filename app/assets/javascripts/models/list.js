window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",

  url: function() {
    return "/api/boards/" + this.get("board_id") + "/lists";
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards();
    }
    this._cards.comparator = "rank";
    return this._cards;
  },

  parse: function(resp){
    if(resp.cards){
      this.cards().set(resp.cards);
      delete resp.cards
    }
    return resp
  }


});