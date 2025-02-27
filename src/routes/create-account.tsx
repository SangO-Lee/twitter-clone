import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
} from "../components/auth-components";
import GithubBtn from "../components/github-btn";

export default function CreateAcount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
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
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            //create an account
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(credentials.user);
            //set the name of the user
            await updateProfile(credentials.user, {
                displayName: name,
            });
            //redirect to the home page.
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
            <Title>Join into 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    name="name"
                    value={name}
                    placeholder="Name"
                    type="text"
                    required
                />
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
                    value={isLoading ? "Loading..." : "Create Account"}
                    type="submit"
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? <Link to="/login">Login</Link>
            </Switcher>
            <GithubBtn />
        </Wrapper>
    );
}
