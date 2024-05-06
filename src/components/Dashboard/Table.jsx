import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAllEmployees, setShowAllEmployees] = useState(false);

  const showEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const hideEmployeeDetails = () => {
    setSelectedEmployee(null);
  };
  

  const toggleShowAllEmployees = () => {
    setShowAllEmployees(!showAllEmployees);
    setSelectedEmployee(null);
  };

  const renderTree = (employee) => {
    const data = {
      name: employee.firstName + ' ' + employee.lastName,
      children: [
        { name: 'Email: ' + employee.email },
        { name: 'Salary: ' + (employee.salary) },
        { name: 'Date: ' + employee.date }
      ]
    };
    return (
      <div style={{ width: '100%', height: '300px'}}>
        <Tree data={data} />
      </div>
    );
  };

  const renderAllEmployeesTree = () => {
    const data = employees.map(employee => ({
      name: employee.firstName + ' ' + employee.lastName,
      children: [
        { name: 'Email: ' + employee.email },
        { name: 'Salary: ' + (employee.salary) },
        { name: 'Date: ' + employee.date }
      ]
    }));

    return (
      <div style={{ width: '100%', height: '500px'}}>
        <Tree data={[{ name: 'All Employees', children: data }]} />
      </div>
    );
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <React.Fragment key={employee.id}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{(employee.salary)}</td>
                  <td>{employee.date} </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleEdit(employee.id)}
                      className="button muted-button"
                      style={{ backgroundColor: 'green', color: 'whitesmoke' }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => showEmployeeDetails(employee)}
                      className="button muted-button"
                      style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      View
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {selectedEmployee === employee && (
                  <tr>
                    <td colSpan={7}>
                      <div>
                        {renderTree(selectedEmployee)}
                        <button onClick={hideEmployeeDetails}>Hide Details</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={toggleShowAllEmployees} className="button muted-button">
         {showAllEmployees ? 'Hide All' : 'View All'}
        </button>
      </div>
      {showAllEmployees && renderAllEmployeesTree()}
    </div>
  );
};

export default Table;
