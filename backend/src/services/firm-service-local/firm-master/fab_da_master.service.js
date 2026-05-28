const { prisma } = require("../../../utils/prisma");

const getFabMaster = async() => {
    const fabDaMaster = await prisma.fabDaMaster.findMany({});
    return fabDaMaster;
}


const createFabMaster = async(body) => {
    try {
        const createdDaConstant = await prisma.fabDaMaster.create({
          data: body
        });
    
        return createdDaConstant;
      } catch (error) {
        console.error('Error creating DA Constant:', error);
        throw ({ status: 400, message: "Could not create DA Constant" });
      }
}


const updateFabMaster = async (id, body) => {
    try {
      const fabDaMaster = await prisma.fabDaMaster.update({
        where: { id: parseInt(id) },
        data: body
      });
  
      return fabDaMaster;
    } catch (error) {
      console.error('Error updating fabDaMaster:', error);
      throw { status: 400, message: 'Could not update fabDaMaster' };
    }
  };
  


const deleteFabMaster = async(id) => {
    try {
        const fabDaMaster = await prisma.fabDaMaster.delete({
            where: { id: parseInt(id)}
        })
    
        return fabDaMaster;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete fabDaMaster!" });
    }
}

module.exports = {
  getFabMaster,
  createFabMaster,
  updateFabMaster,
  deleteFabMaster,
}