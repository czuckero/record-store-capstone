import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CSS/SingleRecord.css';

const SingleRecord = () => {
  return (
    <>
      <div className="record-container">
        <h1>Album Title</h1>
        <img src="https://via.placeholder.com/400" alt="Album Cover" className="record-image" />
        <div className="record-details">
          <h2>Artist Name</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor vel velit a ullamcorper. Aenean venenatis risus in lectus convallis, nec auctor urna interdum. Duis id ex ac libero placerat gravida.
          </p>
          <p>
            Nulla facilisi. Phasellus convallis lacinia sapien, id vehicula metus varius in. Mauris accumsan tincidunt dui, ut feugiat arcu ultrices id. Morbi tristique lacinia massa, id sagittis velit vehicula ut. Integer vitae nisl vitae neque tempus malesuada.
          </p>
        </div>
      </div>
    </>
  );
}

export default SingleRecord;
