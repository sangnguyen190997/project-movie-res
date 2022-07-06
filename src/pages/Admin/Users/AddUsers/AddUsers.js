import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GROUPID } from "../../../../util/settings/config";
import {
  layLoaiNguoiDungAction,
  themNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";

const AddUsers = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();

  const { loaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    dispatch(layLoaiNguoiDungAction());
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
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
      hoTen: Yup.string().required("Họ tên không được bỏ trống!"),
      email: Yup.string().matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email không hợp lệ!"
      ),
    }),
    onSubmit: (values) => {
      values.maNhom = GROUPID;

      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(themNguoiDungAction(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeLoaiNguoiDung = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Thêm mới người dùng </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tài Khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <div className="text-red-400">{formik.errors.taiKhoan}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input name="matKhau" onChange={formik.handleChange} />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <div className="text-red-400">{formik.errors.matKhau}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-400">{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input name="soDt" onChange={formik.handleChange} />
          {formik.errors.soDt && formik.touched.soDt ? (
            <div className="text-red-400">{formik.errors.soDt}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Input
            name="maNhom"
            onChange={formik.handleChange}
            placeholder="Mã nhóm hợp lệ từ GP00-GP05"
          />
          {formik.errors.maNhom && formik.touched.maNhom ? (
            <div className="text-red-400">{formik.errors.maNhom}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mã Loại Người Dùng">
          <Select
            options={loaiNguoiDung?.map((lnd, index) => ({
              label: lnd.tenLoai,
              value: lnd.maLoaiNguoiDung,
            }))}
            placeholder="Chọn loại người dùng"
            onChange={handleChangeLoaiNguoiDung}
          />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input name="hoTen" onChange={formik.handleChange} />
          {formik.errors.hoTen && formik.touched.hoTen ? (
            <div className="text-red-400">{formik.errors.hoTen}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="ant-btn-primary text-white p-2">
            Thêm Người Dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUsers;
