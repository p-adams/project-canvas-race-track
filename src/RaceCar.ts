export type CarItem = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  color: string;
};

export type Car = CarItem & {
  init: (car: CarItem) => void;
  offset: number;
};

let RaceCar: Car = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  color: "",
  width: 0,
  height: 0,
  init({ x, y, dx, dy, width, height, color }: CarItem) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.width = width;
    this.height = height;
    return this;
  },
  get offset() {
    return 10 + this.dx;
  },
};

export const raceCar = RaceCar;
