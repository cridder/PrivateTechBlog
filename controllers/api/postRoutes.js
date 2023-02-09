const router = require("express").Router();
const { Post } = require("../../models");
const isAuth = require("../../utils/auth");

//render post page
router.get("/", async (req, res) => {
	const post = { name: "", content: "" };
	res.render("editpost", {
		post,
		postNew: true,
		loggedIn: req.session.loggedIn,
	});
});

//create a post
router.post("/", async (req, res) => {
	try {
		const postNew = await Post.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(postNew);
	} catch (err) {
		res.status(400).json(err);
	}
});

//update a post

//delete a post
router.delete("/:id", isAuth, async (req, res) => {
	try {
		const datapost = await Post.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (datapost) {
			res.status(200).json(datapost);
		} else {
			res
				.status(404)
				.json({ message: "post " + req.params.id + " was not found" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
