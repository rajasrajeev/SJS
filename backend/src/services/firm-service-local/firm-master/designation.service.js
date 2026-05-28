const { prisma } = require("../../../utils/prisma");

const getDesignation = async (query) => {
    let search = query.search || "";
    let departmentId = query.department_id;

    let whereClause = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };

    if (departmentId) {
      whereClause.department_id = parseInt(departmentId);
    }
  
    const designations = await prisma.designation.findMany({
      where: whereClause,
      include: {
        department: {
            select: {
                id: true,
                name: true, // Fetch the name of the department
            },
        },
      },
    });
  
    // Format the effective_date field
    const formattedDesignations = designations.map((designation) => {
      return {
        ...designation,
        effective_date: designation.effective_date
          ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(designation.effective_date))
          : null, // Handle null dates if necessary
      };
    });
  
    return formattedDesignations;
  };
  


const createDesignation = async(body) => {
    try {
        var data = {
            code: body.code,
            name: body.name,
            department_id: parseInt(body.department_id),
            effective_date: new Date(body.effective_date),
        }
        
        if(body.basic) {
            data.basic = body.basic;
        }
        
        const createdDesignation = await prisma.designation.create({
          data: data,
          include: {
            department: {
                select: {
                    id: true,
                    name: true, // Fetch the name of the department
                },
            },
          },
        });
        
        createdDesignation.effective_date = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(createdDesignation.effective_date));
        
        return createdDesignation;
      } catch (error) {
        console.error('Error creating designation:', error);
        throw ({ status: 400, message: "Could not create designation" });
      }
}


const updateDesignation = async(id, body) => {
    try {
      var data = {};
      if(body.name) {
          const isExists = await prisma.designation.findFirst({
              where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) }}
          });
      
          if (isExists) throw ({ status: 400, message: "Designation with same name already exists!"});
          data.name = body.name;
      }
      
      if(body.code) {
          data.code = body.code;
      }
      if(body.department_id) {
          data.department_id = parseInt(body.department_id);
      }
      if(body.effective_date) {
          data.effective_date = new Date(body.effective_date);
      }
      if(body.basic) {
          data.basic = body.basic;
      }

      const designation = await prisma.designation.update({
          where: { id: parseInt(id)},
          data: data,
          include: {
            department: {
                select: {
                    id: true,
                    name: true, // Fetch the name of the department
                },
            },
          },
      })

      designation.effective_date = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(designation.effective_date));

      return designation;
    } catch (error) {
        console.error('Error updating designation:', error);
        throw ({ status: 400, message: "Could not update designation" });
      
    }
}


const deleteDesignation = async(id) => {
    try {
        const designation = await prisma.designation.delete({
            where: { id: parseInt(id)}
        })
    
        return designation;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete designation!" });
    }
}


module.exports = {
    getDesignation,
    createDesignation,
    updateDesignation,
    deleteDesignation
}