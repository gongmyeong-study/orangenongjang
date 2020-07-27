import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';

// export interface NecessityDataParams {
//   id: number;
//   text: string;
//   done: boolean;
// }

// export interface NecessityState {
//   necessities: NecessityDataParams[];
//   input: string;
// }

// export const CREATE = "Necessity/CREATE";
// export const REMOVE = "Necessity/REMOVE";
// export const TOGGLE = "Necessity/TOGGLE";
// export const CHANGE_INPUT = "Necessity/CHANGE_INPUT";

// interface CreateAction {
//   type: typeof CREATE;
//   payload: NecessityDataParams;
// }

// interface RemoveAction {
//   type: typeof REMOVE;
//   meta: {
//     id: number;
//   };
// }

// interface ToggleAction {
//   type: typeof TOGGLE;
//   meta: {
//     id: number;
//   };
// }

// interface ChangeInputAction {
//   type: typeof CHANGE_INPUT;
//   meta: {
//     input: string;
//   };
// }

// let target: any

// export type NecessityActionTypes =
//   | target
//   | CreateAction
//   | RemoveAction
//   | ToggleAction
//   | ChangeInputAction;


// // actions

// let autoId = 0;

// function create(text: string) {
//   return {
//     type: CREATE,
//     payload: {
//       id: autoId++,
//       text: text,
//       done: false
//     }
//   };
// }

// function remove(id: number) {
//   return {
//     type: REMOVE,
//     meta: {
//       id
//     }
//   };
// }

// function toggle(id: number) {
//   return {
//     type: TOGGLE,
//     meta: {
//       id
//     }
//   };
// }

// function changeInput(input: string) {
//   return {
//     type: CHANGE_INPUT,
//     meta: {
//       input
//     }
//   };
// }

// export const actionCreators = {
//   create,
//   toggle,
//   remove,
//   changeInput
// };


// // reducers

// const initialState: NecessityState = {
//   necessities: [
//     {
//       id: 1,
//       text: '크리넥스 티슈',
//       done: true
//     },
//     {
//       id: 2,
//       text: '섬유유연제',
//       done: true
//     },
//     {
//       id: 3,
//       text: '삼다수 2L',
//       done: false
//     },
//     {
//       id: 4,
//       text: 'AAA 건전지',
//       done: false
//     }
//   ],
//   input: ""
// };


// function necessityReducer(
//   state = initialState,
//   action: NecessityActionTypes
// ): NecessityState {
//   const data = action.target;
//   switch (action.type) {
//     case necessityConstants.CREATE_SUCCESS:
//       return {
//         createStatus: necessityStatus.SUCCESS,
//         necessities: data,
//       };
//     case necessityConstants.CREATE_FAILURE:
//       return {
//         ...state,
//         createStatus: necessityStatus.FAILURE,
//       }

//     case CREATE:
//       return {
//         input: "",
//         necessities: [...state.necessities, action.payload]
//       };

//     case REMOVE:
//       return {
//         ...state,
//         necessities: state.necessities.filter(necessity => necessity.id !== action.meta.id)
//       };

//     case TOGGLE:
//       return {
//         ...state,
//         necessities: state.necessities.map(necessity => {
//           if (necessity.id === action.meta.id) {
//             necessity.done = !necessity.done;
//           }
//           return necessity;
//         })
//       };

//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.meta.input
//       };
//     default:
//       return { ...state };
//   }
// }

// export default necessityReducer;


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



function necessityreducer (state = initialState, action: Action) {
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

export default necessityreducer;
