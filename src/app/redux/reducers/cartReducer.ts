interface cartState {
    isShowCart: boolean;
}

const initState: cartState = {
    isShowCart: false
};

type Action = { type: 'SHOW_CART'; payload: boolean };

const cartReducer = (action: Action, state: cartState = initState) => {
    switch (action.type) {
        case 'SHOW_CART': {
            return {
                ...state,
                state: action.payload
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
