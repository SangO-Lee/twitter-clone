import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/create-account",
        element: <CreateAccount />,
    },
]);
const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
       box-sizing:border-box;
    }
    body{
        background-color:black;
        color:#fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const init = async () => {
        //wait for firebase
        await auth.authStateReady();
        setIsLoading(false);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <Wrapper>
            <GlobalStyle />
            {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </Wrapper>
    );
}

export default App;
