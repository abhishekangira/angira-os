import { Component, lazy } from "solid-js";

let touch = false;

if ("maxTouchPoints" in navigator) {
  touch = navigator.maxTouchPoints > 0;
  console.log("maxTouchPoints", navigator.maxTouchPoints);
}

let RenderedComponent: Component;

if (touch) {
  RenderedComponent = lazy(() => import("./touch/Touch.tsx"));
} else {
  RenderedComponent = lazy(() => import("./desktop/Desktop.tsx"));
}

const App: Component = () => {
  return <RenderedComponent />;
};

export default App;
