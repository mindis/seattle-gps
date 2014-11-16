Template.categoryItem.helpers({
  path: function () {
    return Router.path('category', this.category['name']);
  },
});
