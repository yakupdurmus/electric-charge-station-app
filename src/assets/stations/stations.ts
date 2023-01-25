import {IAllStations} from 'interface/ISettings';

const esarj = require('./esarj.json');
const gcharge = require('./gcharge.json');
const powersarj = require('./powersarj.json');
const sharz = require('./sharz.json');
const volturun = require('./volturun.json');
const zes = require('./zes');

const allStations: IAllStations[] = {
  ...esarj,
  ...gcharge,
  ...powersarj,
  ...sharz,
  ...volturun,
  ...zes,
};

export default {
  allStations,
};
