'use client'
import Image from "next/image";
import "../css/blr_model.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [areaLocation, setAreaLocation] = useState('');
  const [estPrice, setEstPrice] = useState('')
  useEffect(() => {
    fetch('https://ml-blr-house-prices.vercel.app/get_location_names')
      .then(response => response.json())
      .then(data => setAreaLocation(data.locations))
  }, [])

  const calculatePrice = async (formData) => {
    const requestBody = {};
    formData.forEach((value, key) => {
      requestBody[key] = value;
    });
    console.log(requestBody)
    const response = await fetch('https://ml-blr-house-prices.vercel.app/predict_home_price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()
    setEstPrice(data.estimated_price)
  }
  return (
    <>
      <h1>Home Price Estimator for Bangaluru City</h1>
      <form id="homePriceForm" action={calculatePrice}>
        <div className="input-group">
          <label htmlFor="location">Select Location:</label>
          <select id="location" name="location">
            {areaLocation && areaLocation.map((location, index) => (
              <option key={index}>{location}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="sqft">Approx. Square Feet:</label>
          <input type="number" name="total_sqft" min="0" required />
        </div>
        <div className="input-group">
          <label htmlFor="bhk">Number of BHK:</label>
          <input type="number"  name="bhk" min="0" max='10' required />
        </div>
        <div className="input-group">
          <label htmlFor="bath">Number of Baths:</label>
          <input type="number" name="bath" min="0" max='12' required />
        </div>
        <button type="submit">Estimate Price</button>
      </form>
      <div className="response-box">
        Estimated Price: {estPrice}
      </div>
    </>
  );
}
