import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  
  
}

export const UserDataSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    UserDataStore: (state , actions) => {
    
      state.value = actions.payload
    },
   
  },
})


export const {  UserDataStore} = UserDataSlice.actions

export default UserDataSlice.reducer