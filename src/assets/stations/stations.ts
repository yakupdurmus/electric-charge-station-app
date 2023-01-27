import {IStation} from 'interface/ISettings';

const esarj: IStation[] = require('./esarj.json');
const gcharge: IStation[] = require('./gcharge.json');
const powersarj: IStation[] = require('./powersarj.json');
const sharz: IStation[] = require('./sharz.json');
const volturun: IStation[] = require('./volturun.json');
const zes: IStation[] = require('./zes');

let allStations: IStation[] = [];

allStations = allStations.concat(
  esarj,
  gcharge,
  powersarj,
  sharz,
  volturun,
  zes,
);

export default {
  allStations,
  esarj,
  gcharge,
  powersarj,
  sharz,
  volturun,
  zes,
};
