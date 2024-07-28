import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./features/bookingSlice";


const store = configureStore({
    reducer: {
        booking: bookingReducer,
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;