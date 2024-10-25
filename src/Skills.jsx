import './Skills.css';

function Skills(){
    const techStack = [
        {
            name: "html",
            faClass: "fa-brands fa-html5"
        },
        {
            name: "css",
            faClass: "fa-brands fa-css3-alt"
        },
        {
            name: "javascript",
            faClass: "fa-brands fa-js"
        },
        {
            name: "react",
            faClass: "fa-brands fa-react"
        },
        {
            name: "node",
            faClass: "fa-brands fa-node"
        },
    ]
    return(

        <>
            <section className="skills">
                <ul>
                    {techStack.map((icon, index) => (
                        <li className="skill">
                            <i
                                key={index}
                                className={icon.faClass}
                            >
                            </i>
                            <p>{icon.name}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Skills;