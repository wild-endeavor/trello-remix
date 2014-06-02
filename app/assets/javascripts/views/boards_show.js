window.Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function(options) {
    this.model = options.model    // again, probably not necessary
    this.listenTo(this.model, "change sync", this.render);
    this.listenTo(this.model.lists(), "sync add remove", this.render);

    var thatBoardView = this;

    this.model.lists().each(function(list) {
      var listView = new Trellino.Views.ListsShow({
        model: list
      });
      thatBoardView.addSubview("#list-container", listView);
    });
  },

  events: {
    "click button.add-list": "addNewList",
    "submit form#new-list-form": "newListSubmit"
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    // Make lists sortable
    _(this.subviews("#list-container")).each(function(subview) {
      subview.assignSortable();
    });

    return this;
  },

  addNewList: function(event) {
    event.preventDefault();
    $("#new-list-modal").modal();
  },

  processNewList: function(list) {
    var listView = new Trellino.Views.ListsShow({
      model: list
    });
    this.addSubview("#list-container", listView);
    this.model.lists().add(list);
  },

  newListSubmit: function(event) {
    event.preventDefault();
    var newList = new Trellino.Models.List($(event.target).serializeJSON()["list"]);
    var latestList = this.model.lists().last();
    var newRank = 1;
    if (latestList) { newRank = latestList.get("rank") + 1; }
    var boardId = this.model.id;
    var view = this;

    newList.save({
      rank: newRank,
      board_id: boardId
    },{
      success: function(response) {
        $('#new-list-modal').modal("hide");
        $('.modal-backdrop').remove();
        view.processNewList(newList);
      }
    });
  }

});
