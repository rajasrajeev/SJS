const { prisma } = require("../../utils/prisma");
const generatePasswordHash = require("../../utils/passwordhash.util");
const { isEmailExists } = require("../../utils/exists.util");
const { createPaginator } = require('prisma-pagination');


const paginate = createPaginator();

const createStaff = async (req) => {
    const { body } = req;
    const isExists = await isEmailExists(body.user.email);
    if (isExists) throw ({ status: 400, message: "User with same email id already exists!" });

    const hashedPassword = await generatePasswordHash(body.user.password);
    let newFirmUser = {};
    if (body.user.permissions.length > 0) {
        newFirmUser = await prisma.user.create({
            data: {
                email: body.user.email,
                password: hashedPassword,
                is_firm_staff: true,
                userPermissions: {
                    create: body.user.permissions.map(item => ({
                        permission: { connect: { id: item } },
                    })),
                },
            }
        });
    } else {
        newFirmUser = await prisma.user.create({
            data: {
                email: body.user.email,
                password: hashedPassword,
                is_firm_staff: true
            }
        });

    }
    if (body.user.modules.length > 0) {
        // Fetch menu IDs from permissions table
        const permissionsWithMenuIds = await prisma.permission.findMany({
            where: { menu_id: { in: body.user.modules } },
            select: { id: true, menu_id: true },
        });

        // Map user permissions creation data
        const userPermissionsData = permissionsWithMenuIds.map(permission => ({
            permission: { connect: { id: permission.id } }
        }));

        // Insert user and associated permissions
        newFirmUser = await prisma.user.update({
            where: {
                id: newFirmUser.id
            },
            data: {
                userPermissions: {
                    create: userPermissionsData,
                },
            },
        });

        console.log("New firm user created with associated permissions.");
    }


    if (body.user.submodules.length > 0) {
        newFirmUser = await prisma.user.create({
            data: {
                email: body.user.email,
                password: hashedPassword,
                is_firm_staff: true,
                userPermissions: {
                    create: body.user.modules.map(item => ({
                        permission: { connect: { id: item } },
                    })),
                },
            }
        });
    }

    if (newFirmUser) {
        const newFirmStaff = await prisma.staff.create({
            data: {
                user_id: newFirmUser.id,
                name: body.name,
                mobile: body.mobile,
                branches: {
                    connect: body.branches.map(branch_id => ({ id: branch_id }))
                }
            }
        });

        // Send Credential to the registered staff

        const data = {
            "staff": newFirmStaff,
            "user": newFirmUser,
            "email": newFirmUser.email,
            "password": body.user.password
        };
        return data;
    } else {
        throw ({ status: 400, message: "Can't create user" });
    }
}

const getStaffDetails = async (id) => {
    const staff = await prisma.staff.findUnique({
        where: { id: parseInt(id) },
        include: {
            branches: {
                select: {
                    id: true,
                    name: true,
                    address: true,
                },
            },
            user: {
                select: {
                    id: true,
                    email: true,
                    last_logged_in: true,
                    userPermissions: {
                        select: {
                            permission: {
                                select: {
                                    id: true,
                                    menu_id: true,
                                    sub_menu_id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


    const userPermissions = staff?.user.userPermissions || [];

    const permissionsArray = userPermissions
        .filter(up => up.permission?.sub_menu_id !== null)
        .map(up => up.permission.id);

    const modulesArray = userPermissions
        .filter(up => up.permission?.menu_id !== null)
        .map(up => up.permission.menu_id);

    return {
        user: {
            email: staff?.user.email || "",
            password: "",
            permissions: permissionsArray,
            modules: modulesArray,
            submodules: [],  // Update logic if handling submodules further
        },
        name: staff?.name || "",
        mobile: staff?.mobile || "",
        branches: staff?.branches.map(branch => ({
            id: branch.id,
            name: branch.name,
            address: branch.address,
        })) || [],
    };
};


const accountantsList = async (query) => {
    try {
        let page = query.page || 1;
        let perPage = query.perPage || 10;
        let search = query.search || '';

        let whereClause = {
            AND: [
                { user: { is_firm_staff: true } },
                {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { mobile: { contains: search } }
                    ]
                }
            ]
        };

        const data = await paginate(prisma.staff, {
            where: whereClause,
            orderBy: {
                name: 'asc'
            },
            include: {
                branches: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        last_logged_in: true,
                    },
                }
            }
        },
            { page: page, perPage: perPage });

        return data;
    } catch (err) {
        throw ({ status: 400, message: `${err}` });
    }
}

const updateStaff = async (id, body) => {
    try {
        const firmStaff = await prisma.staff.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: body.name,
                mobile: body.mobile,
                branches: {
                    connect: body.branches.map(branch_id => ({ id: branch_id }))
                },

            },
            include: {
                user: true,
            }
        });

        if (body.user.permissions.length > 0) {
            await prisma.userPermission.deleteMany({
                where: { user_id: firmStaff.user.id },
            });

            await prisma.userPermission.createMany({
                data: body.user.permissions.map(item => ({
                    user_id: firmStaff.user.id,
                    permission_id: item,
                })),
            });
            // Handle module-related permissions
            if (body.user.modules.length > 0) {
                // Fetch menu IDs linked to the permissions
                const permissionsWithMenuIds = await prisma.permission.findMany({
                    where: { menu_id: { in: body.user.modules } },
                    select: { id: true, menu: true },
                });
                // console.log(permissionsWithMenuIds);

                // Create user permissions data for modules
                const modulePermissionsData = permissionsWithMenuIds.map(permission => ({
                    user_id: firmStaff.user.id,
                    permission_id: permission.id
                }));

                // Insert module-related permissions if any found
                if (modulePermissionsData.length > 0) {
                    await prisma.userPermission.createMany({
                        data: modulePermissionsData,
                    });
                }
            }
        }

        return firmStaff;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Something went wrong" });
    }
};



const deleteStaff = async (id) => {
    try {
        const firmStaff = await prisma.staff.findFirst({
            where: {
                id: parseInt(id)
            }
        });

        const user = await prisma.user.delete({
            where: { id: firmStaff.user_id }
        });
        return firmStaff;

    } catch (err) {
        throw ({ status: 400, message: `${err}` });
    }
}


module.exports = {
    createStaff,
    accountantsList,
    updateStaff,
    deleteStaff,
    getStaffDetails
}