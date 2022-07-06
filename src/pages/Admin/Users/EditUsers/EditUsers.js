import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  capNhatThongTinAction,
  capNhatThongTinNguoiDungAdminAction,
  layLoaiNguoiDungAction,
  layThongTinNguoiDungAction,
  layThongTinUser,
} from "../../../../redux/actions/QuanLyNguoiDungAction";

const EditUsers = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { thongTinNguoiDung, loaiNguoiDung, thongTinUser } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log("ThongTinNguoiDung", thongTinUser);

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layLoaiNguoiDungAction());
    dispatch(layThongTinUser(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinUser.taiKhoan,
      matKhau: thongTinUser.matKhau,
      email: thongTinUser.email,
      soDt: thongTinUser.soDT,
      maNhom: thongTinUser.maNhom,
      maLoaiNguoiDung: thongTinUser.maLoaiNguoiDung,
      hoTen: thongTinUser.hoTen,
    },
    onSubmit: (values) => {
      console.log("value", values);
      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(capNhatThongTinNguoiDungAdminAction(values));
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
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Input
            name="maNhom"
            onChange={formik.handleChange}
            value={formik.values.maNhom}
          />
        </Form.Item>
        <Form.Item label="Mã Loại Người Dùng">
          <Select
            options={loaiNguoiDung?.map((lnd, index) => ({
              label: lnd.tenLoai,
              value: lnd.maLoaiNguoiDung,
            }))}
            placeholder="Chọn loại người dùng"
            onChange={handleChangeLoaiNguoiDung}
            value={formik.values.maLoaiNguoiDung}
          />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">
            Cập Nhật Người Dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUsers;
