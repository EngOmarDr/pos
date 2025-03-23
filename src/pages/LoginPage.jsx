import { FaUser, FaLock ,FaUnlock } from 'react-icons/fa'
import loginImg from '../assets/syrien trading logo - 1 .jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Login } from '../services/AuthServices'

export default function HomePage(){
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    function handelShowPassword(){
        setShowPassword(prev=>!prev)
    }
    function testingLogin(){
        Login();
        navigate("/",{replace: true})
    }
    return (
        <div className='login-page'>
            <div className="Loign-container">
                <img src={loginImg} className='login-img'></img>
                <div className='login-info'>
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue managing sales efficiently.</p>
                    <form>
                        <div className='input-field'>
                            <label htmlFor='userName'>UserName</label>
                            <div className='input-container'>
                                <FaUser className="input-icon"/>
                                <input type='text' id='userName' placeholder='enter your user name' required/>
                            </div>
                        </div>

                        <div className='input-field'>
                            <label htmlFor='password'>Password</label>
                            <div className='input-container'>
                                {
                                showPassword 
                                ? <FaUnlock className="input-icon" onClick={()=>handelShowPassword()} /> 
                                :<FaLock className="input-icon" onClick={()=>handelShowPassword()}/> 
                                }
                                <input type={showPassword ? 'text' : 'password'} id='password' placeholder='enter your password' required/>
                            </div>
                        </div>
                        
                        <button onClick={()=>testingLogin()} className='login-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}