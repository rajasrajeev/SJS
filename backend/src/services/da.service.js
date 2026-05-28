const { prisma } = require("../utils/prisma");

// Helper function to create month filter
const createMonthFilter = (month) => {
    if (!month) return {};
    return {
        month: {
            gte: new Date(month + '-01'),
            lt: new Date(new Date(month + '-01').setMonth(new Date(month + '-01').getMonth() + 1))
        }
    };
};

// Shop DA Monthly Services
const getDaMonthlyShop = async (month) => {
    return await prisma.daMonthlyShop.findMany({
        where: createMonthFilter(month),
        include: {
            shopDa: true,
            branch: true
        }
    });
};

const getDaMonthlyShopById = async (id) => {
    return await prisma.daMonthlyShop.findUnique({
        where: { id: parseInt(id) },
        include: {
            shopDa: true,
            branch: true
        }
    });
};

const createDaMonthlyShop = async (data) => {
  // Convert types safely
  if (data.shop_da_id) data.shop_da_id = parseInt(data.shop_da_id);
  if (data.da_point) data.da_point = parseFloat(data.da_point);
  if (data.amount) data.amount = parseFloat(data.amount);
  if (data.month) {
    data.month = new Date(`${data.month}-01T00:00:00Z`); 
  }
  if (data.branch_id) data.branch_id = parseInt(data.branch_id);

  // Validate existence of ShopDaMaster
  const shopDaExists = await prisma.shopDaMaster.findUnique({
    where: { id: data.shop_da_id }
  });
  if (!shopDaExists) {
    throw new Error(`ShopDaMaster with id ${data.shop_da_id} does not exist`);
  }

  // Validate existence of Branch if branch_id is given
  if (data.branch_id) {
    const branchExists = await prisma.branch.findUnique({
      where: { id: data.branch_id }
    });
    if (!branchExists) {
      throw new Error(`Branch with id ${data.branch_id} does not exist`);
    }
  }

  // Finally create DaMonthlyShop
  return await prisma.daMonthlyShop.create({
    data: {
      da_point: data.da_point,
      amount: data.amount,
      month: data.month,
      branch: data.branch_id ? { connect: { id: data.branch_id } } : undefined,
      shopDa: { connect: { id: data.shop_da_id } }
    }
  });
};


const updateDaMonthlyShop = async (id, data) => {
    return await prisma.daMonthlyShop.update({
        where: { id: parseInt(id) },
        data: data,
        include: {
            shopDa: true,
            branch: true
        }
    });
};

const deleteDaMonthlyShop = async (id) => {
    return await prisma.daMonthlyShop.delete({
        where: { id: parseInt(id) }
    });
};

// Fab DA Monthly Services
const getDaMonthlyFab = async (month) => {
    return await prisma.daMonthlyFab.findMany({
        where: createMonthFilter(month),
        include: {
            fabDa: true,
            branch: true
        }
    });
};

const getDaMonthlyFabById = async (id) => {
    return await prisma.daMonthlyFab.findUnique({
        where: { id: parseInt(id) },
        include: {
            fabDa: true,
            branch: true
        }
    });
};

const createDaMonthlyFab = async (data) => {
    return await prisma.daMonthlyFab.create({
        data: data,
        include: {
            fabDa: true,
            branch: true
        }
    });
};

const updateDaMonthlyFab = async (id, data) => {
    return await prisma.daMonthlyFab.update({
        where: { id: parseInt(id) },
        data: data,
        include: {
            fabDa: true,
            branch: true
        }
    });
};

const deleteDaMonthlyFab = async (id) => {
    return await prisma.daMonthlyFab.delete({
        where: { id: parseInt(id) }
    });
};

// IDA Monthly Services
const getDaMonthlyIda = async (month) => {
    return await prisma.daMonthlyIda.findMany({
        where: createMonthFilter(month),
        include: {
            branch: true
        }
    });
};

const getDaMonthlyIdaById = async (id) => {
    return await prisma.daMonthlyIda.findUnique({
        where: { id: parseInt(id) },
        include: {
            branch: true
        }
    });
};

const createDaMonthlyIda = async (data) => {
    return await prisma.daMonthlyIda.create({
        data: data,
        include: {
            branch: true
        }
    });
};

const updateDaMonthlyIda = async (id, data) => {
    return await prisma.daMonthlyIda.update({
        where: { id: parseInt(id) },
        data: data,
        include: {
            branch: true
        }
    });
};

const deleteDaMonthlyIda = async (id) => {
    return await prisma.daMonthlyIda.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    // Shop DA
    getDaMonthlyShop,
    getDaMonthlyShopById,
    createDaMonthlyShop,
    updateDaMonthlyShop,
    deleteDaMonthlyShop,

    // Fab DA
    getDaMonthlyFab,
    getDaMonthlyFabById,
    createDaMonthlyFab,
    updateDaMonthlyFab,
    deleteDaMonthlyFab,

    // IDA
    getDaMonthlyIda,
    getDaMonthlyIdaById,
    createDaMonthlyIda,
    updateDaMonthlyIda,
    deleteDaMonthlyIda
};
