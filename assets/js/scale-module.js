export default class Scale {
  constructor(tonic) {
    this.tonicName = tonic;
    this.tonicMidiNumber = noteNameToMidi(this.tonicName);
    this.major = majorScale(this.tonicMidiNumber);
    this.naturalMinor = naturalMinorScale(this.tonicMidiNumber);
  }
}

// helper functions
function createToneArray() {
  const noteNames = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];
  const toneArr = [];
  let x = 0;
  for (let i = 0; i < 128; i++) {
    if (x > noteNames.length - 1) {
      x = 0;
    }
    let note = {
      noteName: noteNames[x++],
      midiNumber: i,
      pitch: 13.75 * Math.pow(2, (i - 9) / 12),
    };
    toneArr[i] = note;
  }
  return toneArr;
}

function noteNameToMidi(tonicLetter) {
  switch (tonicLetter) {
    case "C":
      return 0;
    case "C#":
    case "Db":
      return 1;
    case "D":
      return 2;
    case "D#":
    case "Eb":
      return 3;
    case "E":
      return 4;
    case "F":
      return 5;
    case "F#":
    case "Gb":
      return 6;
    case "G":
      return 7;
    case "G#":
    case "Ab":
      return 8;
    case "A":
      return 9;
    case "A#":
    case "Bb":
      return 10;
    case "B":
      return 11;
    default:
      return null;
  }
}

// scale functions

function majorScale(tonic) {
  const toneArray = createToneArray();
  let scaleStep;
  let scaleStepCount = 0;
  let currentTone = tonic;
  let scale = [];

  for (let i = 0; i < toneArray.length; i++) {
    if (scaleStepCount > 7) {
      scaleStepCount = 1;
    }

    switch (scaleStepCount) {
      case 0:
        scaleStep = 0;
        break;
      case 1:
      case 5:
        tonic > 0 && currentTone <= tonic ? (scaleStep = -1) : (scaleStep = 2);
        break;
      case 2:
      case 4:
      case 6:
        tonic > 0 && currentTone <= tonic ? (scaleStep = -2) : (scaleStep = 2);
        break;
      case 3:
      case 7:
        tonic > 0 && currentTone <= tonic ? (scaleStep = -2) : (scaleStep = 1);
        break;
    }

    currentTone += scaleStep;

    if (currentTone < 0) {
      scaleStepCount = 1;
      currentTone = tonic + 2;
    }

    if (currentTone < toneArray.length) {
      scale.push(toneArray[currentTone]);
      scaleStepCount++;
    } else {
      return scale.sort((a, b) => a.pitch - b.pitch);
    }
  }
}

function naturalMinorScale(tonic) {
  const toneArray = createToneArray();
  let scaleStep;
  let scaleStepCount = 0;
  let currentTone = tonic;
  let scale = [];

  for (let i = 0; i < toneArray.length; i++) {
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
        tonic > 0 && currentTone <= tonic ? (scaleStep = -2) : (scaleStep = 2);
        break;
      case 2:
      case 5:
        tonic > 0 && currentTone <= tonic ? (scaleStep = -2) : (scaleStep = 1);
        break;
      case 3:
      case 6:
        tonic > 0 && currentTone <= tonic ? (scaleStep = -1) : (scaleStep = 2);
        break;
    }

    currentTone += scaleStep;

    if (currentTone < 0) {
      scaleStepCount = 1;
      currentTone = tonic + 2;
    }

    if (currentTone < toneArray.length) {
      scale.push(toneArray[currentTone]);
      scaleStepCount++;
    } else {
      return scale.sort((a, b) => a.pitch - b.pitch);
    }
  }
}
