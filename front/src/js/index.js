import { CubeGame } from "./cube-game";
import { CubeGameRenderer } from "./cube-game-renderer";
import { Point } from "./point";

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(init);
});

function init() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('game');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const game = new CubeGame(50, 25);
  const renderer = new CubeGameRenderer(
    game,
    canvas.width,
    canvas.height,
    canvas.getContext('2d')
  );

  canvas.addEventListener('click', e => {
    renderer.onClick(new Point(e.offsetX, e.offsetY));
  });

  canvas.addEventListener('mousemove', e => {
    renderer.onMouseMove(new Point(e.offsetX, e.offsetY));
  });

  canvas.addEventListener('mouseleave', _ => {
    renderer.clearSelection();
  });
}
