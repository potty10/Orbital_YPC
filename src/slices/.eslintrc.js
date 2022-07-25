module.exports = {
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }], // Redux slices allow for mutation
  },
};
