var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  feedSubscription = Meteor.subscribe('feed');
  Meteor.subscribe('posts');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('latestActivity', function() {
      dataReadyHold.release();
    });
  }
});

FeedController = RouteController.extend({
  onBeforeAction: function() {
    this.feedSubscription = feedSubscription;
  }
});

RecipesController = RouteController.extend({
  data: function() {
    return _.values(RecipesData);
  }
});

BookmarksController = RouteController.extend({
  onBeforeAction: function() {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else
      Overlay.open('authOverlay');
  },
  data: function() {
    if (Meteor.user())
      return _.values(_.pick(RecipesData, Meteor.user().bookmarkedRecipeNames));
  }
});

RecipeController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('recipe', this.params.name);
  },
  data: function() {
    return RecipesData[this.params.name];
  }
});

CategoryController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('category', this.params.name);
  },
  data: function() {
    return CategoryData[this.params.name];
  }
});

AdminController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('news');
  }
});

FoodsController = RouteController.extend({
  data: function() {
    return Posts.find({}, {sort: {"order": 1}});
  }
});

Router.map(function() {
  this.route('landing', {path: '/', layoutTemplate: 'landingLayout'} );
  this.route('home');
  this.route('feed');
  this.route('recipes');
  this.route('category');
  this.route('foodsmap');
  this.route('foods', {controller: 'FoodsController'});
  this.route('guide', {controller: 'FoodsController'});
  this.route('event', {controller: 'FoodsController'});
  this.route('life', {controller: 'FoodsController'});
  this.route('culture', {controller: 'FoodsController'});
  this.route('cityguide', {controller: 'FoodsController'});
  this.route('getaway', {controller: 'FoodsController'});
  this.route('specials', {controller: 'FoodsController'});
  this.route('bookmarks');
  this.route('about');
  this.route('recipe', {path: '/recipes/:name'});
  this.route('admin', { layoutTemplate: null });
});

Router.onBeforeAction('dataNotFound', {only: 'recipe'});
