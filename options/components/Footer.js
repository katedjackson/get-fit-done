import React from 'react';

function Footer (props) {
  return (
    <div className="footer">
      <div>
      <hr/>
      <a href="mailto:get-fit-done@googlegroups.com"><img src="/images/email.png"/></a>
      <a href="https://twitter.com/Get_Fit_Done"><img src="/images/twitter.png"/></a>
      {props.accessToken ? <a className="logout" onClick={props.signout}><img src="/images/exit.png"/></a> : <a className="login" onClick={props.login}><img src="/images/login.png"/></a>}
      </div>
    </div>
  );
}

export default Footer;
