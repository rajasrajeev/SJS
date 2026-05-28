const { prisma } = require("../../../utils/prisma");


const getOvertime = async() => {
    const overtime = await prisma.overtime.findMany({});
    return overtime;
}


const createOvertime = async(body) => {
    try {
        const overtime = await prisma.overtime.create({
          data: body
        });
    
        return overtime;
      } catch (error) {
        console.error('Error creating overtime allowance:', error);
        throw ({ status: 400, message: "Could not create overtime allowance" });
      }
}


const updateOvertime = async(id, body) => {
  try {
    var data = body;

    if(body.name) {
      const isExists = await prisma.overtime.findFirst({
          where: { name: { equals: body.name, mode: 'insensitive' }, 
          id: { not: parseInt(id) }}
      });
  
      if (isExists) 
        throw ({ status: 400, message: "overtime allowance with same name already exists!"});
    }

    const overtime = await prisma.overtime.update({
      where: { id: parseInt(id)},
      data: data
    });
    
    return overtime;
  } catch (error) {
    console.error('Error updating overtime:', error);
    throw ({ status: 400, message: "Could not update overtime allowance" });
  }
}


const deleteOvertime = async(id) => {
    try {
        const overtime = await prisma.overtime.delete({
            where: { id: parseInt(id)}
        })
    
        return overtime;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete overtime allowance!" });
    }
}

module.exports = {
    getOvertime,
    createOvertime,
    updateOvertime,
    deleteOvertime,
}