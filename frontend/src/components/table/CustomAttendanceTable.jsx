import React from "react";
import DataTable from "react-data-table-component";
import CustomDropdown from "../form/CustomDropdown ";

//import "./AttendanceTable.scss";

const CustomAttendanceTable = ({ columns, data, month, onMonthChange, months, showMonthDropdown,search,handleSearch,filters,currentYear}) => {
  const customStyles = {
    table: {
      style: {
        border: '1px solid #ddd',
      },
    },
  };
  return (
    <div className="attendance-table-container">
      <div className="row mb-4">
        <div className="search-bar col-md-2 mt-4">
          <input
            className="table-search-input search-backend"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className='col-md-6'>
          {filters &&
            <div className='filter-box'>
              <div style={{borderRadius: "3px", backgroundColor: "#d1e3d6", 
                height: "35px", width: "35px", paddingTop: "1px", paddingLeft: "5px", marginRight: "10px"}}
              >
                <i className="bi bi-filter" style={{fontSize:"24px"}}></i>
              </div>
              {typeof filters === 'function' ? filters() : null}
            </div>
          }


          {showMonthDropdown && (
            <div className="row">
              <div className="col-md-6">
                <CustomDropdown
                  label="Select Month"
                  name="month"
                  options={months}
                  value={month}
                  onChange={onMonthChange}
                />
              </div>
              <div className="col-md-6">
                <div className="mt-4 pt-2">
                  <h6>Current Year: {currentYear}</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <DataTable
        columns={columns.map((col) =>
          col.selector
            ? {
                ...col,
                cell: (row) =>
                  typeof col.selector(row) === "object" ? (
                    <CustomDropdown
                      options={[
                        { id: "P", name: "P" },
                        { id: "X", name: "X" },
                        { id: "A", name: "A" },
                        { id: "W", name: "W" },
                        { id: "CL", name: "CL" },
                        { id: "EL", name: "EL" },
                        { id: "HOL", name: "HOL" },
                        { id: "H", name: "H" },
                      ]}
                      value={col.selector(row)}
                      onChange={(selected) => {
                        row[col.name] = selected;
                      }}
                    />
                  ) : (
                    col.selector(row)
                  ),
              }
            : col
        )}
        data={data}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
        fixedHeader 
        customStyles={customStyles}
      />
    </div>
  );
};

export default CustomAttendanceTable;
