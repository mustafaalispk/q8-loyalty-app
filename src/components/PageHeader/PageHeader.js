import React from 'react';
import './PageHeader.css';
import svg from '../../assets/images/okq8.svg';

const PageHeader = () => {
    return (
        <header className="page-header__wrapper">
            <div className="page-header__header">
                <div className="page-header__header__logo">
                    <a href="/">
                        <img src={svg} alt="Logo" />
                    </a>
                </div>
                <div className="page-header__header__hamburger">
                    <a href="#" className="page-header__icon">
                        <svg width="50"
                            height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="page-header__name">
                <h2>Hej Julia</h2>
            </div>
        </header>
    );
}

export default PageHeader;