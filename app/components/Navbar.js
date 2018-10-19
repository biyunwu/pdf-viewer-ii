import React from 'react';

export default function Navbar (props) {
    const {isSidebarOpen, chapters, updateSidebarStatus, handleChapterChange} = props
    // Refer to Hamburgers library: https://github.com/jonsuh/hamburgers
    const menuBaseClassName = "hamburger hamburger--collapse"
    const menuClassName = isSidebarOpen ? menuBaseClassName.concat(" is-active") : menuBaseClassName
    // const navStyle = isSidebarOpen? {height: "100vh"} : {}
    const listStyle = isSidebarOpen? {} : {position: "fixed", top: "-500px"}
    // document.getElementsByTagName("html")[0].style.backgroundColor = isSidebarOpen ? 'rgb(236, 133, 19)' : ''
    return (
        <nav>
            <button id='burger' className={menuClassName} type="button"
                style={{position: "fixed"}}
                aria-label="Menu" aria-controls="sidebar"
                onClick={updateSidebarStatus}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <ul style={listStyle} id="nav-list">
                {chapters.map((chapter, idx) => 
                    <li 
                        key={chapter}
                        onClick={handleChapterChange.bind(null, idx)}
                    >
                        {chapter}
                    </li>
                )}
            </ul>
        </nav>
    )
}