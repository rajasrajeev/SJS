const { prisma } = require("../../../utils/prisma");

const getDeduction = async(query) => {
    let search = query.search || '';

    const deduction = await prisma.deduction.findMany({
        where: { name: { contains: search, mode: 'insensitive' } },
        include: {
            month: true
        }
    });
    return deduction;
}


const createDeduction = async(body) => {
    try {
        const createdDeduction = await prisma.deduction.create({
          data: {
            code: body.code,
            acc_code: body.acc_code,
            name: body.name,
            type: body.type,
            amount: parseFloat(body.amount),
            installment_amt: body.installment_amt ? parseFloat(body.installment_amt) : null,
            interest: body.interest ? parseFloat(body.interest) : null,
            category: body.category
          },
        });

        if(body.month && Array.isArray(body.month)) {
            for (const month of body.month) {
                const monthDate = new Date(`${month} 1, ${new Date().getFullYear()}`);
                await prisma.deductionMonth.create({
                    data: {
                        deduction_id: createdDeduction.id,
                        month: monthDate
                    }
                });
            }
        }
    
        return createdDeduction;
      } catch (error) {
        console.error('Error creating deduction:', error);
        throw ({ status: 400, message: "Could not create deduction" });
      }
}


const updateDeduction = async(id, body) => {

    try {
      var data = {
      };
  
      if(body.name) {
        const isExists = await prisma.deduction.findFirst({
            where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) }}
        });
    
        if (isExists) throw ({ status: 400, message: "Deduction with same name already exists!"});
        data.name = body.name;
      }
      if(body.code) {
          data.code = body.code;
      }
      if(body.acc_code) {
          data.acc_code = body.acc_code;
      }
      if(body.type) {
          data.type = body.type;
      }
      if(body.amount) {
          data.amount = parseFloat(body.amount);
      }
      if(body.installment_amt) {
          data.installment_amt = parseFloat(body.installment_amt);
      }
      if(body.interest) {
          data.interest = parseFloat(body.interest);
      }
  
      const deduction = await prisma.deduction.update({
          where: { id: parseInt(id)},
          data: data
      });

      if(body.month && Array.isArray(body.month)) {
          await prisma.deductionMonth.deleteMany({
              where: { deduction_id: parseInt(id) }
          });
          for (const month of body.month) {
              const monthDate = new Date(`${month} 1, ${new Date().getFullYear()}`);
              await prisma.deductionMonth.create({
                  data: {
                      deduction_id: parseInt(id),
                      month: monthDate
                  }
              });
          }
      }

      return deduction;
    } catch (error) {
        console.error('Error updating department:', error);
        throw ({ status: 400, message: "Could not update deduction" });
      
    }
}


const deleteDeduction = async(id) => {
    try {
        // Check if the deduction exists first
        const existing = await prisma.deduction.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existing) {
            throw { status: 404, message: "Deduction not found!" };
        }
        const deduction = await prisma.deduction.delete({
            where: { id: parseInt(id)}
        });
        return deduction;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: err.message || "Cannot delete deduction!" });
    }
}

module.exports = {
    getDeduction,
    createDeduction,
    updateDeduction,
    deleteDeduction
}