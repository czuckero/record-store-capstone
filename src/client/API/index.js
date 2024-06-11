const APIURL = "http://localhost:3000"

// Fetches the list of records
export async function fetchAllRecords() {
  const response = await fetch(`${APIURL}/api/records`);
  const result = await response.json();
  return result;
};

// Fetches the details of a single record
export async function fetchSingleRecord(recordId) {
  const response = await fetch(`${APIURL}/api/records/${recordId}`);
  const result = await response.json();
  return result;
};

// Create an account
export async function registerUser(formData) {
  const response = await fetch(`${APIURL}/api/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  const result = await response.json();
  return result;
};

// Login into an account 
export async function login(userData) {
  const response = await fetch(`${APIURL}/api/users/login`,
  {
    method: "POST", 
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  });
  const result = await response.json();
  return result;
};

// Fetches a user's account details
export async function fetchUserData(token) {
  const response = await fetch(`${APIURL}/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const result = await response.json();
  return result;
};

// Fetches the items in a user's cart
export async function fetchUserCartItems(token) {
  const response = await fetch(`${APIURL}/api/cart`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const result = await response.json();
  return result;
};

// Adds an item to a user's cart
export async function addItemToUserCart(recordId, token, quantity, price) {
  const response = await fetch(`${APIURL}/api/cart/cartItems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      record_id: recordId,
      quantity: quantity,
      price: price,
    })
  });
  const result = await response.json();
  return result;
};

// Removes an item from a user's cart
export async function deleteItemFromUserCart(token, cartItemId) {
  const response = await fetch(`${APIURL}/api/cart/cartItems/${cartItemId}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const result = response.json();
  return result;
};

// Changes the quantity of an item in a user's cart
export async function updateCartItemQuantity(userId, cartId, cartItemId, newQuantity) {
  const response = await fetch(`${APIURL}/api/users/${userId}/cart/${cartId}/cartItems/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: newQuantity,
    })
  });
  const result = response.json();
  return result;
};