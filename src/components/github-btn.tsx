import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

const Button = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin: 20px 0 0;
    padding: 12px 20px;
    font-weight: 600;
    border-radius: 50px;
    border: 0;
    color: #1d1d1d;
    background: #fff;
    cursor: pointer;
`;
const Logo = styled.img`
    height: 24px;
`;

export default function GithubBtn() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Continue with Github
        </Button>
    );
}
