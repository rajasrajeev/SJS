const { prisma } = require("../../../utils/prisma");


const getNight = async() => {
    const night = await prisma.nightAllowance.findMany({});
    return night;
}


const createNight = async(body) => {
    try {
        const night = await prisma.nightAllowance.create({
          data: body
        });
    
        return night;
      } catch (error) {
        console.error('Error creating night allowance:', error);
        throw ({ status: 400, message: "Could not create night allowance" });
      }
}


const updateNight = async(id, body) => {
  try {
    var data = body;

    if(body.name) {
      const isExists = await prisma.nightAllowance.findFirst({
          where: { name: { equals: body.name, mode: 'insensitive' }, 
          id: { not: parseInt(id) }}
      });
  
      if (isExists) 
        throw ({ status: 400, message: "night allowance with same name already exists!"});
    }

    const night = await prisma.nightAllowance.update({
      where: { id: parseInt(id)},
      data: data
    });
    
    return night;
  } catch (error) {
    console.error('Error updating night:', error);
    throw ({ status: 400, message: "Could not update night allowance" });
  }
}


const deleteNight = async(id) => {
    try {
        const night = await prisma.nightAllowance.delete({
            where: { id: parseInt(id)}
        })
    
        return night;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete night allowance!" });
    }
}

module.exports = {
    getNight,
    createNight,
    updateNight,
    deleteNight,
}