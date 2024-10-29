const usersRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("../utils/request");

exports.register = async (data) => {
    const userExist = await usersRepository.getUserByEmail(data.email);
    if (userExist) {
        throw new Unauthorized(["Email already exist"]);
    }

    const user = await usersRepository.createUser(data);

    const token = createToken(user);

    delete user.password;

    return {
        user,
        token,
    };
};

exports.addAdmin = async (data) => {
    const userExist = await usersRepository.getUserByEmail(data.email);
    if (userExist) {
        throw new Unauthorized(["Email already exist"]);
    }

    const user = await usersRepository.createAdmin(data);

    const token = createToken(user);

    delete user.password;

    return {
        user,
        token,
    };
}

exports.login = async (data) => {
    const user = await usersRepository.getUserByEmail(data.email);

    if (!user) {
        throw new Unauthorized("User not found");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Unauthorized("Invalid credentials");
    }

    const token = createToken(user);

    delete user.password;

    return {
        user,
        token,
    };
};

const createToken = (user) => {
    const payload = {
        user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "72h", 
    });

    return token;
};
