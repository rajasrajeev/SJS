import React from 'react';
import DataTable from 'react-data-table-component';
import './CustomTable.scss';

const CustomTable = ({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  showSearchBar = true,
  addButton = { show: false, text: 'Add New', onClick: () => {} },
  search,
  handleSearch,
  pagination = true,
  addButtonWidth = 'auto', // Default width for the add button
}) => {
  // Action column config
  const actionColumn = {
    name: 'Actions',
    cell: (row) => (
      <div>
        {showActions && (
          <>
            <button className="action-button" onClick={() => onView?.(row)} style={{ marginRight: '3px' }}>
              <i className="bi bi-eye" style={{ color: 'blue' }}></i>
            </button>
            <button className="action-button" onClick={() => onEdit?.(row)} style={{ marginRight: '3px' }}>
              <i className="bx bx-edit" style={{ color: 'green' }}></i>
            </button>
            <button className="action-button" onClick={() => onDelete?.(row)}>
              <i className="bx bx-trash" style={{ color: 'red' }}></i>
            </button>
          </>
        )}
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
    width: '125px',
  };

  const columnsWithActions = showActions ? [...columns, actionColumn] : columns;

  const customStyles = {
    table: {
      style: {
        border: 'none', // removed border to avoid conflict with flex layouts
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f4f4f4',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div className="custom-table-container">
      <div className="row mb-3">
        {showSearchBar && (
          <div className="search-bar col-md-4 mb-2">
            <input
              className="table-search-input"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        )}
        {addButton.show && (
          <div className="col-md-8 text-end">
            <button className="add-button" onClick={addButton.onClick} style={{ width: addButtonWidth }}>
              {addButton.text}
            </button>
          </div>
        )}
      </div>

      <div className="table-wrapper">
        <DataTable
          columns={columnsWithActions}
          data={data}
          pagination={pagination}
          highlightOnHover
          pointerOnHover
          responsive
          customStyles={customStyles}
          noDataComponent={<div className="no-data-message">No records to display</div>}
        />
      </div>
    </div>
  );
};

export default CustomTable;