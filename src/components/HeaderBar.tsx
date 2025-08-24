import logo from '../assets/icon.svg';


function HeaderBar() {
    return (
        <>
            <img src={logo} alt=" " className='header-logo'/>
            <p className="header-title">Privacy Toolkit</p>
        </>
    );
}

export default HeaderBar;