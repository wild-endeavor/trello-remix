window.Trellino.Models.Card = Backbone.Model.extend({
  url: function() {
    if (this.isNew()) {
      return "/api/lists/" + this.escape("list_id") + "/cards";
    } else {
      return "/api/cards/" + this.id;
    }
  }
});