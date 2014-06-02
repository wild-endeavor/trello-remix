window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
  },

  boardsIndex: function() {
    var boardsIndexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });
    Trellino.Collections.boards.fetch();
    this._swapView(boardsIndexView);
  },

  boardsNew: function() {
    var newBoardView = new Trellino.Views.BoardsNew();

    this._swapView(newBoardView);
  },

  boardsShow: function(id) {
    var boards = Trellino.Collections.boards;
    var board = boards.getOrFetch(id);
    var boardShowView = new Trellino.Views.BoardsShow({
      model: board
    });
    this._swapView(boardShowView)
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;

    $('#content').html(view.render().$el);
  }


});