import { api } from '../../../app/api';
import { setCredentials } from '../stores/authSlice'; // Import the action

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login', // Adjust the URL to match your backend
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch the action to update the state
          dispatch(setCredentials({ user: data.user })); // Adjust 'data.user' if your response is different
        } catch (err) {
          // Handle errors here (e.g., show a notification)
          console.error('Login failed', err);
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register', // Adjust the URL to match your backend
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch the action to update the state
          dispatch(setCredentials({ user: data.user })); // Adjust 'data.user' if your response is different
        } catch (err) {
          // Handle errors here (e.g., show a notification)
          console.error('Registration failed', err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout', // Adjust the URL to match your backend
        method: 'POST', // Or DELETE, depending on your backend
      }),
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Dispatch the action to clear the state
          dispatch({ type: 'auth/logOut' }); // Dispatch the direct action
        } catch (err) {
          // Handle errors here (e.g., show a notification)
          console.error('Logout failed', err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;