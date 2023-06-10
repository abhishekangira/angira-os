import { Component, Show, createSignal } from "solid-js";
import { Motion, Presence } from "@motionone/solid";
import winStart from "/winStart.mp3";
import styles from "./Desktop.module.scss";
import AskFullscreen from "./screens/AskFullscreen/AskFullscreen";
import Booting from "./screens/Booting";

const Desktop: Component<{}> = (props) => {
  const [state, setState] = createSignal<
    "askFullscreen" | "booting" | "input" | "done"
  >("askFullscreen");
  const [name, setName] = createSignal("");
  const [isAnimating, setIsAnimating] = createSignal(false);

  return (
    <Motion.main
      animate={{
        background: state() === "done" ? "white" : "black",
        color: state() === "done" ? "black" : "whitesmoke",
      }}
      transition={{
        duration: 2,
        easing: "ease-in-out",
      }}
      class={styles.desktop}
    >
      <Show when={state() === "askFullscreen"}>
        <AskFullscreen setState={setState} />
      </Show>
      <Show when={state() === "booting"}>
        <Booting setState={setState} />
      </Show>

      <Show when={state() === "input"}>
        <Motion.div animate={{ opacity: [0, 1] }}>
          <h1>Enter Your Name</h1>
          <Motion.input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            autofocus
            animate={isAnimating() ? { y: [5, -5, 0] } : {}}
            onMotionComplete={() => setIsAnimating(false)}
          />
          <button
            onClick={() => {
              if (name() === "") setIsAnimating(true);
              else {
                setState("done");
                const audio = new Audio(winStart);
                audio.play();
              }
            }}
          >
            Done
          </button>
        </Motion.div>
      </Show>

      <Show when={state() === "done"}>
        <Motion.div animate={{ opacity: [0, 1] }}>
          <h1>Welcome {name()}, to The New World</h1>
          <button
            onClick={() => {
              if (document.fullscreenElement) setState("booting");
              else setState("askFullscreen");
            }}
          >
            Reboot
          </button>
        </Motion.div>
      </Show>
    </Motion.main>
  );
};

export default Desktop;
