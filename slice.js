import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  address: JSON.parse(localStorage.getItem("address")) || [],
  user: JSON.parse(localStorage.getItem("user")) || [],
  OTP: []
}


export const counterSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {

    addadress: (state, action) => {
      state.address.push(action.payload)
      let data = JSON.stringify(current(state.address))
      localStorage.setItem("address", data)

    },
    addotp: (state, action) => {
      state.OTP.push(action.payload)
    },
  },

})


export const { addadress, addotp } = counterSlice.actions

export default counterSlice.reducer




