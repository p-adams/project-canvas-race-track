export type CarItem = {
  id: string | null;
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  height: number;
  color: string;
  hasBoost?: boolean;
};

export type Car = CarItem & {
  init: (car: CarItem) => void;
  offset: number;
};

let RaceCar: Car = {
  id: null,
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  color: "",
  width: 0,
  height: 0,
  init({ id, x, y, dx, dy, width, height, color, hasBoost = false }: CarItem) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.width = width;
    this.height = height;
    this.hasBoost = hasBoost;
    return this;
  },
  get offset() {
    return this.width;
  },
};

export const raceCar = (car: CarItem): Car => Object.create(RaceCar).init(car);
