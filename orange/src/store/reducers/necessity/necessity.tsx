import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';
import {
  House, Necessity, Place,
} from '../../../api';
import { NecessityState } from '../../state';

type Action = {
  type: string;
  target: House | Necessity | Place;
};

const initialState: NecessityState = {
  createStatus: necessityStatus.NONE,
  getStatus: necessityStatus.NONE,
  removeStatus: necessityStatus.NONE,
  countStatus: necessityStatus.NONE,
  updateStatus: necessityStatus.NONE,
  updatePlaceStatus: necessityStatus.NONE,
  removePlaceStatus: necessityStatus.NONE,
  places: [],
};

const PlaceResponseCases = [
  necessityConstants.CREATE_NECESSITYPLACE_SUCCESS,
  necessityConstants.REMOVE_NECESSITYPLACE_SUCCESS,
  necessityConstants.CREATE_PLACE_SUCCESS,
  necessityConstants.RENAME_PLACE_SUCCESS,
  necessityConstants.REMOVE_PLACE_SUCCESS,
];

const NecessityResponseCases = [
  necessityConstants.COUNT_NECESSITYPLACE_SUCCESS,
  necessityConstants.UPDATE_NECESSITYPLACE_SUCCESS,
];

function necessityreducer(state = initialState, action: Action): NecessityState {
  if (action.type === necessityConstants.GET_HOUSE_SUCCESS) {
    const house = action.target as House;
    return {
      ...state,
      getStatus: necessityStatus.SUCCESS,
      places: house.places,
    };
  }

  if (PlaceResponseCases.includes(action.type)) {
    let { places } = state;
    const data = action.target as Place;
    places = places.map((place) => (place.id === data.id ? data : place));

    if (action.type === necessityConstants.CREATE_NECESSITYPLACE_SUCCESS
      || action.type === necessityConstants.CREATE_PLACE_SUCCESS) {
      return {
        ...state,
        createStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    if (action.type === necessityConstants.RENAME_PLACE_SUCCESS) {
      return {
        ...state,
        updatePlaceStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    if (action.type === necessityConstants.REMOVE_NECESSITYPLACE_SUCCESS) {
      return {
        ...state,
        removeStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    if (action.type === necessityConstants.REMOVE_PLACE_SUCCESS) {
      return {
        ...state,
        removePlaceStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    return {
      ...state,
    };
  }

  if (NecessityResponseCases.includes(action.type)) {
    let { places } = state;
    const data = action.target as Necessity;
    places = places.map((place) => {
      if (place.id === data.place_id) {
        const newPlace = place;
        newPlace.necessities = place.necessities.map((necessity) => (
          necessity.id === data.id ? data : necessity));
        return newPlace;
      }
      return place;
    });

    if (action.type === necessityConstants.COUNT_NECESSITYPLACE_SUCCESS) {
      return {
        ...state,
        countStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    if (action.type === necessityConstants.UPDATE_NECESSITYPLACE_SUCCESS) {
      return {
        ...state,
        updateStatus: necessityStatus.SUCCESS,
        places,
      };
    }
    return {
      ...state,
    };
  }

  switch (action.type) {
    case necessityConstants.GET_HOUSE_FAILURE:
      return {
        ...state,
        getStatus: necessityStatus.FAILURE,
      };

    case necessityConstants.CREATE_NECESSITYPLACE_FAILURE:
      return {
        ...state,
        createStatus: necessityStatus.FAILURE,
      };
    case necessityConstants.CREATE_NECESSITYPLACE_FAILURE_NAME:
      return {
        ...state,
        createStatus: necessityStatus.FAILURE_NAME,
      };

    case necessityConstants.REMOVE_NECESSITYPLACE_FAILURE:
      return {
        ...state,
        removeStatus: necessityStatus.FAILURE,
      };

    case necessityConstants.COUNT_NECESSITYPLACE_FAILURE:
      return {
        ...state,
        countStatus: necessityStatus.FAILURE,
      };

    case necessityConstants.UPDATE_NECESSITYPLACE_FAILURE:
      return {
        ...state,
        updateStatus: necessityStatus.FAILURE,
      };

    case necessityConstants.RENAME_PLACE_FAILURE:
    case necessityConstants.RENAME_PLACE_FAILURE_MEMBER:
    case necessityConstants.RENAME_PLACE_FAILURE_NOT_FOUND:
      return {
        ...state,
        updatePlaceStatus: necessityStatus.FAILURE,
      };

    case necessityConstants.REMOVE_PLACE_FAILURE:
      return {
        ...state,
        removePlaceStatus: necessityStatus.FAILURE,
      };
    case necessityConstants.REMOVE_PLACE_FAILURE_LEADER:
      return {
        ...state,
        removePlaceStatus: necessityStatus.FAILURE_LEADER,
      };
    case necessityConstants.REMOVE_PLACE_FAILURE_MEMBER:
      return {
        ...state,
        removePlaceStatus: necessityStatus.FAILURE_MEMBER,
      };
    case necessityConstants.REMOVE_PLACE_FAILURE_NOT_FOUND:
      return {
        ...state,
        removePlaceStatus: necessityStatus.FAILURE_NOT_FOUND,
      };

    default:
      return { ...state };
  }
}

export default necessityreducer;
