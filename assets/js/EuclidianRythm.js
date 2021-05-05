export default class EuclidianRythm {
  constructor(hits, length) {
    this.rythmList = EuclidMap(hits, length);
  }
  Rotation(rotation) {
    let rotated = [];

    for (let i = 0; i < this.rythmList.length; i++) {
      let newIndex =
        (((i - rotation) % this.rythmList.length) + this.rythmList.length) %
        this.rythmList.length;

      rotated[i] = this.rythmList[newIndex];
    }

    this.rythmList = rotated;
  }
}

function EuclidMap(hits, length) {
  let list = [];

  let step;

  for (let i = 0; i < length; i++) {
    step = i;

    step = (step * hits) % length;

    list[i] = step < hits ? 1 : 0;
  }

  return list;
}
