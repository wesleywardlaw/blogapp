var Blog = require('./models/blog');


module.exports = function(app){

	//INDEX ROUTE - show all blogs
	app.get("/blogs", function(req,res){
		//Get all blogs from db
		Blog.find({}, function(err, allBlogs){
			if(err){
				console.log(err);
			} else {
				
				const arrayToObject = (array, keyField) =>
				   array.reduce((obj, item) => {
				     obj[item[keyField]] = item
				     return obj
				   }, {})

				const blogsObject = arrayToObject(allBlogs, "_id")   
				res.send(blogsObject);
			}
		});
	});


	//CREATE ROUTE - add new blog to db
	app.post("/blogs", function(req,res){
		//get data from form and add to blogs array
		var title = req.body.title;
		var categories = req.body.categories;
		var content = req.body.content;
		var newBlog = {title:title, categories:categories, content:content};
		//Create a new blog and save to db
		Blog.create(newBlog, function(err, newlyCreated){
			if(err){
				console.log(err);
			} else{
				res.status(200).send('success');
			}
		});
	});

	// SHOW - shows more info about one blog
	app.get("/blogs/:id", function(req, res){
	    //find the blog with provided ID
	    Blog.findById(req.params.id, function(err, foundBlog){
	        if(err){
	            console.log(err);
	        } else {
	            res.send(foundBlog);
	        }
	    });
	});

	//UPDATE ROUTE
	app.put("/blogs/:id", function(req,res){
		var title = req.body.title;
		var categories = req.body.categories;
		var content = req.body.content;
		var newBlog = {title:title, categories:categories, content:content};
		//find and update correct blog
		Blog.findByIdAndUpdate(req.params.id, newBlog, function(err, updatedBlog){
			if(err){
				console.log(err);
			} else{
				res.status(200).send('success');
			}
		});
	});

	//DESTROY ROUTE
	app.delete("/blogs/:id", function(req,res){
		Blog.findByIdAndRemove(req.params.id, function(err){
			if(err){
				console.log(err);
			} else{
				res.status(200).send('success');
			}
		});
	});

}