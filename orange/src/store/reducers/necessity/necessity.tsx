import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';

type Action =
  | { type: string; target: any }
  | { type: string; target: any }

const initialState = {
    createStatus: necessityStatus.NONE,
    necessities: [
        {
          id: 1,
          text: '크리넥스 티슈',
          done: true
        },
        {
          id: 2,
          text: '섬유유연제',
          done: true
        },
        {
            id: 3,
          text: '삼다수 2L',
          done: false
        },
        {
            id: 4,
          text: 'AAA 건전지',
          done: false
        }
    ],
  };

const reducer = (state = initialState, action: Action) => {
    const data = action.target;
    switch (action.type) {
        case necessityConstants.CREATE_SUCCESS:
            return {
                createStatus: necessityStatus.SUCCESS,
                necessities: data,
            };
        case necessityConstants.CREATE_FAILURE:
            return {
                ...state,
                createStatus: necessityStatus.FAILURE,
            }
        // case 'TOGGLE':
        //     return state.map(Necessity =>
        //     Necessity.id === action.id ? { ...Necessity, done: !Necessity.done } : Necessity
        //     );
        // case 'REMOVE':
        //     return state.filter(Necessity => Necessity.id !== action.id);
        default:
            return { ...state }
    }
}

export default reducer;
