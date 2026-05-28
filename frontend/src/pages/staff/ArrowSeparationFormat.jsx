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
      modules: [],
      submodules: []
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
    const updatedModules = checked
      ? [...formData.user.modules, moduleId]
      : formData.user.modules.filter((id) => id !== moduleId);
  
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, modules: updatedModules },
    }));
  };
  
  const handleSubmoduleChange = (submoduleId, checked) => {
    const updatedSubmodules = checked
      ? [...formData.user.submodules, submoduleId]
      : formData.user.submodules.filter((id) => id !== submoduleId);
  
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, submodules: updatedSubmodules },
    }));
  };
  
  const handlePermissionChange = (permissionId, checked) => {
    const updatedPermissions = checked
      ? [...formData.user.permissions, permissionId]
      : formData.user.permissions.filter((id) => id !== permissionId);
  
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, permissions: updatedPermissions },
    }));
  };
  

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
            <PageTitle title="User Permissions" iname="bi bi-house-lock" /><br/>
            <div className="row">
                {menu && menu.length > 0 ? (
                  menu.map((menuItem, index) => (
                    <div key={index} className="menu">
                      {menuItem.subMenu.length === 0 ? <div className="form-check">
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
                      </div> : null}
                      {menuItem.subMenu.map((subMenuItem, index) => (
                          <div key={index} className="sub-menu">
                            {subMenuItem.permissions.length === 0 ? <>
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
                                {menuItem.name}{" "}
                                <i className="bi bi-arrow-right-circle-fill" style={{ margin: "0 5px", color: "lightseagreen" }}></i>{" "}
                                {subMenuItem.name}{" "}
                              </label>
                            </> : null }
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
                                    {menuItem.name}{" "}
                                    <i className="bi bi-arrow-right-circle-fill" style={{ margin: "0 5px", color: "lightseagreen" }}></i>{" "}
                                    {subMenuItem.name}{" "}
                                    <i className="bi bi-arrow-right-circle-fill" style={{ margin: "0 5px", color: "lightseagreen" }}></i>{" "}
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
