const { prisma } = require("../../../utils/prisma");

const getEarnings = async(query) => {
    let search = query.search || '';

    const earnings = await prisma.earnings.findMany({
        where: { name: { contains: search, mode: 'insensitive' },}
    });
    return earnings;
}


const createEarnings = async(body) => {
    try {
        const createdEarnings = await prisma.earnings.create({
          data: {
            code: body.code,
            acc_code: body.acc_code,
            name: body.name,
            type: body.type,
            effect_pf: body.effect_pf,
            effect_csi: body.effect_csi,
          },
        });
    
        return createdEarnings;
      } catch (error) {
        console.error('Error creating earnings:', error);
        throw ({ status: 400, message: "Could not create earnings" });
      }
}


const updateEarnings = async(id, body) => {

    try {
  
      if(body.name) {
        const isExists = await prisma.earnings.findFirst({
            where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) }}
        });
    
        if (isExists) throw ({ status: 400, message: "Earnings with same name already exists!"});
      }
      const earnings = await prisma.earnings.update({
          where: { id: parseInt(id)},
          data: {
            name: body.name,
            code: body.code,
            acc_code: body.acc_code,
            type: body.type,
            effect_pf: body.effect_pf,
            effect_csi: body.effect_csi
          }
      })

      return earnings;
    } catch (error) {
        console.error('Error updating department:', error);
        throw ({ status: 400, message: "Could not update earnings" });
      
    }
}


const deleteEarnings = async(id) => {
    try {
        const earnings = await prisma.earnings.delete({
            where: { id: parseInt(id)}
        })
    
        return earnings;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete earnings!" });
    }
}

module.exports = {
    getEarnings,
    createEarnings,
    updateEarnings,
    deleteEarnings
}