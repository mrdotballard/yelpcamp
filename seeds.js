var mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's rest",
    image: "https://source.unsplash.com/random/400x300",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem voluptatibus vel nisi nemo possimus harum, ex, dolore magnam ullam veritatis. Sit eveniet cum numquam, placeat earum harum? Minus dolor neque exercitationem! Iste, tempore tenetur porro fugiat nostrum, et repellat obcaecati ipsam, numquam eum quas deserunt libero a dolorum fuga earum sunt assumenda. Cupiditate impedit odio laborum ea atque earum laboriosam illum praesentium! Molestias ipsam ex fuga similique temporibus, corrupti blanditiis provident. Obcaecati iure quaerat velit sint eligendi delectus corrupti consectetur itaque. Adipisci consequatur excepturi impedit. Unde, alias optio in assumenda deserunt nisi quod nostrum, at vero exercitationem praesentium. Illum, laborum! Accusamus quidem consectetur quo tempora similique fuga maiores! Aperiam rerum amet, earum laboriosam non repudiandae cumque magnam quibusdam laudantium sed odio dolorum repellat voluptatem provident ut numquam qui neque. Sed a voluptas nihil consequatur quis soluta ipsam vero aliquid vel doloremque? Inventore ab praesentium hic assumenda tenetur? Quos dolore, quae cum fugit repellendus excepturi nesciunt accusantium id tempora maiores, dolorem debitis, expedita perspiciatis eum optio rerum a porro vel facere voluptatibus obcaecati ipsam odit natus assumenda. Officiis magni quia autem! Blanditiis, a ullam sunt deserunt quisquam alias quae modi, doloribus nostrum aspernatur provident pariatur repellat obcaecati voluptatum numquam dolor?"
  },
  {
    name: "Monkey's Tree",
    image: "https://source.unsplash.com/random/400x300",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem voluptatibus vel nisi nemo possimus harum, ex, dolore magnam ullam veritatis. Sit eveniet cum numquam, placeat earum harum? Minus dolor neque exercitationem! Iste, tempore tenetur porro fugiat nostrum, et repellat obcaecati ipsam, numquam eum quas deserunt libero a dolorum fuga earum sunt assumenda. Cupiditate impedit odio laborum ea atque earum laboriosam illum praesentium! Molestias ipsam ex fuga similique temporibus, corrupti blanditiis provident. Obcaecati iure quaerat velit sint eligendi delectus corrupti consectetur itaque. Adipisci consequatur excepturi impedit. Unde, alias optio in assumenda deserunt nisi quod nostrum, at vero exercitationem praesentium. Illum, laborum! Accusamus quidem consectetur quo tempora similique fuga maiores! Aperiam rerum amet, earum laboriosam non repudiandae cumque magnam quibusdam laudantium sed odio dolorum repellat voluptatem provident ut numquam qui neque. Sed a voluptas nihil consequatur quis soluta ipsam vero aliquid vel doloremque? Inventore ab praesentium hic assumenda tenetur? Quos dolore, quae cum fugit repellendus excepturi nesciunt accusantium id tempora maiores, dolorem debitis, expedita perspiciatis eum optio rerum a porro vel facere voluptatibus obcaecati ipsam odit natus assumenda. Officiis magni quia autem! Blanditiis, a ullam sunt deserunt quisquam alias quae modi, doloribus nostrum aspernatur provident pariatur repellat obcaecati voluptatum numquam dolor?"
  },
  {
    name: "Dog Hill",
    image: "https://source.unsplash.com/random/400x300",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem voluptatibus vel nisi nemo possimus harum, ex, dolore magnam ullam veritatis. Sit eveniet cum numquam, placeat earum harum? Minus dolor neque exercitationem! Iste, tempore tenetur porro fugiat nostrum, et repellat obcaecati ipsam, numquam eum quas deserunt libero a dolorum fuga earum sunt assumenda. Cupiditate impedit odio laborum ea atque earum laboriosam illum praesentium! Molestias ipsam ex fuga similique temporibus, corrupti blanditiis provident. Obcaecati iure quaerat velit sint eligendi delectus corrupti consectetur itaque. Adipisci consequatur excepturi impedit. Unde, alias optio in assumenda deserunt nisi quod nostrum, at vero exercitationem praesentium. Illum, laborum! Accusamus quidem consectetur quo tempora similique fuga maiores! Aperiam rerum amet, earum laboriosam non repudiandae cumque magnam quibusdam laudantium sed odio dolorum repellat voluptatem provident ut numquam qui neque. Sed a voluptas nihil consequatur quis soluta ipsam vero aliquid vel doloremque? Inventore ab praesentium hic assumenda tenetur? Quos dolore, quae cum fugit repellendus excepturi nesciunt accusantium id tempora maiores, dolorem debitis, expedita perspiciatis eum optio rerum a porro vel facere voluptatibus obcaecati ipsam odit natus assumenda. Officiis magni quia autem! Blanditiis, a ullam sunt deserunt quisquam alias quae modi, doloribus nostrum aspernatur provident pariatur repellat obcaecati voluptatum numquam dolor?"
  }
];

function seedDB() {
  // remove campgrounds
  Campground.deleteMany({}, function (err) {
    if (err) throw err;
    console.log("removed campgrounds");

    // add new campgrouds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if (err) throw err;
        else {
          console.log("added camp ground from seed");

          // add a few comments
          Comment.create(
            {
              text: "This place is great",
              author: "Bobby joe"
            }, function (err, comment) {
              if (err) throw err;
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment from seed");
              }
            });
        }
      });
    });
  });
}
module.exports = seedDB;