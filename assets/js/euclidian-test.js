function euclidFilter(count, hitsPerBar, lengthOfBar, rotation = 0) {
  //1 count + (rythm-offset/rotation)
  //2 1 * hits per bar
  //3 2 % length of bar
  //4 3 < hits per bar ? 'true' : 'false'
  // let playNote;
  // playNote = count + rotation;
  // playNote *= hitsPerBar;
  // playNote %= lengthOfBar;
  // return playNote < hitsPerBar ? true : false;

  count += rotation;
  count *= hitsPerBar;
  count %= lengthOfBar;
  return count < hitsPerBar ? true : false;
}

let count = 0;

const interval = setInterval(function () {
  count >= 8 ? (count = 0) : count;

  if (euclidFilter(count, 3, 4)) {
    console.log(true);
  } else {
    console.log(count);
  }
  count++;
}, 500);
