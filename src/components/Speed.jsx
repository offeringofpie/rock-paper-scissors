import { useState, useEffect, useRef } from "react";
import store from "../store";

const Amount = (props) => {
  const state = store.getState();
  const [speed, setSpeed] = useState(state.speed);

  store.addListener((state) => {
    setSpeed(state.speed);
  });

  useEffect(() => {
    if (state.play) {
      store.setState({ restart: true }, false);
    }
  }, [speed]);

  const onMouseUp = (ev) => {
    store.setState({
      speed: ev.target.value,
    });
  };
  return (
    <div className="my-2">
      <input
        type="range"
        className="range range-primary"
        step="0.1"
        min="0.1"
        max="1"
        defaultValue={speed}
        onMouseUp={onMouseUp}
      />
      <datalist
        id="values"
        className="w-full flex justify-between text-xs text-primary">
        <option value="0.1" label="0.1"></option>
        <option value="0.4" label="0.4"></option>
        <option value="0.6" label="0.6"></option>
        <option value="0.8" label="0.8"></option>
        <option value="1" label="1"></option>
      </datalist>
    </div>
  );
};

export default Amount;
