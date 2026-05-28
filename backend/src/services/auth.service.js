const { prisma } = require("../utils/prisma");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { SECRET } = require("../config/index");
const { Email } = require('../utils/email.util');
const generatePasswordHash = require("../utils/passwordhash.util");


const getRoleName = (user) => {
    if (user.is_admin) {
        return "admin";
    } else if (user.is_staff) {
        return "staff";
    } else if (user.is_firm) {
        return "firm";
    } else {
        return "firm_staff";
    }
}


const getNameForRole = (user) => {
    if(user.is_firm) {
        console.log(user.firm);
        user.name = user.firm.name || 'User';
    } else if(user.is_admin) {
        user.name = "Admin"; // Need to change
    } else if(user.is_staff) {
        user.name = "Staff"; // Need to change
    } else if(user.is_firm) {
        user.name = "Firm"; // Need to change
    } else {
        user.name = "Firm accountant member";
    }
    return user;
}


const generateToken = (user, role) => {
    const token = jwt.sign({
        user_id: user.id,
        email: user.email,
        role: role
    }, SECRET, {expiresIn: "30 days"});

    const result = {
        role: user.role,
        token: token,
        expiresIn: 30 * 24 * 60 * 60
    } 

    return result;
}


const login = async (username, password) => {
    const user = await prisma.user.findFirst({
        where: { email: username}
    });

    if (!user) throw ({status: 401, message: "Invalid user credentials!!"});

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const role = getRoleName(user);    
        const data = generateToken(user, role);
        const color = await prisma.userColor.findFirst({
            where: { user_id: user.id },
            select: { hexcode: true }
        });

        await prisma.user.update({
            where: { id: user.id },
            data: { last_logged_in: new Date() },
        });
        const menu = await getUserMenu(user.id);
        const daType = await fetchDaType(user.id);

        return {
            token: data,
            token: data,
            user: {
                id: user.id,
                email: user.email,
            },
            color: color,
            menu: menu,
            da_type: daType
        }
    } else {
        throw ({status: 401, message: "Invalid user credentials!!"});
    }
}

const getUserPermissions = async (userId) => {
    const permissions = await prisma.userPermission.findMany({
        where: { user_id: userId },
        include: {
            permission: {
                select: {
                    function_name: true,
                    subMenu: {
                        select: {
                            id: true,
                            name: true,
                            menu_id: true,
                        }
                    }
                }
            }
        }
    });

    return permissions.map(p => ({
        id: p.id,
        functionName: p.permission.function_name,
        subMenuId: p.permission.subMenu.id,
        subMenuName: p.permission.subMenu.name,
        menuId: p.permission.subMenu.menu_id
    }));
};

const fetchDaType = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { firm: true }
    });

    if (!user || !user.firm) {
        throw ({ status: 404, message: "Firm not found for the user" });
    }

    return user.firm.firm_type;
}

const getUserMenu = async (userId) => {
    // Fetch all menus
    const menus = await prisma.menu.findMany({
        include: {
            subMenu: {
                include: {
                    permissions: {
                        include: {
                            userPermissions: true // Include user permissions in submenus
                        }
                    }
                }
            }
        }
    });

    // Transform the fetched data to the required structure
    return menus.map(menu => ({
        id: menu.id,
        name: menu.name,
        icon: menu.icon,
        url: menu.url,
        subMenus: menu.subMenu.map(subMenu => ({
            id: subMenu.id,
            name: subMenu.name,
            icon: subMenu.icon,
            url: subMenu.url,
            userPermissions: subMenu.permissions.flatMap(permission => 
                permission.userPermissions.filter(up => up.user_id === userId)
            ) // Add user-specific permissions
        }))
    }));
};



const forgotPassword = async (email) => {
    const user = await prisma.user.findFirst({
        where: { email: email },
        include: {firm: true}
    });

    if (!user) throw ({ status: 404, message: "No user found with given email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const passwordResetToken = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');

    await prisma.user.update({
        where: { id: user.id },
        data: {
            passwordResetToken: passwordResetToken,
            passwordResetAt: new Date(Date.now() + 10 * 60 * 1000)
        }
    });

    try {
        const userToSenMail = getNameForRole(user);
        await new Email(userToSenMail, '', otp).sendPasswordResetToken();
    } catch (err) {
        console.log(err);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: null,
                passwordResetAt: null
            }
        });
        throw ({ status: 403, message: "Cannot send email!" });
    }

    return user;
}

const menuWithPermission = async(user) => {
    const menu = await getUserMenu(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
        },
        menu: menu
    }
}


const verifyOtp = async(email, otp) => {
    const passwordResetToken = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
        email: email,
        passwordResetToken: passwordResetToken,
        passwordResetAt: {
            gt: new Date(),
        },
    }, 
    select: {
        id: true,
        email: true
    },
  });

  if (!user)
    throw ({ status: 400, message: "Invalid token or token has expired" });

  return user;
}


const resetPassword = async(body) => {
    try {
        const passwordResetToken = crypto
        .createHash("sha256")
        .update(body.otp)
        .digest("hex");

        const user = await prisma.user.findFirst({
            where: {
                id: body.id,
                passwordResetToken: passwordResetToken,
            }
        });

        if(!user) throw({status: 500, message: "cannot find user"});

        const hashedPassword = await generatePasswordHash(body.password);
    
        await prisma.user.update({
          where: {
            id: body.id,
            
          },
          data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetAt: null,
          },
        });
      
        return true;
    } catch (err) {
        throw({status: 500, message: "Something went wrong!"});
    }

}


const passwordChange = async(user, body) => {
    const {old_password, new_password} = body;

    const currentUser = await prisma.user.findFirst({
        where: { id: user.id}
    });
    if (!currentUser) throw ({status: 400, message: "Invalid user!"});

    const isMatch = await bcrypt.compare(old_password, user.password);

    if (!isMatch) throw ({status: 400, message: "Incorrect old password"});

    const hashedPassword = await generatePasswordHash(new_password);

    try {
        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {
                password: hashedPassword
            }
        });
        return updatedUser;
    } catch (err) {
        console.log(err);
        throw ({status: 400, message: "cannot change password"});
    }
}

module.exports = {
    login,
    forgotPassword,
    verifyOtp,
    resetPassword,
    passwordChange,
    menuWithPermission
}