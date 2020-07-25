import React, { useReducer, createContext, Dispatch, useContext, useRef } from 'react';

const initialNecessities = [
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
];


export interface INecessity {
  id: number;
  text: string;
  done: boolean;
};

type NecessityState = INecessity[];

const NecessityStateContext = createContext<NecessityState | undefined>(undefined);


type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

type NecessityDispatch = Dispatch<Action>;

const NecessityDispatchContext = createContext<NecessityDispatch | undefined>(
  undefined
);


//type NecessityNextId = INecessity[];

const NecessityNextIdContext = createContext();


function NecessityReducer(state: NecessityState, action: Action) {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(0, ...state.map(Necessity => Necessity.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false
      });
    case 'TOGGLE':
      return state.map(Necessity =>
        Necessity.id === action.id ? { ...Necessity, done: !Necessity.done } : Necessity
      );
    case 'REMOVE':
      return state.filter(Necessity => Necessity.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
}



export function NecessityProvider({ children } : { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(NecessityReducer, initialNecessities);
  const nextId = useRef(5);

  return (
    <NecessityStateContext.Provider value={state}>
      <NecessityDispatchContext.Provider value={dispatch}>
        <NecessityNextIdContext.Provider value={nextId}>
          {children}
        </NecessityNextIdContext.Provider>
      </NecessityDispatchContext.Provider>
    </NecessityStateContext.Provider>
  );
}

export function useNecessityState() {
  const context = useContext(NecessityStateContext);
  if (!context) {
    throw new Error('Cannot find NecessityProvider');
  }
  return context;
}

export function useNecessityDispatch() {
  const context = useContext(NecessityDispatchContext);
  if (!context) {
    throw new Error('Cannot find NecessityProvider');
  }
  return context;
}

export function useNecessityNextId() {
  const context = useContext(NecessityNextIdContext);
  if (!context) {
    throw new Error('Cannot find NecessityProvider');
  }
  return context;
}
