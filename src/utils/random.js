import beta from '@stdlib/random/base/beta';
import randu from '@stdlib/random/base/randu';
import _ from 'lodash';

const getRandomInt = (random) => (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const randuRamdom = randu.factory();
const beta22Random = beta.factory(2, 5);
const beta25Random = beta.factory(2, 5);

const getRandom = (generator) =>
  ({
    lodash: _.random,
    randu: (...args) => getRandomInt(randuRamdom)(...args),
    beta22: (...args) => getRandomInt(beta22Random)(...args),
    beta25: (...args) => getRandomInt(beta25Random)(...args),
  })[generator];

export default getRandom;
