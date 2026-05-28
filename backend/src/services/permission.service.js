const { prisma } = require("../utils/prisma");


const getAllPermissions = async () => {
    const menus = await prisma.menu.findMany({
      select: {
        id: true,
        name: true,
        permissions: {
          select: {
            id: true,
            function_name: true,
            name: true
          }
        },
        subMenu: {
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                id: true,
                function_name: true,
                name: true
              },
            },
          },
        },
      },
    });
    return menus;
  };
  

module.exports = { 
    getAllPermissions
}