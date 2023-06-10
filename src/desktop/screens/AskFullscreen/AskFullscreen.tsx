import { Motion } from "@motionone/solid";
import { Component } from "solid-js";
import styles from "./AskFullscreen.module.scss";

const AskFullscreen: Component<{
  setState: (state: "askFullscreen" | "booting" | "input" | "done") => void;
}> = (props) => {
  return (
    <Motion.div
      animate={{ opacity: [0, 1] }}
      transition={{
        duration: 2,
        easing: "ease-in-out",
      }}
      style={{ display: "grid", "place-items": "center" }}
    >
      <h1>For best experience go fullscreen</h1>
      <button
        onClick={() => {
          document.documentElement.requestFullscreen();
          props.setState("booting");
        }}
      >
        Go Fullscreen
      </button>
      <button onClick={() => props.setState("booting")}>Skip</button>
    </Motion.div>
  );
};

export default AskFullscreen;
