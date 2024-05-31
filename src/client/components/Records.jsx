import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import './CSS/Records.css';
import { fetchAllRecords } from "../API";

const Records = () => {
  const [records, setRecords] = useState([]);

  const albums = [
    { title: 'Gold', artist: 'ABBA', price: '$38.99', imgSrc: 'https://m.media-amazon.com/images/I/91cPxQP9NmL._UF1000,1000_QL80_.jpg' },
    { title: 'At Folsom Prison', artist: 'Johnny Cash', price: '$24.99', imgSrc: 'https://m.media-amazon.com/images/I/91cgDY8ocrL._UF1000,1000_QL80_.jpg' },
    { title: 'Midnights', artist: 'Taylor Swift', price: '$24.95', imgSrc: 'https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0' },
    { title: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', price: '$35.99', imgSrc: 'https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg' },
    { title: 'DreamLand', artist: 'Glass Animals', price: '$23.99', imgSrc: 'https://i.scdn.co/image/ab67616d0000b27360d9f3955a8cc8eb67265a38' },
    { title: 'Songs of Love and Hate', artist: 'Leonard Cohen', price: '$24.99', imgSrc: 'https://cdn-p.smehost.net/sites/81c947ec3e5441a5a09cf933b1bfcf4f/wp-content/uploads/2021/03/LeonardCohen50thHeader.jpg' },
    { title: 'Voodoo', artist: 'D\'Angelo', price: '$54.99', imgSrc: 'https://m.media-amazon.com/images/I/4118ZBDVFVL._UF1000,1000_QL80_.jpg' },
    { title: 'Blue Train', artist: 'John Coltrane', price: '$29.95', imgSrc: 'https://cdn11.bigcommerce.com/s-w8qmypftv/images/stencil/1280x1280/products/1642082/4036926/NjctNDc5OC5qcGVn__44909.1680473732.jpg?c=2' },
    { title: 'Black Album', artist: 'Metallica', price: '$35.99', imgSrc: 'https://i.ebayimg.com/images/g/6vcAAOSwXHpca1W1/s-l1600.jpg' },
    { title: 'Thriller', artist: 'Michael Jackson', price: '$26.99', imgSrc: 'https://m.media-amazon.com/images/M/MV5BODhhZjJlYTktZDQ2MS00Yzk4LWFlOTQtYTgyOGE1ZGE5YWEyL2ltYWdlXkEyXkFqcGdeQXVyMzA5MjgyMjI@._V1_.jpg' },
  ];

  useEffect(() => {
    async function getAllRecords() {
      try {
        const response = await fetchAllRecords();
        console.log(response);
        setRecords(response)
      } catch (error) {
        throw error;
      }
    }
    getAllRecords();
  }, []);

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

