const { prisma } = require("../../../utils/prisma");

const getShopDaMaster = async(query) => {
    let search = query.search || '';

    const shopDaMaster = await prisma.shopDaMaster.findMany();
    return shopDaMaster;
}


const createShopDaMaster = async(body) => {
    try {
        const createdDaPoint = await prisma.shopDaMaster.create({
          data: body
        });
    
        return createdDaPoint;
      } catch (error) {
        console.error('Error creating shopDaMaster:', error);
        throw ({ status: 400, message: "Could not create shopDaMaster" });
      }
}


const updateShopDaMaster = async (id, body) => {
    try {
      const shopDaMaster = await prisma.shopDaMaster.update({
          where: { id: parseInt(id)},
          data: body
      });
      return shopDaMaster;
    } catch (error) {
        console.error('Error updating department:', error);
        throw ({ status: 400, message: "Could not update shopDaMaster" });
      
    }
}


const deleteShopDaMaster = async(id) => {
    try {
        const shopDaMaster = await prisma.shopDaMaster.delete({
            where: { id: parseInt(id)}
        })
    
        return shopDaMaster;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete shopDaMaster!" });
    }
}

module.exports = {
    getShopDaMaster,
    createShopDaMaster,
    updateShopDaMaster,
    deleteShopDaMaster,
}