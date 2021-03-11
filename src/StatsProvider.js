import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const StatsProvider = ({Reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(Reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
