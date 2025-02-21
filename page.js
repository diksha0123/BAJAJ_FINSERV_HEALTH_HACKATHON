"use client";

import { useState } from "react";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await fetch("http://localhost:3000/api/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      setResponseData(result);
    } catch (error) {
      alert("Invalid JSON input");
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      e.target.checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((item) => item !== value)
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const selectedData = {};
    if (selectedOptions.includes("Alphabets")) {
      selectedData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      selectedData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest alphabet")) {
      selectedData.highest_alphabet = responseData.highest_alphabet;
    }

    return (
      <div>
        {Object.keys(selectedData).map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(selectedData[key])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Input JSON</h1>
      <textarea
        value={inputData}
        onChange={handleChange}
        placeholder='Enter JSON like {"data": ["M", "1", "334", "4", "B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h2>Select what to display:</h2>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest alphabet"
            onChange={handleOptionChange}
          />
          Highest alphabet
        </label>
      </div>

      <h2>Response</h2>
      {renderResponse()}
    </div>
  );
}
