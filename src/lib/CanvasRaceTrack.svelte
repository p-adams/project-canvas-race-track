<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { raceCar } from "../RaceCar";
  let _canvas: HTMLCanvasElement = null;
  let _ctx: CanvasRenderingContext2D;
  let _id = null;
  const greenCar = raceCar({
    x: 10,
    y: 10,
    dx: 12,
    dy: 12,
    color: "green",
    width: 30,
    height: 18,
  });
  const redCar = raceCar({
    x: 10,
    y: 20,
    dx: 4,
    dy: 2,
    color: "red",
    width: 30,
    height: 18,
  });

  let cars = [greenCar, redCar];

  onMount(() => {
    _ctx = _canvas.getContext("2d");
    for (const car of cars) {
      drawCar(car);
    }
  });
  afterUpdate(() => {});

  function drawCar(car) {
    _ctx.beginPath();
    _ctx.rect(car.x, car.y, car.width, car.height);
    _ctx.fillStyle = car.color;
    _ctx.fill();
    _ctx.closePath();
  }

  function move() {
    _id = requestAnimationFrame(move);
    _ctx.clearRect(0, 0, 300, 300);
    if (!_canvas) return;
    for (const car of cars) {
      drawCar(car);
      if (
        car.x + car.dx < _canvas.width - car.width &&
        car.y + car.dy === car.offset
      ) {
        // move right;
        car.x += car.dx;
      }
      if (
        car.x + car.dx >= _canvas.width - car.width &&
        car.y + car.dy < _canvas.height + car.width
      ) {
        // move down
        car.y += car.dy;
      }
      if (car.y + car.dy > _canvas.height - car.width) {
        // move left
        car.x -= car.dx;
      }
      if (car.x + car.dx === car.offset) {
        // move up
        car.y -= car.dy;
      }
    }
  }
  function handleStart() {
    _id = requestAnimationFrame(move);
  }
</script>

<div class="Action-buttons">
  <button on:click={() => cancelAnimationFrame(_id)}>stop</button>
  <button on:click={() => handleStart()}>start</button>
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
