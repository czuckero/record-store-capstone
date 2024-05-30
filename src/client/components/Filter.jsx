import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import './CSS/Filters.css';

const Filters = () => {
  return (
    <div className="filters">
      <div className="filter">
        <label>Filter by Artist:</label>
        <select>
          <option>Michael Jackson</option>
          <option>Metallica</option>
          <option>ABBA</option>
          <option>Johnny Cash</option>
          <option>Kendrick Lamar</option>
          <option>Taylor Swift</option>
          <option>Glass Animals</option>
          <option>Leonard Cohen</option>
          <option>D'Angelo</option>
          <option>John Coltrane</option>
        </select>
      </div>
      <div className="filter">
        <label>Filter by Genre:</label>
        <select>
          <option>R&B</option>
          <option>POP</option>
          <option>Rock</option>
          <option>Folk</option>
          <option>Country</option>
          <option>Indie</option>
          <option>Disco</option>
        </select>
      </div>
      <div className="filter">
        <label>Sort by:</label>
        <select>
          <option>Alphabetically</option>
          <option>By Price</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
