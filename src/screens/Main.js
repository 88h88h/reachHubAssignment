import React, { useState, useEffect } from "react";

function Main() {
  const [games, setGames] = useState([]);
  const [loadMoreOffset, setLoadMoreOffset] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `https://lichess.org/api/games/user/BlunderJan?since=1590969600000`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const gamesData = (await response.text()).match(/.+/g).map(JSON.parse);
      setGames(gamesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreGames = async () => {
    try {
      const response = await fetch(
        `https://lichess.org/api/games/user/BlunderJan?since=1590969600000&max=${loadMoreOffset}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newGamesData = await response.json();
      setGames((prevGames) => [...prevGames, ...newGamesData]);
      setLoadMoreOffset((prevOffset) => prevOffset + 10);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://lichess.org/api/games/user/BlunderJan?since=1590969600000&max=${loadMoreOffset}&opponent=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const searchData = await response.json();
      setGames(searchData);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Chess Game List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by opponent username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="list-group">
        {games.map((game, index) => (
          <li key={index} className="list-group-item">
            <div>Winner: {game.winner}</div>
            <div>Turns: {game.turns}</div>
            <div>Date: {new Date(game.createdAt).toLocaleString()}</div>
            <div>Time Limit: {game.clock.totalTime}</div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-4" onClick={loadMoreGames}>
        Load More
      </button>
    </div>
  );
}

export default Main;
