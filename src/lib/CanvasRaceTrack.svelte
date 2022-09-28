<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  let speed = 2;
  const DEFAULT_CAR_SIZE = 30;
  let _canvas: HTMLCanvasElement = null;
  let _ctx: CanvasRenderingContext2D;
  let _id = null;
  let [_x, _y] = [10, 10];
  let dx = 12;
  let dy = 12;
  const OFFSET = 10 + dx;
  let cars = [];

  onMount(() => {
    _ctx = _canvas.getContext("2d");
    drawCar("orange");
  });
  afterUpdate(() => {});

  function drawCar(color) {
    _ctx.beginPath();
    _ctx.rect(_x, _y, DEFAULT_CAR_SIZE, DEFAULT_CAR_SIZE - 12);
    _ctx.fillStyle = color;
    _ctx.fill();
    _ctx.closePath();
  }

  function move() {
    _id = requestAnimationFrame(move);
    _ctx.clearRect(0, 0, 300, 300);
    drawCar("red");
    if (!_canvas) return;
    if (_x + dx < _canvas.width - DEFAULT_CAR_SIZE && _y + dy === OFFSET) {
      // move right;
      _x += dx;
    }
    if (
      _x + dx >= _canvas.width - DEFAULT_CAR_SIZE &&
      _y + dy < _canvas.height + DEFAULT_CAR_SIZE
    ) {
      // move down
      _y += dy;
    }
    if (_y + dy > _canvas.height - DEFAULT_CAR_SIZE) {
      // move left
      _x -= dx;
    }
    if (_x + dx === OFFSET) {
      // move up
      _y -= dy;
    }
  }
  function handleStart() {
    _id = requestAnimationFrame(move);
  }
</script>

<div class="Action-buttons">
  <button on:click={() => cancelAnimationFrame(_id)}>stop</button>
  <button on:click={() => handleStart()}>start</button>
  <input type="number" bind:value={speed} />
</div>

<canvas bind:this={_canvas} width="300" height="300" />

<style>
  canvas {
    border: 1px solid grey;
  }
  .Action-buttons {
    margin-bottom: 4px;
  }
</style>
