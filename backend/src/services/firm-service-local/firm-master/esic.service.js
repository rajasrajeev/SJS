const { prisma } = require("../../../utils/prisma");


const getEsic = async() => {
    const esic = await prisma.masterEsic.findMany({});
    return esic;
}


const createEsic = async(body) => {
    try {
        const esic = await prisma.masterEsic.create({
          data: body
        });
    
        return esic;
      } catch (error) {
        console.error('Error creating esic allowance:', error);
        throw ({ status: 400, message: "Could not create esic allowance" });
      }
}


const updateEsic = async(id, body) => {
  try {

    const esic = await prisma.masterEsic.update({
      where: { id: parseInt(id)},
      data: body
    });
    
    return esic;
  } catch (error) {
    console.error('Error updating esic:', error);
    throw ({ status: 400, message: "Could not update esic allowance" });
  }
}


const deleteEsic = async(id) => {
    try {
        const esic = await prisma.masterEsic.delete({
            where: { id: parseInt(id)}
        })
    
        return esic;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete esic allowance!" });
    }
}

module.exports = {
    getEsic,
    createEsic,
    updateEsic,
    deleteEsic,
}