import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import TextInput from "../../components/form/TextInput";
import PageTitle from '../../components/dashboard/PageTitle';
import "./AddStaff.scss";
import { fetchBranches, clearBranch } from "../../features/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../features/permissionSlice";


const AddStaff = () => {
  const dispatch = useDispatch();

  const { loading, error, branches } = useSelector((store) => store.branch);
  const { menu } = useSelector((store) => store.menu);
  const [branchError, setBranchError] = useState("")

  const [formData, setFormData] = useState({
    user: {
      email: "",
      password: "",
      permissions: [],
    },
    name: "",
    mobile: "",
    branches: [],
  });

  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    dispatch(fetchBranches("mini"));
    dispatch(fetchPermissions());

    return () => {
      dispatch(clearBranch());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" || name === "password") {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleToggleBranch = (branch) => {
    const updatedSelectedBranches = selectedBranches.some((b) => b.id === branch.id)
      ? selectedBranches.filter((b) => b.id !== branch.id)
      : [...selectedBranches, branch];

    setSelectedBranches(updatedSelectedBranches);
    setFormData({
      ...formData,
      branches: updatedSelectedBranches.map((b) => b.id),
    });
  };

  const handleModuleChange = (moduleId, checked) => {
      const menuItem = menu.find(menuItem => menuItem.id === moduleId);

      if (menuItem) {

          const permissionIds = menuItem.subMenu.reduce((acc, subMenuItem) => {
              acc.push(...subMenuItem.permissions.map(permission => permission.id));
              return acc;
          }, []);

          if(checked) {
              permissionIds.forEach(id => {
                  document.getElementById("perm-"+id).checked = true;
              });
              menuItem.subMenu.forEach(subMenuItem => {
                  document.getElementById("submenu-"+subMenuItem.id).checked = true;
              });

              setFormData((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  permissions: [...new Set([...prev.user.permissions, ...permissionIds])],
                },
              }));

          } else {
              permissionIds.forEach(id => {
                  document.getElementById("perm-"+id).checked = false;
              });
              menuItem.subMenu.forEach(subMenuItem => {
                  document.getElementById("submenu-"+subMenuItem.id).checked = false;
              });
              setFormData((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  permissions: prev.user.permissions.filter(permissionId => !permissionIds.includes(permissionId))
                },
              }));
          }

      }
  };

  const handleSubmoduleChange = (submoduleId, checked) => {
      const subMenuItem = menu.flatMap(menuItem => menuItem.subMenu).find(subMenuItem => subMenuItem.id === submoduleId);

      if (subMenuItem) {
          const permissionIds = subMenuItem.permissions.map(permission => permission.id);
          
          if(!checked) {
              const moduleId = findIdsFromSubmodule(submoduleId);
              document.getElementById("menu-"+moduleId).checked = false;
          }

          if(checked) {
              permissionIds.forEach(id => {
                  document.getElementById("perm-"+id).checked = true;
              });
              setFormData((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  permissions: [...new Set([...prev.user.permissions, ...permissionIds])]
                },
              }));

          } else {
              permissionIds.forEach(id => {
                  document.getElementById("perm-"+id).checked = false;
              });
              setFormData((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  permissions: prev.user.permissions.filter(permissionId => !permissionIds.includes(permissionId))
                },
              }));
          }

      }
  };


  const handlePermissionChange = (permissionId, checked) => {
      const updatedPermissions = [...formData.user.permissions];
      const index = updatedPermissions.indexOf(permissionId);

      if(!checked) {
          const { moduleId, submoduleId } = findIdsFromPermission(permissionId);
          document.getElementById("submenu-"+submoduleId).checked = false;
          document.getElementById("menu-"+moduleId).checked = false;
      }

      if (index === -1 && checked) {
          updatedPermissions.push(permissionId);
      } else {
          updatedPermissions.splice(index, 1);
      }

      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          permissions: updatedPermissions
        },
      }));
  }

  const findIdsFromPermission = (permissionId) => {
    for (const module of menu) {
        for (const subMenuItem of module.subMenu) {
            for (const permission of subMenuItem.permissions) {
                if (permission.id === permissionId) {
                    return { moduleId: module.id, submoduleId: subMenuItem.id };
                }
            }
        }
    }
    return { moduleId: null, submoduleId: null };
  }

  const findIdsFromSubmodule = (submoduleId) => {
      for (const module of menu) {
          for (const subMenuItem of module.subMenu) {
              if (subMenuItem.id === submoduleId) {
                  return module.id;
              }
          }
      }
      return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(branches.length > 0 && formData.branches.length === 0) {
      setBranchError("Select atleast one branch");
      return;
    } else {
      setBranchError("");
    }
    
    console.log("Form Data Submitted:", formData);
  };

  const handleCancel = () => {
    setFormData({
      user: {
        email: "",
        password: "",
        permissions: [],
      },
      name: "",
      mobile: "",
      branches: [],
    });
    setSelectedBranches([]);
    setSelectedPermissions({});
  };

  return (
    <div className="mt-4">
      <PageTitle title="Add Staff" iname="bi bi-globe" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              value={formData.user.email}
              onChange={handleChange}
              required
            />
            <MultiSelectDropdown
              label="Branches"
              options={branches}
              selectedOptions={selectedBranches}
              onToggle={handleToggleBranch}
            /><small style={{color: "#d9534f", fontSize: "12px"}}>{branchError}</small>
            <TextInput
              label="Mobile"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData.user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-9 menu-box">
            <div className="row">
                {menu && menu.length > 0 ? (
                  menu.map((menuItem, index) => (
                    <div key={index} className="menu col-md-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={menuItem.id}
                          id={`menu-${menuItem.id}`}
                          onChange={(e) => handleModuleChange(menuItem.id, e.target.checked)}
                        />
                        <label
                          className="form-check-label menu-label"
                          htmlFor={`menu-${menuItem.id}`}
                        >
                          {menuItem.name}
                        </label>
                      </div>
                      {menuItem.subMenu.map((subMenuItem, index) => (
                        <div key={index} className="sub-menu">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={subMenuItem.id}
                            id={`submenu-${subMenuItem.id}`}
                            onChange={(e) => handleSubmoduleChange(subMenuItem.id, e.target.checked)}
                          />
                          <label
                            className="form-check-label submenu-label"
                            htmlFor={`submenu-${subMenuItem.id}`}
                          >
                            {subMenuItem.name}
                          </label>
                          {subMenuItem.permissions &&
                            subMenuItem.permissions.map((permission, index) => (
                              <div key={index} className="permission">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={permission.id}
                                  id={`perm-${permission.id}`}
                                  onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                                  checked={formData.user.permissions.includes(permission.id)}
                                />
                                <label
                                  className="form-check-label permission-label"
                                  htmlFor={`perm-${permission.id}`}
                                >
                                  {permission.function_name}
                                </label>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="col-md-12">
                    <p>No permissions available.</p>
                  </div>
                )}
              
            </div>
          </div>
        </div>

        <div className="sticky-buttons">
          <button type="submit" className="btn btn-success me-3">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
