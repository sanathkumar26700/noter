import './footer.css'

const Footer = ( ) => {
    return(
        <footer className="main--footer">
            <div className="footer__credits--container">
                <h3>made using {" "}
                    <a className="anchor-style--none " href="http://viewi.netlify.app ">
                        <span>View<span className="dot ">.</span>I
                        <img src="https://github.com/sanathkumar26700/moview__EcomStore--ui/blob/development/images/logo--eye.png?raw=true" alt="eye--logo " className="logo--img img-responsive"/>
                        </span>
                    </a>
                </h3>
                <h4><span>by</span><a className="anchor-style--none " href="https://sanathkumar-portfolio.netlify.app/">
                    Sanath Kumar GV
                </a></h4>
                <nav className="nav__container--nav-list">
                    <ul className="list-bulletless social-links">
                        <li><a href="https://twitter.com/sanathkumar267?s=08"><i className="sociallinks__icon-twitter fab fa-twitter "></i></a></li>
                        <li><a href="https://github.com/sanathkumar26700"><i className="sociallinks__icon-github fab fa-github"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/sanath-kumar-g-v-317206193@gmail.com"><i className="sociallinks__icon-linkedin fab fa-linkedin"></i></a></li>
                        <li><a href="mailto:sanathkumar26700"><i className="sociallinks__icon-mail fas fa-envelope"></i></a></li>
                    </ul>
                </nav>
            </div>
        </footer>)
}

export default Footer;