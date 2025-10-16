import {baseApi} from '@/app/api/baseApi.ts';
import type {FetchTracksResponse} from '@/features/tracks/api/tracksApi.types.ts';
import {withZodCatch} from '@/common/utils';
import {fetchTracksResponseSchema} from '@/features/tracks/model/tracks.schemas.ts';

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: (lastPage )=>{
                    return lastPage.meta.nextCursor || null
                }
            },
            ...withZodCatch(fetchTracksResponseSchema),
            //pageParam - here it's cursor
            query: ({pageParam}) => {
                return {
                    url: 'playlists/tracks',
                    params: {cursor: pageParam,paginationType: 'cursor', pageSize: 5}
                }
            },
        }),
    }),
})
export const {useFetchTracksInfiniteQuery} = tracksApi