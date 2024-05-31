import "./styles.css";
import App from "./App.svelte";

const targetElement = document.getElementById("app");
const app = new App({
  target: targetElement!,
});

export default app;
