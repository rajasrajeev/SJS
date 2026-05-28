const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Seed user permissions for admin users.
 * @param {Array} permissionIds - Array of permission IDs.
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

/**
 * Seed menus and return their IDs.
 */
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
 * @param {Array} menuIds - Array of menu IDs.
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
    { name: "Get Staff List", sub_menu_id: subMenuIds[0].id, function_name: "getStaffListHandler" },
    { name: "Create Staff", sub_menu_id: subMenuIds[1].id, function_name: "createStaffHandler" },
    { name: "Update Staff", sub_menu_id: subMenuIds[0].id, function_name: "updateStaffHandler" },
    { name: "Delete Staff", sub_menu_id: subMenuIds[0].id, function_name: "deleteStaffHandler" },
    { name: "Get Branch List", sub_menu_id: subMenuIds[2].id, function_name: "getBranchListHandler" },
    { name: "Update Branch", sub_menu_id: subMenuIds[2].id, function_name: "updateBranchHandler" },
    { name: "Delete Branch", sub_menu_id: subMenuIds[2].id, function_name: "deleteBranchHandler" },
    { name: "Create Branch", sub_menu_id: subMenuIds[3].id, function_name: "createBranchHandler" },
    { name: "Get Employee List", sub_menu_id: subMenuIds[4].id, function_name: "getEmployeeListHandler" },
    { name: "Update Employee", sub_menu_id: subMenuIds[4].id, function_name: "updateEmployeeHandler" },
    { name: "Delete Employee", sub_menu_id: subMenuIds[4].id, function_name: "deleteEmployeeHandler" },
    { name: "Create Employee", sub_menu_id: subMenuIds[5].id, function_name: "createEmployeeHandler" },
    { name: "Get Firm Profile", sub_menu_id: subMenuIds[6].id, function_name: "getFirmProfileController" },
    { name: "Update Firm Profile", sub_menu_id: subMenuIds[6].id, function_name: "updateFirmProfileController" },
    { name: "Get Department", sub_menu_id: subMenuIds[7].id, function_name: "getDepartmentController" },
    { name: "Create Department", sub_menu_id: subMenuIds[7].id, function_name: "createDepartmentController" },
    { name: "Update Department", sub_menu_id: subMenuIds[7].id, function_name: "updateDepartmentController" },
    { name: "Delete Department", sub_menu_id: subMenuIds[7].id, function_name: "deleteDepartmentController" },
    { name: "Get Designation", sub_menu_id: subMenuIds[8].id, function_name: "getDesignationController" },
    { name: "Create Designation", sub_menu_id: subMenuIds[8].id, function_name: "createDesignationController" },
    { name: "Update Designation", sub_menu_id: subMenuIds[8].id, function_name: "updateDesignationController" },
    { name: "Delete Designation", sub_menu_id: subMenuIds[8].id, function_name: "deleteDesignationController" },
    { name: "Get Deduction", sub_menu_id: subMenuIds[9].id, function_name: "getDeductionController" },
    { name: "Create Deduction", sub_menu_id: subMenuIds[9].id, function_name: "createDeductionController" },
    { name: "Update Deduction", sub_menu_id: subMenuIds[9].id, function_name: "updateDeductionController" },
    { name: "Delete Deduction", sub_menu_id: subMenuIds[9].id, function_name: "deleteDeductionController" },
    { name: "Get Earnings", sub_menu_id: subMenuIds[10].id, function_name: "getEarningsController" },
    { name: "Create Earnings", sub_menu_id: subMenuIds[10].id, function_name: "createEarningsController" },
    { name: "Update Earnings", sub_menu_id: subMenuIds[10].id, function_name: "updateEarningsController" },
    { name: "Delete Earnings", sub_menu_id: subMenuIds[10].id, function_name: "deleteEarningsController" },
    { name: "Get Shift", sub_menu_id: subMenuIds[11].id, function_name: "getShiftController" },
    { name: "Create Shift", sub_menu_id: subMenuIds[11].id, function_name: "createShiftController" },
    { name: "Update Shift", sub_menu_id: subMenuIds[11].id, function_name: "updateShiftController" },
    { name: "Delete Shift", sub_menu_id: subMenuIds[11].id, function_name: "deleteShiftController" },
    { name: "Get Leave", sub_menu_id: subMenuIds[12].id, function_name: "getLeaveController" },
    { name: "Create Leave", sub_menu_id: subMenuIds[12].id, function_name: "createLeaveController" },
    { name: "Update Leave", sub_menu_id: subMenuIds[12].id, function_name: "updateLeaveController" },
    { name: "Delete Leave", sub_menu_id: subMenuIds[12].id, function_name: "deleteLeaveController" },
    { name: "Get Location", sub_menu_id: subMenuIds[13].id, function_name: "getCountryHandler" },
    { name: "Create Location", sub_menu_id: subMenuIds[13].id, function_name: "createCountryHandler" },
    { name: "Update Location", sub_menu_id: subMenuIds[13].id, function_name: "updateCountryHandler" },
    { name: "Delete Location", sub_menu_id: subMenuIds[13].id, function_name: "deleteCountryHandler" },
  ];

  const permissionPromises = permissions.map(permission => prisma.permission.create({ data: permission }));
  const createdPermissions = await Promise.all(permissionPromises);

  return createdPermissions;
}


async function main() {
  try {
    const menus = await seedMenus();
    const subMenus = await seedSubMenus(menus);
    const permissions = await seedPermissions(subMenus);
    await seedUserPermissions(permissions);
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
