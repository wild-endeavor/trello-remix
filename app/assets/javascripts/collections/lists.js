window.Trellino.Collections.Lists = Backbone.Collection.extend({
  url: function() {
    return "/api/boards/" + this.get("board_id") + "/lists";
  },
  model: Trellino.Models.List



});