function Scale(tonic) {
  this.tonic = tonic;
  this.major = this.majorScale();
  this.naturalMinor = this.naturalMinorScale();
}

Scale.prototype.noteNameToMidi = function () {
  switch (this.tonic) {
    case "C":
      return 0;
    case "C#":
      return 1;
    case "D":
      return 2;
    case "D#":
      return 3;
    case "E":
      return 4;
    case "F":
      return 5;
    case "F#":
      return 6;
    case "G":
      return 7;
    case "G#":
      return 8;
    case "A":
      return 9;
    case "A#":
      return 10;
    case "B":
      return 11;
  }
};

Scale.prototype.majorScale = function () {
  let scaleStep;
  let scaleStepCount = 0;
  let tone = this.tonic;
  let scale = [];

  for (let i = 0; i <= 127; i++) {
    if (scaleStepCount > 7) {
      scaleStepCount = 1;
    }

    switch (scaleStepCount) {
      case 0:
        scaleStep = 0;
        break;
      case 1:
      case 5:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -1)
          : (scaleStep = 2);
        break;
      case 2:
      case 4:
      case 6:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -2)
          : (scaleStep = 2);
        break;
      case 3:
      case 7:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -2)
          : (scaleStep = 1);
        break;
    }

    tone += scaleStep;
    if (tone <= 0) {
      tone = this.tonic + 1;
    }

    if (tone <= 127) {
      scale[i] = tone;
      scaleStepCount++;
    } else {
      return scale.sort((a, b) => a - b);
    }
  }
};

Scale.prototype.naturalMinorScale = function () {
  let scaleStep;
  let scaleStepCount = 0;
  let tone = this.tonic;
  let scale = [];

  for (let i = 0; i <= 127; i++) {
    if (scaleStepCount > 7) {
      scaleStepCount = 1;
    }

    switch (scaleStepCount) {
      case 0:
        scaleStep = 0;
        break;
      case 1:
      case 4:
      case 7:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -2)
          : (scaleStep = 2);
        break;
      case 2:
      case 5:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -2)
          : (scaleStep = 1);
        break;
      case 3:
      case 6:
        this.tonic > 0 && tone <= this.tonic
          ? (scaleStep = -1)
          : (scaleStep = 2);
        break;
    }

    tone += scaleStep;
    if (tone <= 0) {
      tone = this.tonic + 1;
    }

    if (tone <= 127) {
      scale[i] = tone;
      scaleStepCount++;
    } else {
      return scale.sort((a, b) => a - b);
    }
  }
};

const scale = new Scale(1);

console.log(scale);
