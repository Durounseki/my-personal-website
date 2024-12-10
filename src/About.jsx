import headShot from './public/headshot.jpg';
import './About.css'
function About(){
    return(
        <>
        <h1 className='about-title'>EL Christian</h1>
        <section className='about-content'>
            <img src={headShot} alt="EL"/>
            <div className='about-text'>
                <p>
                    I&apos;m Christian, but not christian, and I am a Doctor, not the kind that helps people though... (<cite>- Randy Pausch&apos;s mom</cite>).
                </p>
                <p>
                    Currently a fullstack developer. When I am not coding, you can find me at the kitchen experimenting
                    with recipes for my instagram <a href="https://www.instagram.com/fancy_a_sandwich?igsh=amplamEwMnVnd2lw&utm_source=qr" rel="noopener noreferrer" target="_blank">@fancy_a_sandwich</a>.
                </p>
            </div>
        </section>
        </>
    )
}

export default About;