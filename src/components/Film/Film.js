import React from "react";
import { NavLink } from "react-router-dom";
import "./Film_Flip.css";
import "../../assets/styles/button.css";
import { useState } from "react";
import { Modal, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

export default function Film(props) {
  const { phim } = props;

  const getVideoId = (urlYoutube) => {
    let videoId;
    const indexLastSlash = urlYoutube?.lastIndexOf("/");
    const resultSliceFromSlash = urlYoutube?.slice(indexLastSlash + 1);

    videoId = resultSliceFromSlash;
    const findWatch = resultSliceFromSlash?.indexOf("watch");
    if (findWatch !== -1) {
      const indexLastEqual = resultSliceFromSlash?.lastIndexOf("=");
      videoId = resultSliceFromSlash?.slice(indexLastEqual + 1);
    }

    return videoId;
  };

  const App = () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button
          className="playMovie"
          type="submit"
          onClick={() => setVisible(true)}
        >
          <PlayCircleOutlined />
        </Button>
        <Modal
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${getVideoId(phim.trailer)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal>
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-2 my-5 pr-5 film">
      <div className="max-w-xs rounded-md shadow-md dark:bg-coolGray-900 dark:text-coolGray-100 relative">
        <div
          style={{
            background: `url(${phim.hinhAnh}) no-repeat `,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          className="backgroundPosition"
        >
          <img
            src={phim.hinhAnh}
            alt
            className="object-cover object-center w-full rounded-md h-80 dark:bg-coolGray-500 opacity-0"
          />
        </div>

        <div className="flip-card">
          <App className="playMovie" />
        </div>
      </div>

      <NavLink
        to={`/detail/${phim.maPhim}`}
        type="button"
        className=" snip1547 flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-coolGray-900 "
      >
        ĐẶT VÉ
      </NavLink>
    </div>
  );
}
