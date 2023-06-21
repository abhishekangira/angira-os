import { Component, Show, createSignal } from "solid-js";
import { Motion } from "@motionone/solid";
import winStart from "/winStart.mp3";
import styles from "./Desktop.module.scss";
import AskFullscreen from "./screens/AskFullscreen/AskFullscreen";
import Booting from "./screens/Booting";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/solid";

const desktopMachine = createMachine({
  id: "desktop",
  initial: "askFullscreen",
  states: {
    askFullscreen: {
      on: {
        DONE: "booting",
      },
    },
    booting: {
      on: {
        BOOT_COMPLETE: "input",
      },
    },
    input: {
      on: {
        DONE: "done",
      },
    },
    done: {
      on: {
        REBOOT: [
          {
            target: "booting",
            cond: (context, event) => event.fullscreen,
          },
          {
            target: "askFullscreen",
            cond: (context, event) => !event.fullscreen,
          },
        ],
      },
    },
  },
});

const Desktop: Component<{}> = (props) => {
  const [state, send] = useMachine(desktopMachine);
  const [name, setName] = createSignal("");
  const [isAnimating, setIsAnimating] = createSignal(false);

  return (
    <Motion.main
      animate={{
        background: state.matches("done") ? "white" : "black",
        color: state.matches("done") ? "black" : "whitesmoke",
      }}
      transition={{
        duration: 1,
        easing: "ease-in-out",
      }}
      class={styles.desktop}
    >
      <Show when={state.matches("askFullscreen")}>
        <AskFullscreen onClick={() => send("DONE")} />
      </Show>
      <Show when={state.matches("booting")}>
        <Booting onBootComplete={() => send("BOOT_COMPLETE")} />
      </Show>

      <Show when={state.matches("input")}>
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
                send("DONE");
                const audio = new Audio(winStart);
                audio.play();
              }
            }}
          >
            Done
          </button>
        </Motion.div>
      </Show>

      <Show when={state.matches("done")}>
        <Motion.div animate={{ opacity: [0, 1] }}>
          <h1>Welcome {name()}, to The New World</h1>
          <button
            onClick={() =>
              send("REBOOT", { fullscreen: !!document.fullscreenElement })
            }
          >
            Reboot
          </button>
        </Motion.div>
      </Show>
    </Motion.main>
  );
};

export default Desktop;
