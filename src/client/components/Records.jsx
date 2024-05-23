import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Records = () => {
  return (
    <>
      <h2>Shop Records</h2>
      <div>
        <img src="https://lh4.googleusercontent.com/proxy/2RdB-f83jxLIbwOV5NDlrUun46sq97bnANYrigIJV6vLJUB9LCSRu41NU13OMpPuJIKtFj-AU-ZFRCpACmbTQaggxnW0d6aXW1zV" alt="vinyl record" />
        <h3>Record Title</h3>
        <h4>Artist Name</h4>
        <p>$40.00</p>
      </div>
    </>
  );
}

export default Records;