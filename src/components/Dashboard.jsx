import React, { useState } from 'react'

export default function Dashboard() {
  const [search, setSearch] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if(search === ""){
      alert("bruhhhh")
    }

    try {
      // Perform API call using the 'search' state
      const response = await fetch(`https://api.example.com/search?query=${search}`);
      const data = await response.json();

      // Handle the API response data
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
