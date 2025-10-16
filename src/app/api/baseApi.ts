import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from '@/app/api/baseQueryWithReauth.ts';


export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Playlists', 'Auth'],
    keepUnusedDataFor: 5,
    baseQuery: baseQueryWithReauth,
    // refetchOnFocus: true,
    endpoints: () => ({}),
})