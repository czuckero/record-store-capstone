import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CSS/SingleRecord.css';
import { addItemToUserCart, fetchSingleRecord } from "../API";

const SingleRecord = ({ token }) => {
  const { recordId } = useParams();
  const [record, setRecord] = useState([]);
  const [message, setMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getSingleRecord() {
      try {
        const response = await fetchSingleRecord(recordId);
        setRecord(response);
      } catch (error) {
        throw error;
      };
    };
    getSingleRecord();
  }, [recordId]);

  const handleAddToCart = async () => {
    console.log("adding item to cart");
    if (token) {
      try {
        async function addItemToCart() {
          await addItemToUserCart(recordId, token, 1, record.price)
          console.log("added to cart");
          setAddedToCart(true);
        }
        addItemToCart();
      } catch (error) {
        throw error
      }
    } else {
      console.log("must log in");
      setMessage("Create an account or log in to add items to your cart")
    }
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
            <button onClick={() => navigate('/home')} type="submit">Return to Home</button>
            {message && <h3>{message}</h3>}
          </div>
        </div>
        }
      </div>
    </>
  );
}

export default SingleRecord;
