const { PrismaClient, FirmStatus } = require('@prisma/client');
const generatePasswordHash = require('../src/utils/passwordhash.util');

const prisma = new PrismaClient();


const create_location = async () => {
  const new_country = await prisma.country.create({
    data: {
      name: 'India'
    }
  });
  const new_state = await prisma.state.create({
    data: {
      name: 'Kerala',
      country_id: new_country.id
    }
  });
  const new_district = await prisma.district.create({
    data: {
      name: 'TVM',
      state_id: new_state.id
    }
  });
  return new_district;
}


const create_super_admin_for_devs = async () => {
  const password = await generatePasswordHash("password");
  const super_user = await prisma.user.create({
    data: {
      email: 'superadmin@gmail.com',
      password: password,
      is_super_admin: true,
      last_logged_in: null
    }
  });
  return super_user;
}


const create_admin_root = async () => {
  const password = await generatePasswordHash("password");
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: password,
      is_admin: true,
      last_logged_in: null
    }
  });
  return admin;
}


const create_firm_root_user = async () => {
  const password = await generatePasswordHash("password");
  const user = await prisma.user.create({
    data: {
      email: 'firm@gmail.com',
      password: password,
      is_firm: true,
      last_logged_in: null
    }
  });

  if (user) {
    const firm = await prisma.firm.create({
      data: {
        user_id: user.id,
        name: "ABC Industrial Organization",
        address: "Veerakerala puram , Kacherinada, Attingal",
        contact_no: "9034123456",
        email_id: "firm@gmail.com",
        web: "example.com",
        fdb_no: "09123 347 6734",
        incorporation_no: "9045445 495",
        gst_no: "GST007ABCD1123",
        other_license: null,
        firm_status: FirmStatus.PROPRIETOR,
        country_id: 1,
        state_id: 1,
        district_id: 1,
        start_date: new Date("10-10-2003"),
        business_type: "Exporting",
        trade_lic_no: "TRDLIC007ABC",
        logo: "assets/default-user.jpg"
      }
    });
    return firm;
  } else {
    console.log("no user created");
    return false;
  }
} 
/**
 * Assign permissions to the admin user.
 * @param {Array} permissionIds - Array of permission IDs
 */
async function seedUserPermissions(permissionIds) {
  const adminUser = await prisma.user.findFirst({ where: { is_firm: true } });

  if (!adminUser) {
    console.warn("No admin user found. Skipping user permission assignment.");
    return;
  }

  const userPermissions = permissionIds.map(permissionId => ({
    user_id: adminUser.id,
    permission_id: permissionId.id,
  }));

  await prisma.userPermission.createMany({ data: userPermissions });
  console.log("Permissions assigned to admin user successfully.");
}
async function seedMenus() {
  const menus = [
    { name: "Dashboard", icon: "bx bx-layer nav_icon", url: "/firm-dashboard" },
    { name: "Staff Login", icon: "bx bx-user nav_icon", url: "#" },
    { name: "Branch", icon: "bx bx-network-chart nav_icon", url: "#" },
    { name: "Employee", icon: "bx bx-user nav_icon", url: "#" },
    { name: "Firm Master", icon: "bi bi-box-fill", url: "#" },
    { name: "Settings", icon: "bx bx-cog nav_icon", url: "#" },
  ];

  const menuPromises = menus.map(menu => prisma.menu.create({ data: menu }));
  const createdMenus = await Promise.all(menuPromises);

  return createdMenus;
}

/**
 * Seed submenus and return their IDs.
 * @param {Array} menuIds - Array of menu IDs
 */
async function seedSubMenus(menuIds) {
  const subMenus = [
    { menu_id: menuIds[1].id, name: "Staff List", icon: "bx bx-group nav_icon", url: "/firm-dashboard/staff-list" },
    { menu_id: menuIds[1].id, name: "Add Staff", icon: "bx bx-user-plus nav_icon", url: "/firm-dashboard/add-staff" },
    { menu_id: menuIds[2].id, name: "Branch List", icon: "bx bx-cog nav_icon", url: "/firm-dashboard/branch-list" },
    { menu_id: menuIds[2].id, name: "Add Branch", icon: "bx bx-building-house nav_icon", url: "/firm-dashboard/add-branch" },
    { menu_id: menuIds[3].id, name: "Employee List", icon: "bx bx-cog nav_icon", url: "/firm-dashboard/employee-master-list" },
    { menu_id: menuIds[3].id, name: "Add Employee", icon: "bx bx-building-house nav_icon", url: "/firm-dashboard/employee-master" },
    { menu_id: menuIds[4].id, name: "Firm Profile", icon: "bi bi-person-fill nav_icon", url: "/firm-dashboard/profile-update" },
    { menu_id: menuIds[4].id, name: "Firm Department", icon: "bi bi-briefcase-fill nav_icon", url: "/firm-dashboard/firm-department-add" },
    { menu_id: menuIds[4].id, name: "Firm Designation", icon: "bi bi-person-badge-fill nav_icon", url: "/firm-dashboard/firm-designation-add" },
    { menu_id: menuIds[4].id, name: "Firm Deduction", icon: "bi bi-file-earmark-minus nav_icon", url: "/firm-dashboard/firm-deduction-add" },
    { menu_id: menuIds[4].id, name: "Firm Earning", icon: "bi bi-graph-up nav_icon", url: "/firm-dashboard/firm-earning-add" },
    { menu_id: menuIds[4].id, name: "Add Shift", icon: "bi bi-calendar-event nav_icon", url: "/firm-dashboard/firm-shift-add" },
    { menu_id: menuIds[4].id, name: "Add Leave", icon: "bi bi-person-dash nav_icon", url: "/firm-dashboard/firm-leave-add" },
    { menu_id: menuIds[5].id, name: "Add Location", icon: "bx bx-building-house nav_icon", url: "/firm-dashboard/add-location" },
  ];

  const subMenuPromises = subMenus.map(subMenu => prisma.subMenu.create({ data: subMenu }));
  const createdSubMenus = await Promise.all(subMenuPromises);

  return createdSubMenus;
}

/**
 * Seed permissions and return their IDs.
 * @param {Array} subMenuIds - Array of submenu IDs
 */

async function seedPermissions(subMenuIds) {
  const permissions = [
    { name: "Create Staff", sub_menu_id: subMenuIds[1].id, function_name: "createStaffHandler" },
    { name: "Get Staff List", sub_menu_id: subMenuIds[0].id, function_name: "getStaffListHandler" },
    { name: "Update Staff", sub_menu_id: subMenuIds[0].id, function_name: "updateStaffHandler" },
    { name: "Delete Staff", sub_menu_id: subMenuIds[0].id, function_name: "deleteStaffHandler" },
    
    { name: "Create Branch", sub_menu_id: subMenuIds[3].id, function_name: "createBranchHandler" },
    { name: "Get Branch List", sub_menu_id: subMenuIds[2].id, function_name: "getBranchListHandler" },
    { name: "Update Branch", sub_menu_id: subMenuIds[2].id, function_name: "updateBranchHandler" },
    { name: "Delete Branch", sub_menu_id: subMenuIds[2].id, function_name: "deleteBranchHandler" },
    
    { name: "Create Employee", sub_menu_id: subMenuIds[5].id, function_name: "createEmployeeHandler" },
    { name: "Get Employee List", sub_menu_id: subMenuIds[4].id, function_name: "getEmployeeListHandler" },
    { name: "Update Employee", sub_menu_id: subMenuIds[4].id, function_name: "updateEmployeeHandler" },
    { name: "Delete Employee", sub_menu_id: subMenuIds[4].id, function_name: "deleteEmployeeHandler" },
    
    { name: "Update Firm Profile", sub_menu_id: subMenuIds[6].id, function_name: "updateFirmProfileController" },
    { name: "Get Firm Profile", sub_menu_id: subMenuIds[6].id, function_name: "getFirmProfileController" },
    
    { name: "Create Department", sub_menu_id: subMenuIds[7].id, function_name: "createDepartmentController" },
    { name: "Get Department", sub_menu_id: subMenuIds[7].id, function_name: "getDepartmentController" },
    { name: "Update Department", sub_menu_id: subMenuIds[7].id, function_name: "updateDepartmentController" },
    { name: "Delete Department", sub_menu_id: subMenuIds[7].id, function_name: "deleteDepartmentController" },
    
    { name: "Create Designation", sub_menu_id: subMenuIds[8].id, function_name: "createDesignationController" },
    { name: "Get Designation", sub_menu_id: subMenuIds[8].id, function_name: "getDesignationController" },
    { name: "Update Designation", sub_menu_id: subMenuIds[8].id, function_name: "updateDesignationController" },
    { name: "Delete Designation", sub_menu_id: subMenuIds[8].id, function_name: "deleteDesignationController" },
    
    { name: "Create Deduction", sub_menu_id: subMenuIds[9].id, function_name: "createDeductionController" },
    { name: "Get Deduction", sub_menu_id: subMenuIds[9].id, function_name: "getDeductionController" },
    { name: "Update Deduction", sub_menu_id: subMenuIds[9].id, function_name: "updateDeductionController" },
    { name: "Delete Deduction", sub_menu_id: subMenuIds[9].id, function_name: "deleteDeductionController" },
    
    { name: "Create Earnings", sub_menu_id: subMenuIds[10].id, function_name: "createEarningsController" },
    { name: "Get Earnings", sub_menu_id: subMenuIds[10].id, function_name: "getEarningsController" },
    { name: "Update Earnings", sub_menu_id: subMenuIds[10].id, function_name: "updateEarningsController" },
    { name: "Delete Earnings", sub_menu_id: subMenuIds[10].id, function_name: "deleteEarningsController" },
    
    { name: "Create Shift", sub_menu_id: subMenuIds[11].id, function_name: "createShiftController" },
    { name: "Get Shift", sub_menu_id: subMenuIds[11].id, function_name: "getShiftController" },
    { name: "Update Shift", sub_menu_id: subMenuIds[11].id, function_name: "updateShiftController" },
    { name: "Delete Shift", sub_menu_id: subMenuIds[11].id, function_name: "deleteShiftController" },
    
    { name: "Create Leave", sub_menu_id: subMenuIds[12].id, function_name: "createLeaveController" },
    { name: "Get Leave", sub_menu_id: subMenuIds[12].id, function_name: "getLeaveController" },
    { name: "Update Leave", sub_menu_id: subMenuIds[12].id, function_name: "updateLeaveController" },
    { name: "Delete Leave", sub_menu_id: subMenuIds[12].id, function_name: "deleteLeaveController" },
    
    { name: "Create Country", sub_menu_id: subMenuIds[13].id, function_name: "createCountryHandler" },
    { name: "Get Country", sub_menu_id: subMenuIds[13].id, function_name: "getCountryHandler" },
    { name: "Update Country", sub_menu_id: subMenuIds[13].id, function_name: "updateCountryHandler" },
    { name: "Delete Country", sub_menu_id: subMenuIds[13].id, function_name: "deleteCountryHandler" },

    { name: "Create State", sub_menu_id: subMenuIds[13].id, function_name: "createStateHandler" },
    { name: "Get State", sub_menu_id: subMenuIds[13].id, function_name: "getStateHandler" },
    { name: "Update State", sub_menu_id: subMenuIds[13].id, function_name: "updateStateHandler" },
    { name: "Delete State", sub_menu_id: subMenuIds[13].id, function_name: "deleteStateHandler" },

    { name: "Create District", sub_menu_id: subMenuIds[13].id, function_name: "createDistrictHandler" },
    { name: "Get District", sub_menu_id: subMenuIds[13].id, function_name: "getDistrictHandler" },
    { name: "Update District", sub_menu_id: subMenuIds[13].id, function_name: "updateDistrictHandler" },
    { name: "Delete District1", sub_menu_id: subMenuIds[13].id, function_name: "deleteDistrictHandler" },
    
    // Repeat similarly for State and District
  ];

  const permissionPromises = permissions.map(permission => prisma.permission.create({ data: permission }));
  const createdPermissions = await Promise.all(permissionPromises);

  return createdPermissions;
}



const create_firm_staffs = async () => {
  const password = await generatePasswordHash("password");

  const branches = await prisma.branch.findMany({});
  const permissions = await prisma.permission.findMany({});

  for (let i = 0; i < 50; i++) {
    try {
      const user = await prisma.user.create({
        data: {
          email: `dummystaff${i}@gmail.com`,
          password: password,
          is_firm_staff: true,
          last_logged_in: null,
          userPermissions: {
            create: permissions.map(item => ({
              permission: { connect: { id: item.id } },
            })),
          },
        },
      });

      if (user) {
        await prisma.staff.create({
          data: {
            user_id: user.id,
            name: `Dummy Staff ${i}`,
            mobile: (i * 1000).toString(),
            branches: {
              connect: branches.map(branch => ({ id: branch.id }))
            }
          }
        });
      }
    } catch (error) {
      console.error(`Failed to create staff for user ${i}:`, error);
    }
  }
};

async function seedPermissionsForDashboard() {
  try {
    // Ensure the menu exists
    let menu = await prisma.menu.findFirst({
      where: { name: 'Dashboard' },
    });

    console.log(menu);

    // Insert permission
    await prisma.permission.create({
      data: {
        function_name: 'dashboardData',
        menu_id: menu.id,
        sub_menu_id: null,
      },
    });

    console.log('Permission entry added successfully.');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}


async function main() {
  await create_location();
  // await create_super_admin_for_devs();
  // await create_admin_root();
  await create_firm_root_user();

  const menus = await seedMenus();
  const subMenus = await seedSubMenus(menus);
  const permissions = await seedPermissions(subMenus);
  await seedUserPermissions(permissions);

  // ONLY FOR DEV & TEST PURPOSE
  //await create_firm_staffs();
  // await seedPermissionsForDashboard();
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })