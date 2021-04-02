import React from "react";

function DiscordLink(props) {
  return (
    <a
      href="https://codechefvit.com/discord"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#738adb",
        width: 56,
        height: 56,
        borderRadius: "50%",
        display: "block",
        filter: "drop-shadow(0 0 5px #738adb)",
      }}
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
