# Orbital_YPC
Orbital Project for Team YPC. A simple mobile fitness app.

### Start
1. npm install
2. Request the config.js file for firebase configuration
3. expo start

### Documentation
1. Always use npm (also called the Node Package Manager) when installing dependencies. I have tested it and using both `npm install` and `yarn install` and/or `expo install` at the same time can lead to disastrous results.

### Code standards
1. Always use functional components

### Troubleshooting
1. Make sure to import React from 'react' in every file

### React Native styling defaults
React Native has some default properties and values for styling, and it is important to understand these defaults:
1. Flexbox is the default in React Native, but we don’t have to opt in to it, meaning we don’t need to set `display: flex` in a style (https://blog.logrocket.com/using-flexbox-react-native/).


```
const styles = StyleSheet.create({
  card: {
    display: 'flex' // this is unnecessary
  }
});
```

### Future extensions
1. Deploy linters
2. Create CI/CD pipeline
3. Create a staging server to test app
4. Use testing frameworks
