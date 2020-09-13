import React from "react";
import Logo from "../assets/img/logo.svg";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <a href="" target="_blank">
            Youtube Video Downloader
          </a>{" "}
          All Rights Reserved
          <br /> &copy; copyright 2020
        </div>
      </footer>
    );
  }
}
