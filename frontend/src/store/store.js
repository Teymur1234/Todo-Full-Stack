import {configureStore} from '@reduxjs/toolkit'

import todoReducer from '../slices/todo.slice.js'
import userReducer from '../slices/user.slice.js'

const store = configureStore({
    reducer:{
        todos:todoReducer,
        user:userReducer,
    }
});

export default store