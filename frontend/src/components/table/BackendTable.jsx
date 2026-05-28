import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import './CustomTable.scss';
import SearchDropdowns from './SearchDropdowns';
import CustomDropdown from '../form/CustomDropdown ';


const BackendTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  handleSearch,
  loading,
  total,
  search,
  handlePageChange,
  handlePerRowsChange,
  showActions = true,
  addButton = { show: false, text: 'Add New', onClick: () => { } },
  searchDropdowns = false,
  month,
  onMonthChange,
  months,
  showMonthDropdown = false,
  currentYear,
  importExcel,
  exportExcel,
  print,
  filters
}) => {

  const actionColumn = {
    name: 'Actions',
    cell: row => (
      <div>
        {showActions && (
          <>
            <button className="action-button" onClick={() => alert("Will implement soon")} style={{ marginRight: '3px' }}>
              <i className="bi bi-eye" style={{ color: 'blue' }}></i>
            </button>
            <button className="action-button" onClick={() => onEdit(row)} style={{ marginRight: '5px' }}>
              <i className="bx bx-edit" style={{ color: 'green' }}></i> {/* Edit Icon */}
            </button>
            <button className="action-button" onClick={() => onDelete(row)}>
              <i className="bx bx-trash" style={{ color: 'red' }}></i> {/* Delete Icon */}
            </button>
          </>
        )}
      </div>
    ),
    ignoreRowClick: true,
    wrap: true,
    width: "150px"
    //allowOverflow: false,
    //button: true,
  };

  const columnsWithActions = showActions ? [...columns, actionColumn] : columns;
  // Custom styles for the table
  const customStyles = {
    table: {
      style: {
        border: '1px solid #ddd',
      },
    },
  };

  return (
    <div>
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

        <div className="col-md-4 text-end" style={{marginTop: "20px"}}>
          {exportExcel && exportExcel.show && (<button style={{backgroundColor: "steelblue"}} className="add-button" onClick={exportExcel.onClick}>
            <i className="bx bx-upload" style={{ color: 'white' }}></i> Export
          </button>)}

          {print && print.show && (<button style={{backgroundColor: "grey"}} className="add-button" onClick={print.onClick}>
            <i className="bx bx-printer" style={{ color: 'white' }}></i> Print
          </button>)}

          {importExcel && importExcel.show && (<button style={{backgroundColor: "green"}} className="add-button" onClick={importExcel.onClick}>
            <i className="bx bx-download" style={{ color: 'white' }}></i> Import
          </button>)}

          {addButton && addButton.show && (<button className="add-button" onClick={addButton.onClick}>
            {/* <i className="bx bx-plus" style={{ color: 'white' }}></i>  */}Add
            {/* {addButton.text} */}
          </button>)}
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columnsWithActions}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={total}
        highlightOnHover
        pointerOnHover
        fixedHeader          //  Enables sticky header
        fixedHeaderScrollHeight="500px"  //  Set scrollable height
        responsive
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        customStyles={customStyles}
        noDataComponent={
          <div className="no-data-message">
            <button className='btn btn-primary' onClick={() => window.location.reload()}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
            <p>No records to display</p>
          </div>
        }
      />
    </div>
  );
};

export default BackendTable;
