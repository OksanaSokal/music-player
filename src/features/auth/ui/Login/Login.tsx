import {useLoginMutation} from '@/features/auth/api/AuthApi.ts';
import {Path} from '@/common/routing';


export const Login = () => {

    const [login] = useLoginMutation()

    const loginHandler = () =>{

        // Создаем uri для перенаправления после авторизации
        const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect

        // Создаем url endpoint OAuth авторизации, добавляя callbackUrl как параметр запроса
        const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

        // Открываем всплывающее окно для OAuth авторизации
        window.open(url, 'oauthPopup', 'width=500, height=600')

        const receiveMessage = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return

            const {code} = event.data

            if(!code) return

            window.removeEventListener('message', receiveMessage)

            login({code, redirectUri, rememberMe: false})
        }
        // Подписываемся на сообщения из всплывающего окна
        window.addEventListener('message', receiveMessage)


    }
    return (
        <button type={'button'} onClick={loginHandler}>login</button>
    );
};

