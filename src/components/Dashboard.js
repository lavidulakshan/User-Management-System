import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css'; // Import your Dashboard component CSS file

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state;

  // State variables for form input and editing
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: ''
  });

  // State variable for storing user details
  const [userDetails, setUserDetails] = useState([]);

  // State variable for tracking the index of the selected row for editing
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  // Function to handle form submission (Save)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form input if needed
    // Create a new user object from formState
    const newUser = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      gender: formState.gender,
      phoneNumber: formState.phoneNumber
    };

    // Add new user if selectedIndex is -1 (indicating a new user)
    setUserDetails([...userDetails, newUser]);

    // Clear form fields after submission
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      phoneNumber: ''
    });
  };

  // Function to handle delete user from table
  const handleDelete = (index) => {
    const updatedUsers = [...userDetails];
    updatedUsers.splice(index, 1);
    setUserDetails(updatedUsers);

    // Reset form fields and selectedIndex if deleting the selected row
    if (index === selectedIndex) {
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: ''
      });
      setSelectedIndex(-1);
    }
  };

  // Function to handle clicking on a row in the table (for editing)
  const handleRowClick = (index) => {
    const selectedUser = userDetails[index];
    setFormState({
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      gender: selectedUser.gender,
      phoneNumber: selectedUser.phoneNumber
    });
    setSelectedIndex(index); // Set selectedIndex to enable update mode
  };

  // Function to handle updating the selected row with form values (Update button functionality)
  const handleUpdateRow = () => {
    if (selectedIndex !== -1) {
      const updatedUsers = [...userDetails];
      updatedUsers[selectedIndex] = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        gender: formState.gender,
        phoneNumber: formState.phoneNumber
      };
      setUserDetails(updatedUsers);
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: ''
      });
      setSelectedIndex(-1); // Reset selectedIndex after update
    }
  };

  // Function to handle clearing the form fields (Clear button functionality)
  const handleClearForm = () => {
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      phoneNumber: ''
    });
    setSelectedIndex(-1); // Reset selectedIndex
  };

  return (
    <div className="dashboard-container">
      <h1 className="header">Hello, {username}!</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <h2>User Management System</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={formState.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleUpdateRow}>Update</button>
          <button type="button" onClick={handleClearForm}>Clear</button>
        </div>
      </form>

      {/* User Details Table */}
      <div className="user-details-table">
        <h2>User Details</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((user, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
