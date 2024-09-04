import {
    AuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin: 20px 0 0;
    font-weight: 600;
    border-radius: 50px;
    border: 0;
    color: #1d1d1d;
    background: #fff;
    cursor: pointer;

    &.github-btn {
        padding: 12px 20px;
    }
    &.google-btn {
        height: 48px;
        img {
            height: 100%;
        }
    }
`;
const Logo = styled.img`
    height: 24px;
`;

export default function GithubBtn() {
    const navigate = useNavigate();
    const onClick = async (provider: AuthProvider) => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Button
                className="github-btn"
                onClick={() => onClick(new GithubAuthProvider())}
            >
                <Logo src="/github-logo.svg" />
                Continue with Github
            </Button>
            <Button
                className="google-btn"
                onClick={() => onClick(new GoogleAuthProvider())}
            >
                <Logo src="/google-logo.svg" />
            </Button>
        </>
    );
}
