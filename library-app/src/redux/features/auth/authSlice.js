import {createSlice} from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));
const initialState = 
{
    isSignedin: false,
    name: name ? name : "",
    user:
    {
        name: "",
        email: "",
        photo: ""
    },
    userID: ""
};

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: 
        {
            setLogin(state, action)
            {
                state.isSignedin = action.payload;
            },
            setName(state, action)
            {
                localStorage.setItem("name", JSON.stringify(action.payload));
                state.name = action.payload;
            },
            setUser(state, action)
            {
                const profile = action.payload;
                state.user.name = profile.name;
                state.user.email = profile.email;
                state.user.photo = profile.photo;
            }
        }
    }
);

export const {setLogin, setName, setUser} = authSlice.actions;
export const selectIsSignedin = (state) => state.auth.isSignedin;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;