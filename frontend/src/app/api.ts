import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base for all API calls
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Replace with your backend URL
    // 1. Add this option to send cookies with every request
    credentials: 'include',

    // 2. Remove the prepareHeaders function. The browser manages the cookie.
    // prepareHeaders: (headers, { getState }) => { ... },
  }),
  endpoints: () => ({}),
});