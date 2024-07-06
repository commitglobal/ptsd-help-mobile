const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.sebastian.yabiku.ptsd.dev';
  }

  if (IS_PREVIEW) {
    return 'com.sebastian.yabiku.ptsd.preview';
  }

  return 'com.sebastian.yabiku.ptsd';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'PTSD (Dev)';
  }

  if (IS_PREVIEW) {
    return 'PTSD (Preview)';
  }

  return 'PTSD: Emoji Stickers';
};

export default {
  "expo": {
    name: getAppName(),
    "slug": "ptsd",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      bundleIdentifier: getUniqueIdentifier(),
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      package: getUniqueIdentifier(),
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "4880085f-49e5-43b3-a41d-ba104a22c3d2"
      }
    }
  }
}
