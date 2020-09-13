import React from "react";
import Logo from "../assets/img/logo.svg";

export default class Navigation extends React.Component {
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

       <nav className="nav">
         <div className="nav-center nav-menu">
           <a className="nav-item">
             Home
           </a>
           <a className="nav-item">
             About
           </a>
           <a className="nav-item">
             Contact
           </a>
         </div>
       </nav>
        <section className="hero has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Online Youtube Downloader</h1>
              <h2 className="subtitle">
                Download Youtube Videos In Single Click.
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  }
}
