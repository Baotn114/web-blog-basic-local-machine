import React from 'react';
import { MDBFooter} from 'mdb-react-ui-kit';
const Footer = () => {
    return ( 
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted custom-Footer'>
            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='https://www.facebook.com/profile.php?id=100008694752347'>
                    Tommy Trịnh
                </a>
            </div>
    </MDBFooter>
    );
}
 
export default Footer;