const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    const maxUsers = await prisma.users.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializedMaxStudent = JSONBigInt.stringify(maxUsers);
    const parsedMaxUsers = JSONBigInt.parse(serializedMaxStudent);

    const newId = maxUsers ? parsedMaxUsers.id + 1 : 1;

    salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const newUser = await prisma.users.create({
        data: {
            id: newId,
            ...data,
        },
    });

    const serializedUser = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedUser);
};

exports.createAdmin = async (data) => {
    const maxUsers = await prisma.users.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializedMaxStudent = JSONBigInt.stringify(maxUsers);
    const parsedMaxUsers = JSONBigInt.parse(serializedMaxStudent);

    const newId = maxUsers ? parsedMaxUsers.id + 1 : 1;

    salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const newAdmin = await prisma.users.create({
        data: {
            id: newId,
            ...data,
            role_id: 2,
        },
    });

    const serializedAdmin = JSONBigInt.stringify(newAdmin);
    return JSONBigInt.parse(serializedAdmin);
};

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    });

    const serializedUser = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUser);
};

exports.getUserById = async (id) => {
    const user = await prisma.users.findFirst({
        where: {
            id: id,
        },
    });

    const serializedUser = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUser);
};
