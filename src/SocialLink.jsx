import PropTypes from 'prop-types';

function SocialLink({link}){
    return (
        <>
            <a className="social-link" href={link.href} target="_blank" rel="noreferrer">
                <i className={link.faClass}></i>
            </a>
        </>
    )
}

SocialLink.propTypes = {
    link: PropTypes.shape({
      href: PropTypes.string.isRequired,
      faClass: PropTypes.string.isRequired, 
    }).isRequired,
};

export default SocialLink;