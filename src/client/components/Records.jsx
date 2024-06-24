import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Records.css';
import { fetchAllRecords } from "../API";

const Records = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const albums = [
    { 
      title: 'Gold', 
      artist: 'ABBA', 
      price: '$38.99', 
      imgSrc: 'https://m.media-amazon.com/images/I/91cPxQP9NmL._UF1000,1000_QL80_.jpg' 
    },
    { 
      title: 'At Folsom Prison', 
      artist: 'Johnny Cash', 
      price: '$24.99', 
      imgSrc: 'https://m.media-amazon.com/images/I/91cgDY8ocrL._UF1000,1000_QL80_.jpg' 
    },
    { 
      title: 'Midnights', 
      artist: 'Taylor Swift', 
      price: '$24.95', 
      imgSrc: 'https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0' 
    },
    { 
      title: 'Good Kid, M.A.A.D City', 
      artist: 'Kendrick Lamar', 
      price: '$35.99', 
      imgSrc: 'https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg' 
    },
    { 
      title: 'DreamLand', 
      artist: 'Glass Animals', 
      price: '$23.99', 
      imgSrc: 'https://i.scdn.co/image/ab67616d0000b27360d9f3955a8cc8eb67265a38' 
    },
    { 
      title: 'Songs of Love and Hate', 
      artist: 'Leonard Cohen', 
      price: '$24.99', 
      imgSrc: 'https://cdn-p.smehost.net/sites/81c947ec3e5441a5a09cf933b1bfcf4f/wp-content/uploads/2021/03/LeonardCohen50thHeader.jpg' 
    },
    { 
      title: 'Voodoo', 
      artist: 'D\'Angelo', 
      price: '$54.99', 
      imgSrc: 'https://m.media-amazon.com/images/I/4118ZBDVFVL._UF1000,1000_QL80_.jpg' 
    },
    { 
      title: 'Blue Train', 
      artist: 'John Coltrane', 
      price: '$29.95', 
      imgSrc: 'https://cdn11.bigcommerce.com/s-w8qmypftv/images/stencil/1280x1280/products/1642082/4036926/NjctNDc5OC5qcGVn__44909.1680473732.jpg?c=2' 
    },
    { 
      title: 'Black Album', 
      artist: 'Metallica', 
      price: '$35.99', 
      imgSrc: 'https://i.ebayimg.com/images/g/6vcAAOSwXHpca1W1/s-l1600.jpg' 
    },
    { 
      title: 'Thriller', 
      artist: 'Michael Jackson', 
      price: '$26.99', 
      imgSrc: 'https://i.discogs.com/YKbHdF0qfn2pCYM5MQA8Tqz_9Rz4oPInGTSjI6ViBJ8/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzMTk1/OTEtMTI3NjY0MDg5/OC5qcGVn.jpeg' 
    },
    {
      artist: "QUEEN",
      genre: "Rock",
      title: "A Night at the Opera",
      price: "38.99",
      imgSrc: "https://i.scdn.co/image/ab67616d0000b2735a0356dd4c5822509208f525",
    },
    {
      artist: "Lana Del Rey",
      genre: "Pop",
      title: "Born To Die",
      price: "24.95",
      imgSrc: "https://m.media-amazon.com/images/I/71v9YKQxm2L._UF1000,1000_QL80_.jpg",
    },
    {
      artist: "Bon Iver",
      genre: "Folk",
      title: "Bon Iver",
      price: "24.95",
      imgSrc: "https://images.genius.com/268e1d3caaaaa96597807788cf81e46d.600x600x1.jpg",
    },
    {
      artist: "Ramones",
      genre: "Punk",
      title: "End of the Century",
      price: "28.99",
      imgSrc: "https://i.discogs.com/tNmlix7kpG5HFFA3kTTO4iHjDvIyAFqIaPIhZDa4leM/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNDU1/MzczLTE1OTU2ODQ3/MjYtMTg4Mi5qcGVn.jpeg",
    },
    {
      artist: "Bjork",
      genre: "Art Pop",
      title: "Post",
      price: "29.99",
      imgSrc: "https://f4.bcbits.com/img/a4040590719_65",
    }
  ];
  

  useEffect(() => {
    async function getAllRecords() {
      try {
        const response = await fetchAllRecords();
        console.log('API response:', response);
        if (response && Array.isArray(response)) {
          setRecords(response.length ? response : albums);
        } else {
          console.error('Invalid response format:', response);
          setRecords(albums);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
        setRecords(albums); 
      }
    }
    getAllRecords();
  }, []);

  return (
    <div className="records">
      <h2>Shop Records</h2>
      <div className="album-list">
        {records.map((record, index) => (
          <div onClick={() => navigate(`/records/${record.id || index}`)} key={index} className="album-item">
            <img src={record.imgSrc || record.img} alt={record.title} />
            <h3>{record.title}</h3>
            <h4>{record.artist}</h4>
            <p>{record.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Records;


