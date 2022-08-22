// https://www.toptal.com/react/react-testing-library-tutorial
import { render, fireEvent, act, waitFor, screen } from "@testing-library/react-native";
import * as firebase from "../../firebase";

// Screens
import Login from "../../src/screens/auth/LoginPage";
import ResetPassword from '../../src/screens/auth/ResetPassword'
import SignUpPage from '../../src/screens/auth/SignUpPage'

const flushMicrotasksQueue = () => new Promise((resolve) => setImmediate(resolve));

// it("Wrong password or username", async () => {
//     const { getByText, getByPlaceholderText, getAllByRole, getByRole } = render(<Login />);

//     // Search for all elements with a placeholder attribute and find one that matches
//     await waitFor(() => {
//         fireEvent.changeText(getByPlaceholderText("Email"), "fakeemail@gmail.com")
//         fireEvent.changeText(getByPlaceholderText("Password"), "nosuchpassword")
        
//     })
//     await waitFor(() => {
//         // screen.debug()
//         fireEvent.press(getByRole("button"));
//     })
//     await waitFor(() => {
//         // screen.debug()
//         expect(getByText("invalid-email")).toBeTruthy();
//     })

// });
