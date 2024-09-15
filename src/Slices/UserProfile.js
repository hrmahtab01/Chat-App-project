import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value :null,
  
  
}

export const UserprofileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    userprofile: (state , actions) => {
    
      state.value =actions.payload
    },
   
  },
})


export const {  userprofile} = UserprofileSlice.actions

export default UserprofileSlice.reducer