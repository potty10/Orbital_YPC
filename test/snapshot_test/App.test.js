import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

// Screens
import LoginPage from '../../src/screens/auth/LoginPage'
import ResetPassword from '../../src/screens/auth/ResetPassword'
import SignUpPage from '../../src/screens/auth/SignUpPage'

// https://www.youtube.com/watch?v=VuNPrFH9H0E
// To update all snapshots, run npm test -- -u
// To udpate specific snapshots, run npm test -- path/to/file -u

it('Initial screen', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Login screen', () => {
    const tree = renderer.create(<LoginPage />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('ResetPassword screen', () => {
    const tree = renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('SignUp screen', () => {
    const tree = renderer.create(<SignUpPage />).toJSON();
    expect(tree).toMatchSnapshot();
});

// it('Initial screen has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
// });