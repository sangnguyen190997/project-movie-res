import { useFormik } from "formik";
import { values } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
export default function Login(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      // maNhom: "",
      hoTen: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string()
        .required("Tài khoản không được bỏ trống!")
        .min(6, "Tài khoản từ 6 - 12 ký tự!")
        .max(12, "Tài khoản từ 6 - 12 ký tự!"),
      soDt: Yup.string().matches(/^\d{10}$/, "Số điện thoại không hợp lệ"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống !")
        .min(6, "Mật khẩu từ 6 - 32 ký tự!")
        .max(32, "Mật khẩu từ 6 đến 32 ký tự!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      email: Yup.string().matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email không hợp lệ!"
      ),
    }),
    onSubmit: async (values) => {
      let result = await quanLyNguoiDungService.dangKy(values);
      alert("Tạo tài khoản thành công");
      dispatch(result);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="py-5 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            CYBERLEARN
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-8 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
      xl:text-bold"
        >
          Đăng Ký
        </h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Tài khoản
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào tài khoản"
              />
              {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                <div className="text-red-400">{formik.errors.taiKhoan}</div>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
              </div>
              <input
                onChange={formik.handleChange}
                type="password"
                name="matKhau"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào mật khẩu"
              />
              {formik.errors.matKhau && formik.touched.matKhau ? (
                <div className="text-red-400">{formik.errors.matKhau}</div>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
              </div>
              <input
                onChange={formik.handleChange}
                name="email"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào email"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-400">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Số Điện Thoại
                </div>
              </div>
              <input
                onChange={formik.handleChange}
                name="soDt"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào số điện thoại"
              />
              {formik.errors.soDt && formik.touched.soDt ? (
                <div className="text-red-400">{formik.errors.soDt}</div>
              ) : null}
            </div>
            {/* <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mã Nhóm
                </div>
              </div>
              <input
                onChange={formik.handleChange}
                name="maNhom"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào mã nhóm"
              />
            </div> */}
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Họ Tên
                </div>
              </div>
              <input
                onChange={formik.handleChange}
                name="hoTen"
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào họ tên"
              />
              {formik.errors.hoTen && formik.touched.hoTen ? (
                <div className="text-red-400">{formik.errors.hoTen}</div>
              ) : null}
            </div>
            <div className="mt-10 flex justify-between">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg"
              >
                Tạo tài khoản
              </button>
              {/* <button
                onClick={() => {
                  history.push("/login");
                }}
                className="bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg"
              >
                Đăng nhập
              </button> */}
            </div>
            <div className="mt-5 text-sm font-display font-semibold text-gray-700 text-center">
              Đã có tài khoản ?{" "}
              <NavLink
                to={"/login"}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Đăng nhập
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
