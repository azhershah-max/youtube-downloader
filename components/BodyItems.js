import React from "react";
import api from "../utils/api";
import { itags } from "../utils/constants";

export default class BodyItems extends React.Component {
  state = {
    url: "",
    isFetching: false,
    vData: null,
    info: null,
  };

  secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  handleFetch = async () => {
    this.setState({ isFetching: true, info: null });

    const { url } = this.state;
    const video = await api.get(`/info?url=${url}`);
    const { data } = video;
    const { info } = data;
    const {
      description,
      title,
      length_seconds,
      related_videos,
      video_id,
      video_url,
      formats,
    } = info;
    let vFormats = [];
    formats.map((format) => {
      const { itag, url, contentLength } = format;
      const cInfo = itags[itag];
      const size = (contentLength && this.bytesToSize(contentLength)) || 0;
      cInfo && vFormats.push({ ...cInfo, url, size, itag });
    });
    const img = `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`;
    this.setState({
      isFetching: false,
      vData: `${vFormats[0].itag}_${vFormats[0].format}`,
      info: {
        description,
        title,
        time: this.secondsToHms(length_seconds),
        related_videos,
        video_id,
        video_url,
        img,
        formats: vFormats,
      },
    });
  };

  handleDownload = () => {
    const { download } = this.refs;
    download.click();
  };

  handleChange = ({ target }) => {
    var url = target.value;
    var matches = url.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    );
    if (!matches) {
      setTimeout(() => { 
        alert("Please Enter Valid Url");
        return;
      }, 500);
    }
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { url, isFetching, info, vData } = this.state;

    return (
      <div className="body-items">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <div className="search button is-danger">
                <input
                  type="text"
                  className="search-input input is-danger"
                  name="url"
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                  value={url}
                  onChange={this.handleChange}
                />
              </div>
              <div className="search-button">
                <button
                  className={
                    isFetching
                      ? `button search-btn is-loading is-danger`
                      : `search-btn button is-danger`
                  }
                  onClick={this.handleFetch}
                  disabled={isFetching}
                >
                  {isFetching ? `Loading` : `Fetch`}
                </button>
              </div>
            </div>
            <br />
            <div className="search-tos notification is-warning is-light has-text-centered">
              By using our service you accept our{" "}
              <a href="#" className="inner-a black bold nodecoradion">
                Terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="inner-a black bold nodecoradion">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="container download-section">
          <br />
          {info && (
            <div className="download-item">
              <div className="video-thumbnail">
                <img className="video-thumb" src={info.img} />
              </div>
              <div className="video-desc">
                <div className="video-data">
                  <div className="video-title single-line">{info.title}</div>
                  <div className="video-timing">
                    <strong>Duration : </strong>
                    {info.time}
                  </div>
                </div>
                <div className="download-button">
                  <div className="formats">
                    <a
                      target="_blank"
                      href={`/api/download?url=${info.video_url}&vname=${
                        info.title
                      }&itag=${vData && vData.split("_")[0]}&format=${
                        vData && vData.split("_")[1]
                      }`}
                      style={{ display: "none" }}
                      ref={"download"}
                    >
                      Download Url
                    </a>
                    <div className="control">
                      <div className="select">
                        <select
                          className="formats-selector"
                          name="vData"
                          value={vData}
                          onChange={this.handleChange}
                        >
                          {info.formats.map((format, i) => (
                            <option
                              className="format select"
                              value={`${format.itag}_${format.format}`}
                              key={`format-${i}`}
                            >{`${format.type}${
                              format.quality !== "-" ? `_${format.quality}` : ""
                            }.${format.format} ${
                              format.disp ? `(${format.disp})` : ""
                            } ${
                              format.size ? `(${format.size})` : ""
                            }`}</option>
                            /* selected={vData === `${format.itag}_${format.format}`} */
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    className="download-btn button is-success"
                    onClick={this.handleDownload}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}
          <br />
          <div className="container about-site-container">
            <div className="notification">
              <h2 className="body-heading">YouTube to Mp3</h2>
              <p className="is-half about-site">
                By using our converter you can easily convert YouTube videos to
                mp3 (audio) or mp4 (video) files and download them for free -
                this service works for computers, tablets and mobile devices.{" "}
                <br />
                <br />
                The videos are always converted in the highest available
                quality. Please note that we can only convert videos up to a
                length of 1 hour - the limitation is necessary, so the
                conversion of any video will not take more than a couple of
                minutes.
                <br />
                <br />
                Our service is for free and does not require any software or
                registration. By using our service you are accepting our terms
                of use.
                <br />
                <br />
                To convert a video, copy the YouTube video URL into our
                converter, choose a format and click the convert button. As soon
                as the conversion is finished you can download the file by
                clicking on the download button.
                <br />
                <br />
                Enjoy! We hope you like our service.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
