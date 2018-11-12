import React from 'react'
import Footer from './Footer'

export default function Navbar (props) {
    const {isSidebarOpen, title, chapters, updateSidebarStatus, handleChapterChange} = props
    // Refer to Hamburgers library: https://github.com/jonsuh/hamburgers
    const menuBaseClassName = "hamburger hamburger--collapse"
    const menuClassName = isSidebarOpen ? menuBaseClassName.concat(" is-active") : menuBaseClassName
    const navOpenStyle = {position: "fixed", overflowY: "auto"}
    const navStyle = isSidebarOpen? navOpenStyle: {position: "fixed", top: "-1000px"}
    const burgerIconStyle = {position: isSidebarOpen? "absolute": "fixed", top: "0", left: "0", zIndex: "999"}

    return (
        <nav style={navStyle}>
            <button id='burger' className={menuClassName} type="button"
                style={burgerIconStyle}
                aria-label="Menu" aria-controls="sidebar"
                onClick={updateSidebarStatus}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <a href="https://taojiangscholar.com" target="_blank" rel="noopener noreferrer">
                <img
                    src='https://taojiangscholar.com/static/media/logo.5fef45d2.png'
                    alt='The logo of the website'
                    style={{height: "40px", margin:'20px auto'}}
                />
            </a>
            <h2 style={{marginTop: "0", padding: "0 5%"}}>{title}</h2>
            <ul id="nav-list">
                {chapters.map((chapter, idx) => 
                    <li
                        key={chapter}
                        onClick={e => {handleChapterChange.call(null, idx); updateSidebarStatus()}}
                    >
                        {chapter}
                    </li>
                )}
            </ul>
            <Footer/>
        </nav>
    )
}