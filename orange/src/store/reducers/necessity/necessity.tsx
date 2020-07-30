import { necessityConstants } from '../../actions/actionTypes';
import { necessityStatus } from '../../../constants/constants';


type Action = { 
  actiontype: string; 
  actiontarget: any;
}

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
    const data = action.actiontarget;
    switch (action.actiontype) {

		// 생필품 추가
        case necessityConstants.CREATE_SUCCESS:
            return {
                createStatus: necessityStatus.SUCCESS,
                necessities: data,
            };
        case necessityConstants.CREATE_FAILURE:
            return {
                ...state,
                createStatus: necessityStatus.FAILURE,
            };
		
		// 생필품 구매여부 체크
        case necessityConstants.TOGGLE_SUCCESS:
          	return {
				  toggleStatue: necessityStatus.SUCCESS,
				  necessities: data,
			};
		case necessityConstants.TOGGLE_FAILURE:
			return {
				...state,
				toggleStatue: necessityStatus.FAILURE,
			};

        // case 'REMOVE':
        //     return state.filter(Necessity => Necessity.id !== action.id);
		
		default:
            return { ...state }
    }
}

export default necessityreducer;
