import React, { useState, useEffect } from "react";
import "./CSS/Account.css";
import { 
  fetchUserData, 
  fetchAllUsers, 
  fetchAllRecords, 
  updateRecord, 
  deleteRecord,
  createRecord
} from "../API";
import { useNavigate } from "react-router-dom";

const Account = ({ token, setToken }) => {
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    // registrationDate: "2023-01-15",
    // purchaseHistory: [
    //   { id: 1, item: "Album A", date: "2023-03-10", amount: "$40.00" },
    //   { id: 2, item: "Album B", date: "2023-04-22", amount: "$35.00" },
    //   { id: 3, item: "Album C", date: "2023-05-18", amount: "$45.00" },
    // ],
  });
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfRecords, setListOfRecords] = useState([]);
  const [newPrice, setNewPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetchUserData(token);
        console.log(response);
        setUserData(response)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUserData();
  }, [token]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetchAllUsers(token);
        console.log(response);
        setListOfUsers(response)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getAllUsers();
  }, [token]);

  useEffect(() => {
    async function getAllRecords() {
      try {
        const response = await fetchAllRecords();
        setListOfRecords(response)
      } catch (error) {
        throw error;
      };
    };
    getAllRecords();
  }, []);

  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteRecord(token, recordId);
      setListOfRecords(listOfRecords.filter(record => record.id !== recordId));
      console.log(recordId, "record deleted");
    } catch (error) {
      throw error;
    };
  };

  const handlePriceChange = async (record_id, genre, artist, title, price, description, img) => {
    try {
      if (newPrice !== "") {
        await updateRecord(token, record_id, genre, artist, title, price, description, img);
        setListOfRecords(listOfRecords.map(record => record.id === record_id ? { ...record, price } : record));
        console.log(listOfRecords);
        setNewPrice("");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      genre: genre,
      artist: artist,
      title: title,
      price: price,
      description: description,
      img: image
    }

    try {
      const response = await createRecord(token, formData);
      console.log(response);
      setListOfRecords([...listOfRecords, response]);
    } catch (error) {
      throw error
    }
    setArtist('');
    setGenre('');
    setTitle('');
    setPrice('');
    setDescription('');
    setImage('');
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password update logic here
    console.log("Password data submitted:", passwordData);
  };

  if (token && userData.is_admin === false) {
    return (
      <>
        <div className="account-container">
          <h1>Account Information</h1>
          <div className="user-info">
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              {/* <strong>Registered on:</strong>{" "}
              {new Date(userData.registrationDate).toLocaleDateString()} */}
            </p>
          </div>
  
          <div className="update-password">
            {/* <h2>Update Password</h2>
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
              </label> */}
              {/* <button type="submit">Update Password</button>
            </form> */}
            <button onClick={() => handleLogout()} type="submit">Log out</button>
          </div>
  
          {/* <div className="purchase-history">
            <h2>Purchase History</h2>
            <ul>
              {userData.purchaseHistory.map((purchase) => (
                <li key={purchase.id}>
                  <p>
                    <strong>Item:</strong> {purchase.item}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(purchase.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Amount:</strong> {purchase.amount}
                  </p>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </>
    );
  } else if (token && userData.is_admin === true) {
    return (
      <>
        <div className="account-container">
          <h1>Account Information</h1>
          <div className="user-info">
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>ADMIN ACCOUNT</strong>
            </p>
            <button onClick={() => handleLogout()} type="submit">Log out</button>
          </div>

          <div>
            <h2>Registered Users</h2>
            <ul>
              {listOfUsers.map(user => (
                <li key={user.id} className="cart-item">
                  <span>Username: {user.username}</span>
                  <span>Email: {user.email}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h2>Add New Record</h2>
              <form onSubmit={handleSubmit}>
                <input placeholder="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <input placeholder="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input placeholder="image url" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit">Create Record</button>
              </form>
            </div>
            <h2>All Records</h2>
            <ul>
              {listOfRecords.map(record => (
                <li key={record.id} className="cart-item">
                  <span>{record.title}</span>
                  <span>{record.artist}</span>
                  <span>${record.price}</span>
                  <div className="button-container">
                    <form onSubmit={(e) => { 
                      e.preventDefault(); 
                      handlePriceChange(
                        record.id, 
                        record.genre, 
                        record.artist, 
                        record.title, 
                        newPrice,
                        record.description,
                        record.img); 
                      }}
                    >
                      <input 
                        type="number" 
                        placeholder="price"
                        onChange={(e) => {
                            setNewPrice(e.target.value);
                          }
                        }
                        min="0"
                        step="0.01"
                      >
                      </input>
                      <button type="submit">Update Price</button>
                    </form>
                    <button onClick={() => handleDeleteRecord(record.id)}>Remove Record</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>   
    )
  } else {
    return (
      <>
        <div className="account-container">
          <p>You must login to see your account information.</p>
          <button type='submit' onClick={() => navigate('/login')}>Login</button>
          <p>No account? Create one here!</p>
          <button type='submit' onClick={() => navigate('/register')}>Create Account</button>
        </div>
      </>
    );
  }
};

export default Account;
