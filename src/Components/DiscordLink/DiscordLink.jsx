import React from "react";
import "./DiscordLink.css"

function DiscordLink(props) {
  return (
    <a
      href="https://codechefvit.com/discord"
      target="_blank"
      rel="noreferrer"
      className="discord"
    >
      <img
        src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png"
        alt="Discord"
        style={{ width: "100%" }}
      />
    </a>
  );
}

export default DiscordLink;
