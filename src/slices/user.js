import{createSlice}from '@reduxjs/toolkit';


 export const initialState= {
      loading: false,
      hasErrors: false,
      profile: [],
      repo:[]
    }

  
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      getRepo:(state, action)=>{
          state.repo= action.payload
      },
      getUser: state => {
        state.loading = true
      },
      getUserSuccess: (state, { payload }) => {
        state.profile = payload
        state.loading = false
        state.hasErrors = false
      },
      getUserFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
    },
  })
  

  //actions
  export const { setKey, getRepo, getUser, getUserSuccess, getUserFailure } = profileSlice.actions

  export const userSelector = state => state.profile

  // The reducer
  export default profileSlice.reducer

  export function fetchProfile(arg) {
    return async dispatch => {
      dispatch(getUser())
  
      try {
        const response = await fetch(`https://api.github.com/user/${arg}`)
        const data = await response.json()
        dispatch(getUserSuccess(data))
      } catch (error) {
        dispatch(getUserFailure())
      }
    }
  }

  export function fetchRepo(arg) {
    return async dispatch => {
  
      try {
        const response = await fetch(`https://api.github.com/users/${arg}/repos`)
        const data = await response.json()
        dispatch(getRepo(data.slice(0,20)))
      } catch (error) {
        console.log(error)
      }
    }
  }