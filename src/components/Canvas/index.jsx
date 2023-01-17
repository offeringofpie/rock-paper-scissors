import React from "react";
import useCanvas from "./useCanvas";
import Play from "./Play";

const play = new Play();
play.init();

const draw = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  play.draw(ctx);
};

const Canvas = (props) => {
  const { ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
