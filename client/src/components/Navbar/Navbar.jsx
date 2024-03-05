import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";


const Navbar = () => {
    const {logout } = useLogout();
    const {  refresh ,authUser , setBalance } = useAuthContext();
    const [data , setData] = useState([]);
    useEffect(() => {
        fetch('/api/users/userInfo')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.user);
                setData(data.user);
                setBalance(data.user.balance);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [refresh,  setBalance]);
    return (
        <div className="sticky top-0 z-10 shadow-black shadow-sm">
            <div className="navbar bg-base-100 px-10 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Unofficial</a>
                </div>
               
                <div className="navbar-end">
                    <h1 className="mr-10 bg-teal-600 px-4 py-2 rounded-lg">Balance: {data?.balance}</h1>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={authUser?.profilePic} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/profile" className="p-2">Profile</Link>
                            </li>
                            <li><a onClick={()=> logout()}>Logout</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Navbar;