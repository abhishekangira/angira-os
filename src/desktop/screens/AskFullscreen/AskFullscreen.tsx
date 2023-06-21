import { Motion } from "@motionone/solid";
import { Component, createSignal } from "solid-js";
import styles from "./AskFullscreen.module.scss";

const AskFullscreen: Component<{
  onClick: () => void;
}> = (props) => {
  return (
    <div class={styles.wrapper}>
      <Motion.h1
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 1.5,
          easing: "ease-in-out",
        }}
      >
        For The Best Experience,
      </Motion.h1>
      <Motion.h1
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 1.5,
          easing: "ease-in-out",
          delay: 1.5,
        }}
      >
        Go Fullscreen
      </Motion.h1>
      <Motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 1.5,
          easing: "ease-in-out",
          delay: 1.5,
        }}
        class={styles.buttons}
      >
        <button
          onClick={() => {
            document.documentElement.requestFullscreen();
            props.onClick();
          }}
        />
        <button onClick={() => props.onClick()} />
      </Motion.div>
    </div>
  );
};

export default AskFullscreen;
