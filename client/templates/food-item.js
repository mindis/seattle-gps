Template.foodItem.helpers({
  path: function () {
    return this.food.gpslink;
  },
  
  highlightedClass: function () {
    if (this.size === 'large')
      return 'highlighted';
  }
});
