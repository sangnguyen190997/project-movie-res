import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinTaiKhoan = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  capNhatNguoiDung = (thongTinDangNhap) => {
    return this.put(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      thongTinDangNhap
    );
  };
  layDanhSachNguoiDung = (tenNguoiDung = "") => {
    if (tenNguoiDung.trim() !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tenNguoiDung}`
      );
    }
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  themNguoiDung = (nguoiDung) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung);
  };
  layLoaiNguoiDung = (loaiNguoiDung) => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  layThongTinUser = (taiKhoan) => {
    return this.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  };
  capNhatThongTinNguoiDungAdmin = (thongTin) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTin);
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
