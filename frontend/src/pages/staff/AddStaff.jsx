import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "../../components/form/MultiSelectDropdown";
import TextInput from "../../components/form/TextInput";
import PageTitle from '../../components/dashboard/PageTitle';
import { fetchBranches, clearBranch } from "../../features/branchSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../features/permissionSlice";
import { clearStaffState, createStaff, getStaff, updateStaff } from "../../features/staffSliceLocal";
import { useLocation } from 'react-router-dom';
import DismissableAlert from "../../components/dashboard/miscellaneous/DismissableAlert";
import "./AddStaff.scss";



const AddStaff = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedId } = location.state || {};

  const { branches } = useSelector((store) => store.branch);
  const { loading, staffDetail, error, success } = useSelector((store) => store.staffLocal);
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

  useEffect(() => {
    dispatch(fetchBranches("mini"));
    dispatch(fetchPermissions());

    return () => {
      dispatch(clearBranch());
      dispatch(clearStaffState());
    };
  }, []);


  useEffect(() => {
    if (selectedId) 
      dispatch(getStaff(selectedId));
  }, [selectedId]);

  useEffect(() => {
    if (staffDetail) {
      setFormData({
        user: {
          email: staffDetail.user.email,
          permissions: staffDetail.user.permissions,
          modules: staffDetail.user.modules,
          submodules: staffDetail.user.submodules
        },
        name: staffDetail.name,
        mobile: staffDetail.mobile,
        branches: staffDetail.branches,
        id: staffDetail.id
      });

      setSelectedBranches(staffDetail.branches);
    } else {
      handleCancel();
    }
  }, [staffDetail]);

  useEffect(() => {
    if (success) 
      handleCancel();
  }, [success]);


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

    if(staffDetail) {
      console.log("*********************")
      console.log(selectedId);
      console.log("*********************")
      dispatch(updateStaff({
        user: {
          permissions: formData.user.permissions,
          modules: formData.user.modules,
          submodules: formData.user.submodules
        },
        name: formData.name,
        mobile: formData.mobile,
        branches: formData.branches,
        id: selectedId
      }));
    } else {
      dispatch(createStaff(formData));
    }
    
  };

  const handleCancel = () => {
    setFormData({
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
    setSelectedBranches([]);
  };

  return (
    <div className="mt-4">
      <PageTitle title={selectedId ? "Update Staff" : "Add Staff"} iname="bx bx-user-plus" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
          {error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            {success ? <DismissableAlert 
            variant='success' 
            title="success" 
            msg="Save completed succesfully"/>
        : null}
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Mobile"
              type="mobile"
              name="mobile"
              value={formData.mobile}
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
              label="Email"
              type="email"
              name="email"
              value={formData.user.email}
              onChange={handleChange}
              required={selectedId ? false : true}
              disabled={selectedId ? true : false}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData.user.password}
              onChange={handleChange}
              required={selectedId ? false : true}
              disabled={selectedId ? true : false}
            />
          </div>

          <div className="col-md-9 menu-box">
            <PageTitle title="User Permissions" iname="bi bi-house-lock" /><br/>
            <div className="row">
              {menu && menu.length > 0 ? (
                menu.map((menuItem, index) => (
                  <div className="col-md-12 mb-4" key={index}>
                    <h5>{menuItem.name}</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered permission-table">
                        <thead>
                          <tr>
                            <th>Sub Menu</th>
                            <th>Permission</th>
                            <th style={{width: "80px"}}>Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuItem.subMenu.length === 0 ? (
                            <tr>
                              <td>View</td>
                              <td>All</td>
                              <td>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={menuItem.id}
                                  id={`menu-${menuItem.id}`}
                                  onChange={(e) =>
                                    handleModuleChange(menuItem.id, e.target.checked)
                                  }
                                  checked={formData.user.modules.includes(menuItem.id)}
                                />
                              </td>
                            </tr>
                          ) : (
                            menuItem.subMenu.map((subMenuItem, subIndex) => {
                              const permissions = subMenuItem.permissions;
                              return (
                                <React.Fragment key={subIndex}>
                                  <tr>
                                    <td rowSpan={permissions.length || 1}>{subMenuItem.name}</td>
                                    {permissions.length > 0 ? (
                                      <>
                                        <td>{permissions[0].name}</td>
                                        <td>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={permissions[0].id}
                                            id={`perm-${permissions[0].id}`}
                                            onChange={(e) =>
                                              handlePermissionChange(permissions[0].id, e.target.checked)
                                            }
                                            checked={formData.user.permissions.includes(permissions[0].id)}
                                          />
                                        </td>
                                      </>
                                    ) : (
                                      <td colSpan={2}>No permissions</td>
                                    )}
                                  </tr>
                                  {permissions.slice(1).map((permission, permIndex) => (
                                    <tr key={permIndex}>
                                      <td>{permission.name}</td>
                                      <td>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={permission.id}
                                          id={`perm-${permission.id}`}
                                          onChange={(e) =>
                                            handlePermissionChange(permission.id, e.target.checked)
                                          }
                                          checked={formData.user.permissions.includes(permission.id)}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </React.Fragment>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12">
                  <p className="text-center">No permissions available.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="sticky-buttons">
          <button disabled={loading ? true : false} type="submit" className="btn btn-success me-3">
            {loading ? "Loading..." : "Submit"}
          </button>
          {!selectedId && <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger"
          >
            Cancel
          </button>}
        </div>
      </form>
    </div>
  );
};

export default AddStaff;