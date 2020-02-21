import Constants from 'expo-constants';

const ENV = {
    dev: {
        apiUrl: 'https://staging.shopstop.xyz/'
    },
    prod: {
        apiUrl: 'production url here'
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev;
    } else {
        return ENV.prod;
    }
};

export default getEnvVars();
