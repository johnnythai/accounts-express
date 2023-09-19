const { Request, Response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

interface UserRequest {
	body: {
		username: string,
		password: string,
	}
}

const register = async (req: UserRequest, res: Response) => {
	const { username, password } = req.body;
	const user = new User ({ username, password });
	await user.save();
	res.status(201).send('User registered');	
};

const login = async (req: UserRequest, res: Response) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(400).send('Invalid email or password');
	}

	const userToken = jwt.sign({ id: user._id}, process.env.SECRET_KEY, { expiresIn: '30m',});

	res.status(200).send({ userToken });
};


exports.register = register;
exports.login = login;
