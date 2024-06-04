import React, { useState, useEffect } from 'react';
import './CSS/Account.css';
import { fetchUserData } from '../API';

const Account = ({ token }) => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    registrationDate: '2023-01-15',
    purchaseHistory: [
      { id: 1, item: 'Album A', date: '2023-03-10', amount: '$40.00' },
      { id: 2, item: 'Album B', date: '2023-04-22', amount: '$35.00' },
      { id: 3, item: 'Album C', date: '2023-05-18', amount: '$45.00' }
    ]
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // useEffect(() => {
  //   async function getUserData() {
  //     try {
  //       const response = await fetchUserData(token);
  //       console.log(response);
  //     } catch (error) {
  //       throw error
  //     }
  //   }
  //   getUserData();
  // }, [token]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password update logic here
    console.log('Password data submitted:', passwordData);
  };

  return (
    <>
      <div className="account-container">
        <h1>Account Information</h1>
        <div className="user-info">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Registered on:</strong> {new Date(userData.registrationDate).toLocaleDateString()}</p>
        </div>

        <div className="update-password">
          <h2>Update Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <label>
              Current Password:
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <label>
              Confirm New Password:
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <button type="submit">Update Password</button>
          </form>
        </div>

        <div className="purchase-history">
          <h2>Purchase History</h2>
          <ul>
            {userData.purchaseHistory.map((purchase) => (
              <li key={purchase.id}>
                <p><strong>Item:</strong> {purchase.item}</p>
                <p><strong>Date:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> {purchase.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Account;
