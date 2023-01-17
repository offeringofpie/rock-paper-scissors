import { useState, useEffect, useRef } from "react";
import store from "../store";

const StartBtn = () => {
  const state = store.getState();
  const [text, setText] = useState("start");
  store.addListener((state) => {
    setText(state.play ? "stop" : "start");
  });

  useEffect(() => {
    setText(state.play ? "stop" : "start");
  }, [text]);

  const handleGame = () => {
    if (state.play) {
      store.setState({ play: !state.play }, false);
    } else {
      store.setState({ restart: true }, false);
    }
  };
  return (
    <button className="pl-3 pt-3" onClick={handleGame}>
      {state.play ? "◼" : "⏵"}
    </button>
  );
};

export default StartBtn;
