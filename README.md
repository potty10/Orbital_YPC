# Macro

Orbital Project for Team YPC. A simple mobile fitness app.

## Demonstration
Expo is an open-source platform to rapidly develop Android and IOS apps with just one codebase, written in React Native. Moreoever, the app can be deployed on a permanent URL to demonstrate the app, without the hassle of going through the App store. 

Link to QR code to try the app (Currently only available on Android): https://exp.host/@orbitalypc/Macro?release-channel=default

## Installation
1. `npm install`
2. Request the `config.js` file for firebase configuration
3. `expo start`

## Deployment
1. Create an Expo account
2. `expo login`
3. `expo publish`
## Troubleshooting

- Make sure to import React from 'react' in every file
- Always use `expo install` when installing dependencies. I have tested it and using both `npm install` and `yarn install` and/or `expo install` in the same project can lead to disastrous results.
- React Native has some default properties and values for styling, and it is important to understand these defaults:

  - Flexbox is the default in React Native, meaning we don’t need to set `display: flex` in a style (https://blog.logrocket.com/using-flexbox-react-native/).

```
const styles = StyleSheet.create({
  card: {
    display: 'flex' // this is unnecessary
  }
});
```

## Jest testing

- https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths
- https://stackoverflow.com/questions/72506992/what-is-the-real-meaning-of-transformignorepatterns-in-jest-configuration

## Notes

- There is no longer any need to have pre-commit hooks or linters since this is still a small project at this stage.

---

# Documentation

## 1. About Expo
We are currently using Expo SDK version 45.0. The version number can be found in `package.json`. According to [Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), "Expo maintains ~6 months of backward compatibility. Once an SDK version has been deprecated, you will no longer be able to use the Expo Go app.". This means that certain Expo features can be outdated quickly.
## 2. Database
There are several online database solutions such as Realm, WatermelonDB, PouchDB and Firebase. We chose to use Firebase because it has a great documentation.

## 3. Configuration file
We wanted a configuration solution for ease of switching between different modes. For example, instead of making API calls to Firebase, it is much easier to debug by mocking a API call. `react-native-config` seems to be the most stable solution for React Native apps, but it did not work for me. 

The solution that worked for me is to use Expo's `app.json`. The key-value pair was stored in `Constants.manifest.extra`, rather than in `Constants.expoConfig` as the [docs](https://docs.expo.dev/workflow/configuration/) has suggested, possibly because my version of Expo SDK was going to be outdated soon.

## 4. Design inspiration
I took inspiration from various sites
- https://www.designrush.com/best-designs/apps
- https://dribbble.com/tags/best_app_design
- https://www.bluefountainmedia.com/blog/best-mobile-app-designs-our-10-favorite-user-interfaces
- https://99designs.com.sg/blog/trends/app-design-trends/
- https://www.ideamotive.co/blog/dazzling-examples-of-mobile-app-ui-design

An awesome theme color generator: https://coolors.co/

## 5. Version control
### 5.1 Good Git Commit messages
This [website](https://cbea.ms/git-commit/) explains the basics of writing good Git commit messages.

### 5.2 Staging and production
A staging environment "is a nearly exact replica of a production environment for software testing. Staging environments are made to test codes, builds, and updates to ensure quality under a production-like environment before application deployment". Expo allows us to deploy the app though a different channel. The app will then be available through a different link.
```
$ expo publish --non-interactive --release-channel staging
```

### 5.3 Continuous deployment
We used a [GitHub Action](https://github.com/expo/expo-github-action) to publish the Macro to a URL.
