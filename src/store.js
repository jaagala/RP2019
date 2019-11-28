import { createStore } from "redux";

const USER_LOADED = "USER_LOADED";
const initialState = {
    email: null,
    _id: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

const store = createStore(authReducer);
store.subscribe(() => console.log(store.getState()));



export default store;