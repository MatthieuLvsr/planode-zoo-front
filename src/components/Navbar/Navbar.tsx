import { Link } from "react-router-dom"
import "./navbar.scss"
import { Context, FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextProps } from "../../context";
import Cookies from "js-cookie";
import { AuthService } from "../../services";
import { User } from "../../dto";

export const Navbar = () => {
    const { token, updateToken } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);
    const [user, setUser] = useState<User|null>(null)
    const [loginForm, setLoginForm] = useState(false)
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    useEffect(() => {
        // Récupérer l'ID de session depuis le cookie
        const sessionId = Cookies.get('token');
        if (sessionId) {
          // L'ID de session existe, vous pouvez utiliser cette valeur pour effectuer des opérations spécifiques à l'utilisateur.
          updateToken(sessionId)
        //   console.log(token);          
        }
      }, []);

    const handleLoginForm = () => {
        setLoginForm(!loginForm)
    }


    const handleConnection = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const connect = async () => {
            const data = await AuthService.login(login,password);
            if(data!==null){
                updateToken(data._id as string);
                Cookies.set('token',data._id as string,{expires:30})
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
            Cookies.remove("token")   
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
                        <div>{user.login}<span onClick={handleLogout}>❌</span></div>
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