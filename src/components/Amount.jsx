import { useState, useEffect, useRef } from "react";
import store from "../store";

const Amount = (props) => {
  const state = store.getState();
  const [amount, setAmount] = useState(state.amount);

  store.addListener((state) => {
    setAmount(state.amount);
  });

  useEffect(() => {
    if (state.play) {
      store.setState({ restart: true }, false);
    }
  }, [amount]);

  const onMouseUp = (ev) => {
    store.setState({
      amount: ev.target.value,
    });
  };
  return (
    <div className="my-2">
      <input
        type="range"
        className="range range-primary"
        step="10"
        min="10"
        max="200"
        defaultValue={amount}
        onMouseUp={onMouseUp}
      />
      <datalist
        id="values"
        className="w-full flex justify-between text-xs text-primary">
        <option value="10" label="10"></option>
        <option value="50" label="50"></option>
        <option value="100" label="100"></option>
        <option value="150" label="150"></option>
        <option value="200" label="200"></option>
      </datalist>
    </div>
  );
};

export default Amount;
