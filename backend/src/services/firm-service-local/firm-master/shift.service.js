const { prisma } = require("../../../utils/prisma");

const getShift = async(query) => {
    let search = query.search || '';

    const shift = await prisma.shift.findMany({
        where: { name: { contains: search, mode: 'insensitive' },}
    });
    return shift;
}


const createShift = async(shiftData) => {
    try {
      if (shiftData.name) {
          const isExists = await prisma.department.findFirst({
            where: { name: { equals: shiftData.name, mode: 'insensitive' }}
          });
    
        if (isExists) throw ({ status: 400, message: "Shift with same name already exists!"});
      }
        // Create the shift
        const createdShift = await prisma.shift.create({
          data: {
            name: shiftData.name,
            code: shiftData.code,
            start: shiftData.start,
            end: shiftData.end,
            start_day: shiftData.start_day != "" ? shiftData.start_day : null,
          },
        });
    
        return createdShift;
      } catch (error) {
        console.error("Error creating shift:", error);
        throw new Error("Could not create shift");
      }
}


const updateShift = async(shiftId, shiftData) => {
    try {
      if (shiftData.name) {
          const isExists = await prisma.department.findFirst({
            where: { name: { equals: shiftData.name, mode: 'insensitive' }, id: { not: parseInt(shiftId) }}
          });
    
        if (isExists) throw ({ status: 400, message: "Shift with same name already exists!"});
      }
    
        // Update the shift
        const updatedShift = await prisma.shift.update({
          where: { id: parseInt(shiftId) },
          data: shiftData,
        });
    
        return updatedShift;
      } catch (error) {
        console.error("Error updating shift:", error);
        throw new Error("Could not update shift");
      }
}


const deleteShift = async(id) => {
    try {
        const shift = await prisma.shift.delete({
            where: { id: parseInt(id)}
        })
    
        return shift;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete Shift!" });
    }
}

module.exports = {
    getShift,
    createShift,
    updateShift,
    deleteShift
}