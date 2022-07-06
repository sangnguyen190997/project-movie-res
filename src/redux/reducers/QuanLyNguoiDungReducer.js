import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
  LAY_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_THONG_TIN_TAI_KHOAN,
  SET_THONG_TIN_USER,
} from "../types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  danhSachNguoiDung: [],
  loaiNguoiDung: [],
  thongTinUser: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_THONG_TIN_TAI_KHOAN: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }

    case SET_DANH_SACH_NGUOI_DUNG: {
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      return { ...state };
    }
    case LAY_LOAI_NGUOI_DUNG: {
      state.loaiNguoiDung = action.loaiNguoiDung;
      return { ...state };
    }

    case SET_THONG_TIN_USER: {
      state.thongTinUser = action.thongTinUser;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
