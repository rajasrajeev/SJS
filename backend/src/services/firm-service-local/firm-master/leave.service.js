const { prisma } = require("../../../utils/prisma");

const getLeave = async(query) => {
    const leave = await prisma.leave.findMany({});
    return leave;
}


const createLeave = async(body) => {
    try {
        const createdLeave = await prisma.leave.create({
          data: {
            code: body.code,
            name: body.name,
            status: body.status
          },
        });
    
        return createdLeave;
      } catch (error) {
        console.error('Error creating leave:', error);
        throw ({ status: 400, message: "Could not create leave" });
      }
}


const updateLeave = async(id, body) => {
  try {
    var data = body;

    if(body.name) {
      const isExists = await prisma.leave.findFirst({
          where: { name: { equals: body.name, mode: 'insensitive' }, 
          id: { not: parseInt(id) }}
      });
  
      if (isExists) 
        throw ({ status: 400, message: "Leave with same name already exists!"});
    }

    const leave = await prisma.leave.update({
      where: { id: parseInt(id)},
      data: data
    });
    
    return leave;
  } catch (error) {
    console.error('Error updating leave:', error);
    throw ({ status: 400, message: "Could not update leave" });
  }
}


const deleteLeave = async(id) => {
    try {
        const leave = await prisma.leave.delete({
            where: { id: parseInt(id)}
        })
    
        return leave;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete leave!" });
    }
}

module.exports = {
    getLeave,
    createLeave,
    updateLeave,
    deleteLeave
}