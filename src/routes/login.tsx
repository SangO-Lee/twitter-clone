import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import GithubBtn from "../components/github-btn";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const errors = {
        "auth/email-already-in-use": "이미 사용중인 이메일 주소 입니다.",
        "auth/weak-password": "비밀번호는 6자리 이상 입력해야 합니다.",
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;
        try {
            //create an account
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            // console.log(name, email, password);
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>Log into 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    name="email"
                    value={email}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    onChange={onChange}
                    name="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input
                    name="submit"
                    value={isLoading ? "Loading..." : "Login"}
                    type="submit"
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account?{" "}
                <Link to="/create-account">Create One</Link>
            </Switcher>
            <GithubBtn />
        </Wrapper>
    );
}
