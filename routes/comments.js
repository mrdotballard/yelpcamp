var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// comments new
router.get("/new", middleware.isLoggedIn, function (req, res) {
  // find campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) throw err;
    else {
      res.render("comments/new", { campground: campground });

    }
  });
});

// comments create
router.post("/", middleware.isLoggedIn, function (req, res) {
  // lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      req.flash("error", "Unable to add comment - error returned from DB");
      res.redirect("/campgrounds");  //add error message later for user
    }
    else {
      // create new comment
      Comment.create(req.body.comment, function (err, comment) {
        if (err) throw err;
        else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // conenct new comment to campground
          campground.comments.push(comment);
          campground.save();
          console.log(comment);

          req.flash("success", "Successfully added comment");
          // redirect to campground show page
          res.redirect('/campgrounds/' + campground._id);
        }
      });
      console.log(req.body.comment);
    }
  })
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnerShip, function (req, res) {
  //code change to guard againts user chaning id in url, either campground or comment
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err || !foundCampground) {
      req.flash("error", "Can not find campground - error from DB");
      res.redirect("back");
    }

    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
      }
    });
  });
});

// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnerShip, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// COMMENTS DESTROY ROUTE
router.delete("/:comment_id/", middleware.checkCommentOwnerShip, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;