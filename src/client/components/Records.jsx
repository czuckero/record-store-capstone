import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
// import './Records.css';

const Records = () => {
  const albums = [
    { title: 'Record Title A', artist: 'Artist Name A', price: '$40.00', imgSrc: 'https://lh4.googleusercontent.com/proxy/2RdB-f83jxLIbwOV5NDlrUun46sq97bnANYrigIJV6vLJUB9LCSRu41NU13OMpPuJIKtFj-AU-ZFRCpACmbTQaggxnW0d6aXW1zV' },
    { title: 'Record Title B', artist: 'Artist Name B', price: '$35.00', imgSrc: 'https://via.placeholder.com/150' },
    { title: 'Record Title C', artist: 'Artist Name C', price: '$45.00', imgSrc: 'https://via.placeholder.com/150' },
    { title: 'Record Title D', artist: 'Artist Name D', price: '$50.00', imgSrc: 'https://via.placeholder.com/150' },
    { title: 'Record Title E', artist: 'Artist Name E', price: '$30.00', imgSrc: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="records">
      <h2>Shop Records</h2>
      <div className="album-list">
        {albums.map((album, index) => (
          <div key={index} className="album-item">
            <img src={album.imgSrc} alt={album.title} />
            <h3>{album.title}</h3>
            <h4>{album.artist}</h4>
            <p>{album.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Records;
