import { useState, useEffect, useRef } from "react";
import store from "../store";

const Toggle = (props) => {
  const state = store.getState();
  const [mode, setMode] = useState(state.mode);
  const selectRef = useRef();

  useEffect(() => {
    setMode(state.mode);
  });

  const onChange = (ev) => {
    setMode(ev.target.value);
    store.setState({ mode: JSON.parse(ev.target.value) });

    if (state.play) {
      store.setState({ restart: true }, false);
    }
  };
  return (
    <select
      className="select select-primary select-md w-full max-w-xs my-2 text-center text-lg border-4"
      ref={selectRef}
      value={mode}
      onChange={onChange}>
      <option disabled>Select mode</option>
      <option value={"0"}>🗿🗞️✂️</option>
      <option value={"1"}>🗿🗞️✂️🦎🖖</option>
    </select>
  );
};

export default Toggle;
