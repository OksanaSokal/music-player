import type {
    CreatePlaylistArgs, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from '@/features/playlists/api/playlistsApi.types.ts';
import {baseApi} from '@/app/api/baseApi.ts';
import type {Images} from '@/common/types';


export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
                                 //1й -что возвращает нам бэк 2й параметр - это наши аргументы, что мы передаем
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) =>  ({ url: `playlists`, params }),
            providesTags: ['Playlists']
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => ({method: 'POST', url: 'playlists', body}),
            invalidatesTags: ['Playlists']
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({
                method: 'DELETE',
                url: `playlists/${playlistId}`,
            }),
            invalidatesTags: ['Playlists']
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => ({
                method: 'PUT',
                url: `playlists/${playlistId}`,
                body
            }),
            onQueryStarted: async ({playlistId, body}, {queryFulfilled, dispatch, getState})=> {

                const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

                const patchResults: any[] = []

                args.forEach(arg => {
                    patchResults.push(
                        dispatch(
                            playlistsApi.util.updateQueryData(
                                'fetchPlaylists',
                                {
                                    pageNumber: arg.pageNumber,
                                    pageSize: arg.pageSize,
                                    search: arg.search,
                                },
                                state => {
                                    const index = state.data.findIndex(playlist => playlist.id === playlistId)
                                    if (index !== -1) {
                                        state.data[index].attributes = { ...state.data[index].attributes, ...body }
                                    }
                                }
                            )
                        )
                    )
                })

            },
            invalidatesTags: ['Playlists']
        }),
        uploadPlaylistCover: build.mutation<Images, { playlistId: string, file: File }>({
            query: ({playlistId, file}) => {
                const formData = new FormData()
                formData.append('file', file)

                return ({method: 'POST', url: `playlists/${playlistId}/images/main`, body: formData})

            },
            invalidatesTags: ['Playlists']
        }),
        deletePlaylistCover: build.mutation<void, { playlistId: string }>({
            query: ({playlistId}) => ({method: 'DELETE', url: `playlists/${playlistId}/images/main`,}),
            invalidatesTags: ['Playlists']
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi