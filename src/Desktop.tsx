import { Component, Show, createSignal } from "solid-js";
import { Motion, Presence } from "@motionone/solid";

const Desktop: Component<{}> = (props) => {
  const [state, setState] = createSignal<"booting" | "input" | "done">("input");
  const [name, setName] = createSignal("");
  const [isAnimating, setIsAnimating] = createSignal(false);

  return (
    <Motion.main
      style={{
        background: "black",
        color: "whitesmoke",
        display: "grid",
        "place-items": "center",
      }}
      animate={{
        background: state() === "done" ? "white" : "black",
        color: state() === "done" ? "black" : "whitesmoke",
      }}
    >
      <Show when={state() === "booting"}>
        <Motion.div style={{ display: "grid", "place-items": "center" }}>
          <Motion.h1
            animate={{ opacity: [0, 1] }}
            transition={{
              duration: 1,
              easing: "ease-in-out",
              repeat: 4,
              // @ts-ignore
              direction: "alternate",
            }}
            onMotionComplete={() => setState("input")}
          >
            Booting
          </Motion.h1>
        </Motion.div>
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
              else setState("done");
            }}
          >
            Done
          </button>
        </Motion.div>
      </Show>

      <Show when={state() === "done"}>
        <Motion.div animate={{ opacity: [0, 1] }}>
          <h1>Welcome {name()}, to The New World</h1>
          <button onClick={() => setState("booting")}>Reboot</button>
        </Motion.div>
      </Show>
    </Motion.main>
  );
};

export default Desktop;
