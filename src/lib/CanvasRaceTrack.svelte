<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  let _canvas: HTMLCanvasElement = null;
  let _ctx: CanvasRenderingContext2D;
  let _id = null;
  let [_x, _y] = [0, 0];
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
    _x += 2;
  }
  function handleStart() {
    _id = requestAnimationFrame(move);
  }
</script>

<button on:click={() => cancelAnimationFrame(_id)}>stop</button>
<button on:click={() => handleStart()}>start</button>
<canvas bind:this={_canvas} width="300" height="300" />

<style>
  canvas {
    border: 1px solid grey;
  }
</style>
