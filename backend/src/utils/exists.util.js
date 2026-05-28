const { prisma } = require("../utils/prisma");

const isEmailExists = async (email) => {
    const user = await prisma.user.findFirst({
        where: { email: email }
    });
    return user ? true : false;
}

module.exports = { isEmailExists }