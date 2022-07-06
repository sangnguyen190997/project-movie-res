import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { Tabs, Radio, Space } from "antd";
import "../../assets/styles/circle.scss";
import { useSelector, useDispatch } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from "moment";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;
export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //Lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor="#fff" // required
        color="rgba(255,255,255,0.4)" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1 w-full h-80 sm:h-5/6"
                src={filmDetail.hinhAnh}
                alt="123"
              />
              <div className="col-span-2 ml-5">
                <p className="text-sm ">
                  Ngày Chiếu :{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YY")}
                </p>
                <p className="text-4xl lg:text-2xl md:text-xl sm:text-lg leading-3">
                  {filmDetail.tenPhim}
                </p>
                <p className="">{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h1
              style={{
                marginLeft: "15%",
                color: "yellow",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Đánh giá
            </h1>
            <h1
              style={{ marginLeft: "5%" }}
              className="text-2xl text-green-400"
            >
              <Rate
                allowHalf
                value={filmDetail.danhGia / 2}
                style={{ color: "#78ed78", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ margin: "auto" }}
          className="lg:w-3/5 mt-20 ml-72 w-2/3 bg-white px-5 py-5"
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch Chiếu" key="1" style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="flex flex-row items-center justify-center">
                            <img
                              src={htr.logo}
                              className="rounded-full w-full"
                              style={{ width: 50 }}
                              alt="..."
                            />
                            <div className="text-center ml-2">
                              {htr.tenHeThongRap}
                            </div>
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index}>
                              <div className="flex flex-row">
                                <img
                                  src={cumRap.hinhAnh}
                                  className="w-16 h-16 md:w-16 md:h-24 sm:h-40"
                                  alt="..."
                                />
                                <div className="ml-2">
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p
                                    className="text-gray-400"
                                    style={{ marginTop: 0 }}
                                  >
                                    {cumRap.diaChi}
                                  </p>
                                </div>
                              </div>
                              <div className="thong-tin-lich-chieu grid grid-cols-4">
                                {cumRap.lichChieuPhim.map(
                                  (lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                        className="col-span-1 text-green-800 font-bold md:pb-5 sm:pb-5 sm:font-medium"
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông Tin" key="2">
              Thông Tin
            </TabPane>
            <TabPane tab="Đánh Giá" key="3">
              Đánh Giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
