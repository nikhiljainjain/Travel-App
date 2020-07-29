const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
 	const { name, email, password } = req.body;

 	if (!name || !email || !password) {
    	return res.status(422).send({ error: 'Must provide email and password, name' });
  	}

	try {
		const user = new User({ name, email, password });
		await user.save();
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		res.send({ token, name: user.name });
	} catch (err) {
		return res.status(422).send({ error: "Email already exist" });
	}
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
console.log(user);
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    console.log({ token, name: user.name });
    res.send({ token, name: user.name });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
