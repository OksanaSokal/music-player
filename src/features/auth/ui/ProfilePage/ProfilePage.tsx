import {useGetMeQuery} from '@/features/auth/api/AuthApi.ts';

export const ProfilePage = () => {

    const {data} = useGetMeQuery()
    return (
        <div>
            <h1>{data?.login} page</h1>
        </div>
    )
}