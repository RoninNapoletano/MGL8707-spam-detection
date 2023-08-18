require("dotenv/config");

export default {
  expo: {
    name: "front-app",
    slug: "front-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      APIKEY: process.env.APIKEY,
      AUTHDOMAIN: process.env.AUTHDOMAIN,
      PROJECTID: process.env.PROJECTID,
      STORAGEBUCKET: process.env.STORAGEBUCKET,
      MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
      APPID: process.env.APPID,
      MEASUREMENTID: process.env.MEASUREMENTID,
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
