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
          <option>Artist 1</option>
          <option>Artist 2</option>
          <option>Artist 3</option>
          <option>Artist 4</option>
          <option>Artist 5</option>
        </select>
      </div>
      <div className="filter">
        <label>Filter by Genre:</label>
        <select>
          <option>Genre 1</option>
          <option>Genre 2</option>
          <option>Genre 3</option>
          <option>Genre 4</option>
          <option>Genre 5</option>
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
