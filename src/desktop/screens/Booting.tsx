import { Motion } from "@motionone/solid";
import { Component } from "solid-js";

const Booting: Component<{
  onBootComplete: () => void;
}> = (props) => {
  return (
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
        onMotionComplete={() => props.onBootComplete()}
      >
        Booting
      </Motion.h1>
    </Motion.div>
  );
};

export default Booting;
