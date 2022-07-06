import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  xoaNguoiDung,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { history } from "../../../App";
import { NavLink } from "react-router-dom";

const { Search } = Input;
export default function Users() {
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      width: "15%",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      width: "15%",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {},
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/users/editusers/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              key={2}
              className="text-2xl"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (
                  window.confirm("Bạn có chắc muốn xóa phim " + user.tenPhim)
                ) {
                  //Gọi action
                  dispatch(xoaNguoiDung(user.taiKhoan));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];
  const data = danhSachNguoiDung;
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDungAction(value));
  };
  return (
    <div>
      <Button
        onClick={() => {
          history.push("/admin/users/addusers");
        }}
        className="mb-5 ant-btn-primary"
      >
        Thêm Người Dùng
      </Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
