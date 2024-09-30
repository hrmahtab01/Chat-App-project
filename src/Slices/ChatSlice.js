import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value :null,
  
  
}

export const ChatlistSlice = createSlice({
  name: 'chatlist',
  initialState,
  reducers: {
   chatlistdatastore: (state , actions) => {
    
      state.value =actions.payload
    },
   
  },
})


export const {  chatlistdatastore} = ChatlistSlice.actions

export default ChatlistSlice.reducer