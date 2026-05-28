const { prisma } = require("../../../utils/prisma");


const getPf = async() => {
    const pf = await prisma.masterPf.findMany({});
    return pf;
}


const createPf = async(body) => {
    try {
        const pf = await prisma.masterPf.create({
          data: body
        });
    
        return pf;
      } catch (error) {
        console.error('Error creating pf allowance:', error);
        throw ({ status: 400, message: "Could not create pf allowance" });
      }
}


const updatePf = async(id, body) => {
  try {
    var data = body;

    const pf = await prisma.masterPf.update({
      where: { id: parseInt(id)},
      data: data
    });
    
    return pf;
  } catch (error) {
    console.error('Error updating pf:', error);
    throw ({ status: 400, message: "Could not update pf allowance" });
  }
}


const deletePf = async(id) => {
    try {
        const pf = await prisma.masterPf.delete({
            where: { id: parseInt(id)}
        })
    
        return pf;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete pf allowance!" });
    }
}

module.exports = {
    getPf,
    createPf,
    updatePf,
    deletePf,
}