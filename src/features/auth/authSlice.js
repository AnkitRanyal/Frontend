import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  ConfirmOtp,
  resetPasswordRequest,
  Forgetpassword,
  resetPassword,
} from "./authApi";
import { updateUser } from '../user/userApi';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  checkInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  OTP: null,
  userChecked: false,
  userlogin: false,
  mailSent: false,
  passwordReset: null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(

  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async (data, { rejectWithValue }) => {
  try {
    const response = await checkAuth(data);
    return response.data;
  } catch (error) {
  } return rejectWithValue(error);
});
export const forgrtPasswordRequestAsync = createAsyncThunk(
  'user/Forgetpassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await Forgetpassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);
export const ConfirmOtpRequestAsync = createAsyncThunk(
  'user/ConfirmOtp',
  async (otp, { rejectWithValue }) => {
    try {
      const response = await ConfirmOtp(otp);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);

    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userChecked: (state, action) => {

      state.userChecked = action.payload
    },
    userlogin: (state, action) => {

      state.userlogin = action.payload
    },
    mailSent: (state, action) => {
      state.mailSent = action.payload
    },
    passwordReset: (state, action) => {
      state.passwordReset = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(ConfirmOtpRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ConfirmOtpRequestAsync.fulfilled, (state, action) => {

        state.status = 'idle';
        state.OTP = action.payload;
        state.userChecked = true
      })
      .addCase(ConfirmOtpRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(forgrtPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgrtPasswordRequestAsync.fulfilled, (state, action) => {

        state.status = 'idle';
        state.OTP = action.payload;
        state.userChecked = true
      })
      .addCase(forgrtPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userlogin = true
        const userlogin = JSON.stringify(state.userlogin)
        localStorage.setItem("userlogin", userlogin)
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.userlogin = false
        localStorage.removeItem("userlogin")
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {

        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.checkInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectOtpStatus = (state) => state.auth.OTP;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectUserLogin = (state) => state.auth.userlogin;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export const { userChecked, userlogin, mailSent, passwordReset, } = authSlice.actions;

export default authSlice.reducer;