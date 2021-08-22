import { CubeGame } from "./cube-game";
import { CubeGameRenderer } from "./cube-game-renderer";
import { Point } from "./point";

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(init);
});

function init() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('game');
  const isTouch = Object.keys(window).indexOf('ontouchstart') !== -1;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const game = new CubeGame(40, 20);
  const renderer = new CubeGameRenderer(
    game,
    canvas.width,
    canvas.height,
    canvas.getContext('2d')
  );

  if (isTouch) {
    canvas.addEventListener('touchstart', e => {
      renderer.onTouch(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    });
  } else {
    canvas.addEventListener('click', _ => {
      renderer.onClick();
    });

    canvas.addEventListener('mousemove', e => {
      renderer.onMouseMove(new Point(e.offsetX, e.offsetY));
    });

    canvas.addEventListener('mouseleave', _ => {
      renderer.clearSelection();
    });
  }
}
