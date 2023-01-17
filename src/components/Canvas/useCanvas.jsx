import { useRef, useEffect } from "react";
import store from "../../store";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    store.setState({ ctx: context }, false);
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      resizeCanvas(canvas);
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

function resizeCanvas(canvas) {
  const { width, height } = document
    .querySelector(".drawer-content")
    .getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
}

export default useCanvas;
