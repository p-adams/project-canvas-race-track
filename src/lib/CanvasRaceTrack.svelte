<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  let speed = 2;
  let _canvas: HTMLCanvasElement = null;
  let _ctx: CanvasRenderingContext2D;
  let _id = null;
  let [_x, _y] = [10, 10];
  let cars = [];
  onMount(() => {
    _ctx = _canvas.getContext("2d");
    drawCar("orange");
  });
  afterUpdate(() => {});

  function drawCar(color) {
    _ctx.beginPath();
    _ctx.rect(_x, _y, 30, 30);
    _ctx.fillStyle = color;
    _ctx.fill();
    _ctx.closePath();
  }

  function move() {
    _id = requestAnimationFrame(move);
    _ctx.clearRect(0, 0, 300, 300);
    drawCar("red");
    if (_x < 260 && _y === 10) {
      // move right
      _x += speed;
    } else if (_x === 260 && _y < 260) {
      // move down
      _y += speed;
    } else if (_y === 260 && _x > 10) {
      // move back
      _x -= speed;
    } else if (_y <= 260) {
      // move up
      _y -= speed;
    }
  }
  function handleStart() {
    _id = requestAnimationFrame(move);
  }
</script>

<div class="Action-buttons">
  {speed}
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
