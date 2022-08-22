// https://www.toptal.com/react/react-testing-library-tutorial
import { render, fireEvent, act } from "@testing-library/react-native";
import * as firebase from "../../firebase";

// Screens
import Login from "../../src/screens/auth/LoginPage";
import ResetPassword from '../../src/screens/auth/ResetPassword'
import SignUpPage from '../../src/screens/auth/SignUpPage'

it("Login Screen", () => {
    const { getAllByText, getByPlaceholderText } = render(<Login />);
  
    // Expect to have 2 strings == "Login" on the screen
    expect(getAllByText("Login").length).toBe(2);
    
    // Search for all elements with a placeholder attribute and find one that matches
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
});

it("Error when using empty credentials to log in", () => {
    const { getByRole, getByText } = render(<Login />);
    fireEvent.press(getByRole("button"));
  
    getByText("Please enter an email and password");
});