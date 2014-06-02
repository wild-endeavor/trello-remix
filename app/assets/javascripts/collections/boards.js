window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: Trellino.Models.Board,

  getOrFetch: function(id) {
    var model = this.get(id);
    var boards = this;

    if (model) {
      model.fetch();
      return model;
    } else {
      model = new this.model({ id: id });
      model.fetch({
        success: function () { boards.add(model); }
      });
      return model;
    }
  }
  
});