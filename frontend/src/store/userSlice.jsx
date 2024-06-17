import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user:null,
  role:null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
      // console.log("action", action.payload)
    },
    setUserRole:(state,action)=>{
      state.role=action.payload
    },
    clearUserData: (state) => {
      state.user = null;
      state.role = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails,setUserRole,clearUserData } = userSlice.actions

export default userSlice.reducer