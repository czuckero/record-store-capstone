const APIURL = "insert_api_url_here"

// Fetches the list of records
export async function fetchAllRecords() {
  const response = await fetch(`/api/records`);
  const result = await response.json();
  return result;
};

// Fetches the details of a single record
export async function fetchSingleRecord(recordId) {
  const response = await fetch(`/api/records/${recordId}`);
  const result = await response.json();
  return result;
};

// Create an account
export async function registerUser(formData) {
  const response = await fetch(`/api/auth/register`, {
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
  const response = await fetch(`/api/auth/login`,
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
  const response = await fetch(`/api/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const result = await response.json();
  return result;
};

// Fetches the items in a user's cart
export async function fetchUserCartItems(token, userId) {
  const response = await fetch(`/api/users/${userId}/cart/cartItems`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const result = await response.json();
  return result;
};

// Adds an item to a user's cart
export async function addItemToUserCart(cartId, recordId, quantity) {
  const response = await fetch(`/api/users/${cartId}/cart/cartItems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      record_id: recordId,
      quantity: quantity,
    })
  });
  const result = await response.json();
  return result;
};

// Removes an item from a user's cart
export async function deleteItemFromUserCart(userId, cartId, cartItemId) {
  const response = await fetch(`/api/users/${userId}/cart/${cartId}/cartItems/${cartItemId}`, {
    method: 'DELETE',
  });
  const result = response.json();
  return result;
};

// Changes the quantity of an item in a user's cart
export async function updateCartItemQuantity(userId, cartId, cartItemId, newQuantity) {
  const response = await fetch(`/api/users/${userId}/cart/${cartId}/cartItems/${cartItemId}`, {
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