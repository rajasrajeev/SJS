const { prisma } = require("../../../utils/prisma");

const getDepartment = async(query) => {
    let search = query.search || '';

    const department = await prisma.department.findMany({
        where: { name: { contains: search, mode: 'insensitive' },}
    });
    return department;
}


const createDepartment = async(body) => {
    try {
        /* // Find the current highest code and increment it
        const lastDepartment = await prisma.department.findFirst({
          orderBy: {
            id: 'desc', // Order by the most recently created department
          },
        });
    
        const newCode = lastDepartment
          ? String(parseInt(lastDepartment.code, 10) + 1).padStart(3, '0') // Increment the last code and pad with leading zeros
          : '001'; // If no departments exist, start with '001' */
    
        const createdDepartment = await prisma.department.create({
          data: {
            code: body.code,
            name: body.name,
          },
        });
    
        return createdDepartment;
      } catch (error) {
        console.error('Error creating department:', error);
        throw ({ status: 400, message: "Could not create department" });
      }
}


const updateDepartment = async(id, body) => {

    try {
      var data = {
      };
  
      if(body.name) {
        const isExists = await prisma.department.findFirst({
            where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) }}
        });
    
        if (isExists) throw ({ status: 400, message: "Department with same name already exists!"});
        data.name = body.name;
      }
      if(body.code) {
          data.code = body.code;
      }
  
      const department = await prisma.department.update({
          where: { id: parseInt(id)},
          data: data
      })

      return department;
    } catch (error) {
        console.error('Error updating department:', error);
        throw ({ status: 400, message: "Could not update department" });
      
    }
}


const deleteDepartment = async(id) => {
    try {
        const department = await prisma.department.delete({
            where: { id: parseInt(id)}
        })
    
        return department;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete department!" });
    }
}

module.exports = {
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}