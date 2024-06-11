import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CSS/SingleRecord.css';
import { addItemToUserCart, fetchSingleRecord } from "../API";

const SingleRecord = ({ token }) => {
  const { recordId } = useParams();
  const [record, setRecord] = useState([]);

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
        }
        addItemToCart();
      } catch (error) {
        throw error
      }
    } else {
      console.log("must log in");
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor vel velit a ullamcorper. Aenean venenatis risus in lectus convallis, nec auctor urna interdum. Duis id ex ac libero placerat gravida.
            </p>
            <p>
              Nulla facilisi. Phasellus convallis lacinia sapien, id vehicula metus varius in. Mauris accumsan tincidunt dui, ut feugiat arcu ultrices id. Morbi tristique lacinia massa, id sagittis velit vehicula ut. Integer vitae nisl vitae neque tempus malesuada.
            </p>
            <h3>{record.price}</h3>
            <button onClick={() => handleAddToCart()} type="submit">Add to Cart</button>
          </div>
        </div>
        }
      </div>
    </>
  );
}

export default SingleRecord;
