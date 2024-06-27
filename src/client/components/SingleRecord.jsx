import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CSS/SingleRecord.css';
import { fetchSingleRecord, addItemToUserCart } from "../API";

const SingleRecord = ({ token }) => {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function getSingleRecord() {
      try {
        const response = await fetchSingleRecord(recordId);
        setRecord(response);
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    }
    getSingleRecord();
  }, [recordId]);

  const handleAddToCart = async () => {
    console.log("adding item to cart");
    if (token) {
      try {
        async function addItemToCart() {
          await addItemToUserCart(recordId, token, 1, record.price);
          console.log("added to cart");
          setAddedToCart(true);
        }
        addItemToCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.log("must log in");
      setMessage("Create an account or log in to add items to your cart");
    }
  };

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="record-container">
        {record && 
        <div>
          <h1>{record.title}</h1>
          <img src={record.img} alt="Album Cover" className="record-image" />
          <div className="record-details">
            <h2>{record.artist}</h2>
            <h3>{record.genre}</h3>
            <p>{record.description}</p>
            <h3>{record.price}</h3>
            {!addedToCart ? (
              <button onClick={() => handleAddToCart()} type="submit">Add to Cart</button>
            ) : (
              <button disabled>Added to Cart!</button>
            )
            }
            <button onClick={() => navigate('/cart')} type="submit">View Cart</button>
            <button onClick={() => navigate('/home')} type="submit">Return to Home</button>
            {message && 
            <h3>{' '}
              <span onClick={() => navigate('/register')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Create an account
              </span>{' '}
              <span>or </span>
              <span onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              log in
              </span>{' '}
              to add items to your cart!
            </h3>}
          </div>
        </div>}
      </div>
    </>
  );
};

export default SingleRecord;

