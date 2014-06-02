window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",

  lists: function() {
    if (!this._lists) {
      this._lists = new Trellino.Collections.Lists();
    }
    this._lists.comparator = "rank";
    this._lists.sort();
    return this._lists;
  },

  parse: function(resp) {
    if (resp.lists) {
      this.lists().set(resp.lists, {parse: true})
      delete resp.lists
    }
    return resp;
  }

});