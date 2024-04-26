const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const useremail = await User.findOne({ email: req.body.email });
		if (useremail)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const username = await User.findOne({ username: req.body.username });
		if (username)
			return res
				.status(409)
				.send({ message: "Username already in Use!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error(error); 
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;