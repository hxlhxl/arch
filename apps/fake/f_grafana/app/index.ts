import app from './app';

require('./style/theme/app.dark.scss');

if (module.hot) {
    module.hot.accept((err) => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}

app.init();
