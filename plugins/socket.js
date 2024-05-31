import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
export default async () => {
    window.Pusher = Pusher
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'local',
        // wsHost: 'api.fifa.loc',
        wsHost: 'api.whatsgaming.net',
        wsPort: 2053,
        wssPort: 2053,
        forceTLS: false,
        disableStats: true,
        cluster: 'mt1',
        enabledTransports: ['ws', 'wss']
    });
};