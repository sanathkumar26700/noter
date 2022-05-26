import React from 'react';

const DarkModeButton = () => {
    let darkMode = localStorage.getItem('darkMode');

    const enableDarkMode = () => {
        document.body.classList.add('dark--mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    const disableDarkMode = () => {
        document.body.classList.remove('dark--mode');
        localStorage.setItem('darkMode', null);
    }

    if (darkMode === 'enabled') {
        enableDarkMode();
    }

    const darkModeHandler = () => {
        darkMode = localStorage.getItem('darkMode');
        if (darkMode !== 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    return(<i onClick={darkModeHandler} className="fas fa-adjust" id="mode--btn"></i>)
}

export default DarkModeButton