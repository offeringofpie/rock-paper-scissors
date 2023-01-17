import { useState, useEffect, useRef } from "react";
import store from "../store";

const Winner = (props) => {
  const state = store.getState();
  const [winner, setWinner] = useState(state.winner);
  const btnRef = useRef();

  store.addListener((state) => {
    setWinner(state.winner);
  });

  useEffect(() => {
    if (winner.length) {
      btnRef.current.click();
    }
  }, [winner]);

  const restart = () => {
    store.setState({ restart: true }, false);
  };

  return (
    <div>
      <input type="checkbox" id="winner" className="modal-toggle" />
      <label htmlFor="winner" className="modal cursor-pointer">
        <label className="modal-box relative text-center" htmlFor="">
          <h3 className="text-lg font-bold text-accent">We have a winner!</h3>
          <h4 className="pt-4 pb-5 text-5xl">{winner}</h4>
          <label htmlFor="winner" className="btn btn-neutral" ref={btnRef}>
            Close
          </label>
          <label
            htmlFor="winner"
            className="btn btn-secondary ml-4"
            onClick={restart}>
            Restart
          </label>
        </label>
      </label>
    </div>
  );
};

export default Winner;
