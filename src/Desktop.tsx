import { Component, onMount } from "solid-js";

const Desktop: Component<{}> = (props) => {
  console.log("Desktop");
  let ref: HTMLElement | null = null;
  onMount(() => {
    console.log("App", ref);
  });
  return (
    <main ref={ref!} style={{ background: "red" }}>
      <h1>Desktop</h1>
      <button
        onClick={() =>
          document.fullscreenElement
            ? document.exitFullscreen()
            : ref!.requestFullscreen()
        }
      >
        Go FullScreen
      </button>
    </main>
  );
};

export default Desktop;
