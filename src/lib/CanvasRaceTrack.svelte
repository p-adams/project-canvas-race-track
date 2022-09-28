<script lang="ts">
  import { raceCar, type Car } from "../RaceCar";
  import { onMount } from "svelte";
  let id = null;
  let canvas: HTMLCanvasElement = null;
  let ctx = null;
  let canvasWidth = 600;
  let canvasHeight = 200;

  const greenCar = raceCar({
    id: "green_car",
    x: 10,
    y: 10,
    dx: 2,
    dy: 12,
    color: "green",
    width: 30,
    height: 18,
    hasBoost: true,
  });

  const blueCar = raceCar({
    id: "blue_car",
    x: 10,
    y: 40,
    dx: 4,
    dy: 12,
    color: "blue",
    width: 30,
    height: 18,
  });

  const redCar = raceCar({
    id: "red_car",
    x: 10,
    y: 70,
    dx: 6,
    dy: 12,
    color: "red",
    width: 30,
    height: 18,
  });

  const cars = [greenCar, blueCar, redCar];

  onMount(() => {
    ctx = canvas.getContext("2d");
    for (const car of cars) {
      drawCar(car);
    }
  });

  function drawCar(car: Car) {
    ctx.beginPath();
    ctx.rect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = car.color;
    ctx.fill();
    ctx.closePath();
  }

  function _boost(car: Car) {
    let speed = 120;
    let diff = speed - 15;
    if (car.hasBoost) {
      if (car.x + car.dx > canvas.width / 3) {
        car.x += speed * car.dx - car.dy - diff;
      } else {
        car.x += car.dx;
      }
    }
  }

  function move() {
    id = requestAnimationFrame(move);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (!canvas) {
      return;
    }
    for (const car of cars) {
      drawCar(car);
      if (car.x + car.dx < canvas.width - car.offset) {
        car.x += car.dx;
      }
    }
  }

  function handleStart() {
    id = requestAnimationFrame(move);
  }
</script>

<div class="Action-buttons">
  <button on:click={() => cancelAnimationFrame(id)}>stop</button>
  <button on:click={() => handleStart()}>start</button>
</div>
<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />

<style>
  canvas {
    border: 1px solid gray;
  }
</style>
