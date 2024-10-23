function SocialLink({link}){
    return (
        <>
            <a className="social-link" href={link.href} target="_blank" rel="noreferrer">
                <i className={link.faClass}></i>
            </a>
        </>
    )
}

export default SocialLink;