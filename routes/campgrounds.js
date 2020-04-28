var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// INDEX -- show all campgrounds
router.get("/", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// NEW -- show form to create new campground (two routes needed to create new)
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new")
});

// CREATE -- add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = { name: name, price: price, image: image, description: description, author: author };

  // 1) get data from form and save to db
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      // 2) redirect back to campgrounds page
      res.redirect("campgrounds");
    }
  });
});

// SHOW -- shows more info about one campground
router.get("/:id", function (req, res) {
  // 1) find campground by id
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("error", "Campground not found - err from DB");
      res.redirect("back");
    } else {
      // 2) render template with campground info
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnerShip, function (req, res) {
  // Campground.findById(req.params.id, function (err, foundCampground) {

  //using foundCampground from res.locals set in checkCampgroundOwnership
  res.render("campgrounds/edit", { campground: res.locals.foundCampground });
  // });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnerShip, function (req, res) {
  //find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
    if (err) {
      res.redirect("/campground");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  //then redirect somewhere (show page of that campground)
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnerShip, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});




module.exports = router;