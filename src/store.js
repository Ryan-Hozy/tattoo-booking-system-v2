import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./features/bookingSlice";
import authReducer from "./features/authSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingReducer,
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;