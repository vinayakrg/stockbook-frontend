import {createContext, useState, useEffect} from 'react';
import http from '../pages/services/httpService';
const UserContext = createContext();

const UserProvider = (props) =>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState();
     useEffect(() => {
       if(token){
            setUser({name:"july"});
       }
     }, [])

     const login = async (form)=>{
        try{
            const {data} = await http.post(http.apiEndPoint+"auth/login",form);
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
        }catch(error){
            console.log("error caught in register method");
            throw error;
        }
     }

     const register = async (form)=>{
        try{
            const {data} = await http.post(http.apiEndPoint+"auth/register",form);
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
        }catch(error){
            console.log("error caught in register method");
            throw error;
        }
     }

     const logout = ()=>{

        console.log('Logout successful');
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        
            
     }

     const getNotes = async(symbol)=>{
        try{
            const{data} = await http.get(http.apiEndPoint+"notes/"+symbol,{headers :{"authorization":"Bearer "+token}});
            return data;
        }catch(error){
            if(error.response.status === 401){
                logout();
            }
            console.log(error);
        }
        
     }

     const updateNotes = async(notes)=>{
        try{
            const{data} = await http.patch(http.apiEndPoint+"notes/"+notes._id,notes,{headers :{"authorization":"Bearer "+token}});
            return data;
        }catch(error){
            if(error.response.status === 401){
                logout();
            }
            console.log(error);
        }
        
     }
     

    

    return(
        <UserContext.Provider value={{token,user,login, register, logout, getNotes, updateNotes}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};