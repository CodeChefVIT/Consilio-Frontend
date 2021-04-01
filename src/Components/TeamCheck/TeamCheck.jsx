import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TeamCheck({ data }) {
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    if (data.team.length === 0) {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  return (
    <>
      {alreadyJoined ? (
        <h3 className="dash-subhead">Team {data?.team.name}</h3>
      ) : (
        <Link to="/app/team">
          <button className="primary-button">Join/Create a team</button>
        </Link>
      )}
    </>
  );
}

export default TeamCheck;
