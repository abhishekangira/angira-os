import { Component, Show, createSignal, lazy, onMount } from "solid-js";
import styles from "./App.module.css";

let touch = false;

if ("maxTouchPoints" in navigator) {
  touch = navigator.maxTouchPoints > 0;
  console.log("maxTouchPoints", navigator.maxTouchPoints);
}

let RenderedComponent: Component;

if (touch) {
  RenderedComponent = lazy(() => import("./Touch.tsx"));
} else {
  RenderedComponent = lazy(() => import("./Desktop.tsx"));
}

const App: Component = () => {
  return <RenderedComponent />;
};

export default App;
