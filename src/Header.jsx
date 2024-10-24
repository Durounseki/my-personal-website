import './Header.css'
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function Header(){
    const navLinks = [
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
        }
    ]
    const [activeTab, setActiveTab] = useState(0)
    const [bubbleStyle, setBubbleStyle] = useState({ 
        transform: 'translateX(0px)', 
        width: '0px' 
    });
    const bubbleRef = useRef(null);
    const tabsRef = useRef([]);


    const handleClick = (index) => {
        setActiveTab(index)
    }

    useEffect(() => {
        const bubble = bubbleRef.current;
        const tabs = tabsRef.current;
    
        if (bubble && tabs.length > activeTab) {
            const activeTabRect = tabs[activeTab].getBoundingClientRect();
            const bubbleRect = bubble.getBoundingClientRect();
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
            <header>
                <nav>
                    <ul>
                        {navLinks.map((link, index) => (
                            <li 
                                key={index}
                                className={`menu-tab ${index === activeTab ? 'active' : ''}`}
                                ref={el => tabsRef.current[index] = el}
                                onClick={() => handleClick(index)}
                            >
                                    <NavLink to={link.url}>{link.name}</NavLink>
                            </li>
                        ))}
                        <li
                            className="tab-bubble"
                            ref={bubbleRef}
                            style={bubbleStyle}
                        >
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;