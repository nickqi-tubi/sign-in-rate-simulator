import randu from '@stdlib/random/base/randu';

const getRandomInt = (random) => (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const randuRamdom = randu.factory();

const getRandom = (generator) =>
  ({
    randu: (...args) => getRandomInt(randuRamdom)(...args),
  })[generator];

export default getRandom;
