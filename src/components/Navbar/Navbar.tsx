import { Link } from "react-router-dom"
import "./navbar.scss"
import { Context, FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextProps } from "../../context";
import axios from "axios";
import { AuthService } from "../../services";
import { User } from "../../dto";

export const Navbar = () => {
    const { token, updateToken } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [user, setUser] = useState<User|null>(null)
    const [loginForm, setLoginForm] = useState(false)

    const handleLoginForm = () => {
        setLoginForm(!loginForm)
    }

    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleConnection = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const connect = async () => {
            const data = await AuthService.login(login,password);
            if(data!==null){
                updateToken(data._id as string);
                setUser(data.user)
            }    
        }
        if(login !== "" && password !== "")connect()        
    }

    const handleLogout = () => {
        const disconnect = async () => {
            const response = await AuthService.logout(token)
            setUser(null)
            updateToken("")   
        }
        disconnect();
    }

    const handleLogin = (event:SyntheticEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value);
    } 

    const handlePassword = (event:SyntheticEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    return (
        <>
            <div className="navbar">
                <div className="title">
                    <Link to={"/"}><img src="/logo192.png"/></Link>
                    <Link to={"/"}><h1>Planode ZOO</h1></Link>
                </div>
                <div className="links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/animals"}>Animals</Link>
                    <Link to={"/enclosures"}>Enclosures</Link>
                    {user===null ?
                        <div onClick={handleLoginForm}>Login</div> :
                        <div>{user.login}<span onClick={handleLogout}>X</span></div>
                    }
                </div>
            </div>
            {user === null &&
                <div data-active={loginForm} className="login-form">
                    <form onSubmit={handleConnection}>
                        <input onChange={handleLogin} type="text" placeholder="login"/>
                        <input onChange={handlePassword} type="text" placeholder="password"/>
                        <input className="submit-btn" type="submit" value="Connect"/>
                    </form>
                </div>
            }
        </>
    )
}