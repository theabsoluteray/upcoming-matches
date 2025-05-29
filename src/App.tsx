import React, { useEffect, useState } from "react";
import "./App.css";

// Define the type for match data
type Team = {

  
  name: string;
  logo: string;
};

type Match = {
  id: number;
  date: string;
  league: string;
  home_team: Team;
  away_team: Team;
};

function App() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/matches")
      .then((res) => res.json())
      .then((data: Match[]) => {
        setMatches(data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Upcoming Matches</h1>
      <div className="grid">
        {matches.map((match) => (
          <div className="match-card" key={match.id}>
            <h3>{match.league}</h3>
            <p>{new Date(match.date).toLocaleString()}</p>
            <div className="teams">
              <div className="team">
                <img src={match.home_team.logo} alt={match.home_team.name} />
                <span>{match.home_team.name}</span>
              </div>
              <span className="vs">vs</span>
              <div className="team">
                <img src={match.away_team.logo} alt={match.away_team.name} />
                <span>{match.away_team.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
