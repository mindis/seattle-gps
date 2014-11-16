Template.categoryItem.helpers({
  path: function () {
    return Router.path(this.category['name'].toLowerCase());
  },
});
