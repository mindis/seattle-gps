Template.categoryItem.helpers({
  path: function () {
    return Router.path('recipe', this.recipe);
  },
  
  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  },
  
});
