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
  },
})

export const { setUserDetails,setUserRole  } = userSlice.actions

export default userSlice.reducer