import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {


    return (
        <section className="landing--page">
            <div className = 'hero-text--Container'>
                <h1 className='hero-text'>Note taking made easy</h1>
                <Link to='/notes'>
                    <button className='btn btn--animated btn--hero '>Note Now</button>
                </Link>
            </div>
            <img src='https://raw.githubusercontent.com/sanathkumar26700/noter/124836420132ebd0732b00a6a7eeb26840162cdc/src/Pages/Home/Asset/hero--image.svg' className='hero--img' alt='img'/>
        </section>
    );
};

export default Home;