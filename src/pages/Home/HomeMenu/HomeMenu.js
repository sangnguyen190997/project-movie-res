import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import "./buttonhomenu.css";

const { TabPane } = Tabs;
export default function HomeMenu(props) {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const { tabPosition } = state;
  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };
  const renderHeThongRap = () => {
    return props.heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img src={heThongRap.logo} className="rounded-full" width="50" />
          }
          key={index}
          style={{ overflowY: "scroll", height: "500px" }}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img
                        src={heThongRap.logo}
                        className="rounded-full"
                        width="50"
                      />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-red-200">Chi tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/**Load phim tương ứng */}
                  {cumRap.danhSachPhim.map((phim, index) => {
                    return (
                      <div className="flex border-b-2 py-5" key={index}>
                        <img
                          style={{ height: 110, width: 75 }}
                          src={phim.hinhAnh}
                          alt={phim.tenPhim}
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src = "https://picsum.photos/75/75";
                          }}
                        />
                        <div className="ml-2">
                          <h2 className="text-2xl text-green-700">
                            {phim.tenPhim}
                          </h2>
                          <p className="mb-2">{cumRap.diaChi}</p>
                          <div className="grid xl:grid-cols-6 xl:gap-6 text-sm lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-2 sm:grid-cols-1">
                            {phim.lstLichChieuTheoPhim
                              ?.slice(0, 6)
                              .map((lichChieu, index) => {
                                return (
                                  <NavLink
                                    className={`text-xl text-green-400 jss1538`}
                                    to={`/checkout/${lichChieu.maLichChieu}`}
                                    key={index}
                                  >
                                    {moment(lichChieu.ngayChieuGioChieu).format(
                                      "hh:mm A"
                                    )}
                                  </NavLink>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <Fragment>
      {/* <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs> */}
      <div id="lichChieu" className="bg-white my-5">
        <div style={{ position: "sticky" }}>
          <div className="flex items-center justify-center flex-shrink-0 px-5 py-3 space-x-2  dark:text-coolGray-50">
            <ExportOutlined
              className="text-xl "
              style={{ color: "#1b2735", fontWeight: "bold" }}
            />
            <span
              className="text-xl "
              style={{ color: "#1b2735", fontWeight: "bold" }}
            >
              HỆ THỐNG RẠP CHIẾU
            </span>
          </div>
          <hr />
        </div>
        <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
      </div>
    </Fragment>
  );
}
