import { Component, createSignal, onMount } from "solid-js";

const Touch: Component<{}> = (props) => {
  const [bgColor, setBgColor] = createSignal("yellow");
  console.log("Touch");
  let ref: HTMLElement | null = null;
  onMount(() => {
    console.log("App", ref);
  });
  return (
    <main ref={ref!} style={{ background: bgColor() }}>
      <h1>Touch</h1>
      <button
        style={{
          width: "100px",
          height: "100px",
          "font-size": "20px",
          border: "none",
        }}
        onClick={() => {
          setBgColor((prev) => (prev === "red" ? "yellow" : "red"));
        }}
      >
        Touch me
      </button>
    </main>
  );
};

export default Touch;
