export const initialState = {
    stats: null
};

export const actionType = {
    set_Stats: "set_Stats"
}

const Reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionType.set_Stats:
            return {
                ...state,
                stats: action.stats
            }
        default:
            return state;
    }
}

export default Reducer;
