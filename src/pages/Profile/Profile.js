import React, { useEffect } from "react";
import { Tabs, Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinAction,
  layThongTinTaiKhoanAction,
} from "../../redux/actions/QuanLyNguoiDungAction";

import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";

export default function Profile() {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  const dispatch = useDispatch();
  const { thongTinNguoiDung, thongTinUser } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch(layThongTinTaiKhoanAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: thongTinNguoiDung.matKhau,
      email: thongTinNguoiDung.email,
      soDT: thongTinNguoiDung.soDT,
      maNhom: thongTinNguoiDung.maNhom,
      maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
      hoTen: thongTinNguoiDung.hoTen,
    },
    onSubmit: (values) => {
      dispatch(capNhatThongTinAction(values));
    },
  });

  const renderLichSu = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div key={index} className="col-span-1 m-2 p-2 w-full h-full">
          <div className="p-2 w-full text-left">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                src={ticket.hinhAnh}
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                alt="123"
              />
              <div className="flex-grow">
                <h2 className="text-black title-font font-medium">
                  {ticket.tenPhim}
                </h2>
                <p className="text-gray-500">
                  <b>Giờ Chiếu:</b>{" "}
                  <i>
                    {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                    <b>Ngày chiếu:</b>{" "}
                    {moment(ticket.ngayDat).format("DD-MM-YY")}
                  </i>
                </p>
                <p className="text-gray-500">
                  <b>Địa điểm:</b>{" "}
                  <i>
                    {seats.tenHeThongRap} - {seats.tenCumRap}
                  </i>
                </p>
                <p className="text-gray-500">
                  <b>Số ghế:</b>{" "}
                  <i>
                    {ticket.danhSachGhe.map((ghe, index) => {
                      return (
                        <span className="text-indigo-400" key={index}>
                          [{ghe.tenGhe}]{" "}
                        </span>
                      );
                    })}
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="container mx-auto"
      style={{ minHeight: "100vh", paddingTop: 150, marginBottom: "50px" }}
    >
      <Tabs onChange={callback} type="card">
        <TabPane tab="Thông Tin Cá Nhân" key="1">
          <div onSubmitCapture={formik.handleSubmit}>
            <div className="flex">
              <div>
                <button>
                  <div
                    style={{
                      width: 200,
                      height: 200,
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 100,
                    }}
                    className="ml-5 rounded-full bg-red-200"
                  >
                    {thongTinNguoiDung?.taiKhoan?.substr(0, 1)}
                  </div>
                  <div className="mt-5 font-bold">
                    Hello ! {thongTinNguoiDung?.taiKhoan}
                  </div>
                </button>
              </div>
              <Form
                className="w-full"
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
              >
                <Form.Item label="Tài khoản">
                  <Input
                    disabled
                    name="taiKhoan"
                    value={formik.values.taiKhoan}
                  />
                </Form.Item>
                <Form.Item label="Họ tên">
                  <Input
                    name="hoTen"
                    value={formik.values.hoTen}
                    onChange={formik.handleChange}
                  />
                </Form.Item>

                <Form.Item label="Số điện thoại">
                  <Input
                    name="soDT"
                    value={formik.values.soDT}
                    onChange={formik.handleChange}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Form.Item>
                <Form.Item label="Mật Khẩu">
                  <Input
                    name="Mật khẩu"
                    value={formik.values.matKhau}
                    onChange={formik.handleChange}
                  />
                </Form.Item>
                <Form.Item label="Mã nhóm">
                  <Input name="maNhom" disabled value={formik.values.maNhom} />
                </Form.Item>
                <Form.Item label="Loại người dùng">
                  <Select
                    name="maLoaiNguoiDung"
                    disabled
                    value={formik.values.maLoaiNguoiDung}
                  />
                </Form.Item>
                <button
                  style={{ marginLeft: "17%" }}
                  type="submit"
                  className="bg-indigo-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                >
                  Cập Nhật
                </button>
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Lịch Sử Đặt Vé" key="2">
          <div className="container px-5 py-5 mx-auto">
            <div className="grid md:grid-cols-2">{renderLichSu()}</div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
