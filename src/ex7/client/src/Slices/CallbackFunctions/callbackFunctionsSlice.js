import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorCallbackFunction : () => {},
    cleanSearchInput : () => {}
}
export const callbackFunctionsSlice = createSlice({
  name: 'callbackFunctions',
  initialState,
  reducers: {
    errorCallbackFunction: (state, action) => {
      state.errorCallbackFunction = action.payload;
    }
  }
})

export const { errorCallbackFunction } = callbackFunctionsSlice.actions

export default callbackFunctionsSlice.reducer