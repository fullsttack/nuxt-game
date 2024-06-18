```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
node .output/server/index.mjs
```

## Production

Build the application for production:

//flush - for clear logs
```bash
npm run build
pm2 restart wg

pm2 flush

```



use translates
templates - $t('account.balance.auction')
setup - 
    import {useI18n} from "vue-i18n";  
    const i18n = useI18n();
    i18n.t('account.balance.auction')


##PM2
https://github.com/keymetrics/pm2-logrotate#configure - rotate logs

##Add production env
mcedit ~/.bashrc
export NODE_ENV=production
source ~/.bashrc
echo $NODE_ENV