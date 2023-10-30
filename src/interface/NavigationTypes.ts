import {IStation} from './ISettings';

type RootStackParamTypes = {
  HomeScreen: undefined;
  FavoriteStationScreen: undefined;
  FeedbackForm: undefined;
  LoginScreen: undefined;
  MapPermissionScreen: undefined;
  StationSearchScreen: {
    refreshMarkerListAndNavigate: (station: IStation) => Promise<void>;
  };
  StationsScreen: {
    selectedStation?: IStation;
  };
};

export type {RootStackParamTypes};
