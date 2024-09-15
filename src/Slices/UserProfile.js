import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value :null,
  
  
}

export const UserprofileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    userprofilestore: (state , actions) => {
    
      state.value =actions.payload
    },
   
  },
})


export const {  userprofilestore} = UserprofileSlice.actions

export default UserprofileSlice.reducer