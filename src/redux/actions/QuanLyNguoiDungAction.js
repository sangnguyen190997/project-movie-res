import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  LAY_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_THONG_TIN_TAI_KHOAN,
  SET_THONG_TIN_USER,
  THEM_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";
import { history } from "../../App";

export const dangNhapAction = (thongtinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongtinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        history.push("/");
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinTaiKhoan();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_TAI_KHOAN,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const capNhatThongTinAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.capNhatNguoiDung(
        thongTinNguoiDung
      );
      alert("Cập nhật người dùng thành công");
      dispatch(layThongTinTaiKhoanAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layDanhSachNguoiDungAction = (tenNguoiDung = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(
        tenNguoiDung
      );
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_DANH_SACH_NGUOI_DUNG,
          danhSachNguoiDung: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const themNguoiDungAction = (nguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);
      alert("Thêm người dùng thành công");
      dispatch(layDanhSachNguoiDungAction());
      history.push("/admin/users");
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layLoaiNguoiDungAction = (loaiNguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layLoaiNguoiDung(
        loaiNguoiDung
      );
      dispatch({
        type: LAY_LOAI_NGUOI_DUNG,
        loaiNguoiDung: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinUser = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinUser(taiKhoan);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_USER,
          thongTinUser: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const capNhatThongTinNguoiDungAdminAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result =
        quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(taiKhoan);
      alert("Cập nhật người dùng thành công");
      dispatch(layThongTinTaiKhoanAction());
      history.push("/admin/users");
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const xoaNguoiDung = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xóa người dùng thành công");
      dispatch(layThongTinTaiKhoanAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
