import Authreducer from './auth-reducer'
import Expensereducer from './Expense-Reducer'
import Premiumreducer from './themeReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore( {
    reducer :{
        auth :Authreducer ,
        expense:Expensereducer ,
        premium:Premiumreducer
    }
})

export default store ;