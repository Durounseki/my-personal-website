import './Header.css'
import { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Header(){
    const { isAuthenticated, logout } = useAuth();
    const navLinks = useMemo(() => ([
        {
            name: "E L",
            url: "/",
        },
        {
            name: "Research",
            url: "/research",
            faClass: "fa-solid fa-book"
        },
        {
            name: "Blog",
            url: "/blog",
            faClass: "fa-solid fa-blog"
        },
        {
            name: "About",
            url: "/about",
            faClass: "fa-solid fa-circle-info"
        },
        {
            name: isAuthenticated ? "Profile" : "Login",
            url: "/users",
            faClass: isAuthenticated ? "fa-solid fa-user" : "fa-solid fa-right-to-bracket"
        }
    ]),[isAuthenticated]);
    const [isMobile, setIsMobile] = useState();
    const [activeTab, setActiveTab] = useState(0)
    const [bubbleStyle, setBubbleStyle] = useState({ 
        transform: 'translateX(0px)', 
        width: '0px' 
    });
    const bubbleRef = useRef(null);
    const tabsRef = useRef([]);
    const accountRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (index,url) => {
        if(url === "/users" && isAuthenticated){
            accountRef.current.classList.toggle('show');
        }else{
            setActiveTab(index);
            if(accountRef.current.classList.contains('show')){
                accountRef.current.classList.remove('show');
            }
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        }
        window.addEventListener('resize',handleResize);
        handleResize();
        return () => window.removeEventListener('resize',handleResize);
    },[])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                accountRef.current.classList.remove('show');
            }
        };

        if (isAuthenticated) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAuthenticated]);

    const handleLogout = async () =>{
        await logout();
        accountRef.current.classList.remove('show');
        console.log("logout");
    }

    useEffect(() => {
        const path = location.pathname.split("/")[1] || "/";
        const activeIndex = navLinks.findIndex(link => link.url === `/${path}`);
        setActiveTab(activeIndex !== -1 ? activeIndex : 0);
    }, [location.pathname,navLinks]);

    useEffect(() => {
        const bubble = bubbleRef.current;
        const tabs = tabsRef.current;
    
        if (bubble && tabs.length > activeTab) {
            const activeTabRect = tabs[activeTab].getBoundingClientRect();
            const offset = tabs[0].getBoundingClientRect().left;
    
            setBubbleStyle({
                transform: `translateX(${activeTabRect.left - offset}px)`,
                width: `${activeTabRect.width}px`,
                height: `${activeTabRect.height}px`
            });
        }

    }, [activeTab]);

    return (
        <>
            <header className='menu'>
                <nav>
                    <ul>
                        {navLinks.map((link, index) => (
                                <li 
                                    key={index}
                                    className={`menu-tab ${index === activeTab ? 'active' : ''}`}
                                    ref={el => tabsRef.current[index] = el}
                                    onClick={() => handleClick(index,link.url) }
                                    >
                                    {(isAuthenticated && link.url === "/users") ? isMobile && link.faClass ? <i className={link.faClass}></i> : <span>{link.name}</span> : isMobile && link.faClass ? <NavLink to={link.url}><i className={link.faClass}></i></NavLink> : <NavLink to={link.url}>{link.name}</NavLink>}
                                </li>
                        ))}
                        <li
                            className="tab-bubble"
                            ref={bubbleRef}
                            style={bubbleStyle}
                        >
                        </li>
                        <div className="account" ref={el => accountRef.current = el}>
                            <ul>
                                <li onClick={() => {
                                    handleClick(navLinks.length-1)
                                    navigate('/users/profile')
                                }
                                }>
                                    Settings
                                </li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </ul>
                    
                </nav>
            </header>
        </>
    )
}

export default Header;