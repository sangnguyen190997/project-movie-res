import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công");
      console.log("result", result.data.content);
    } catch (erorrs) {
      console.log("errors", erorrs.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công");
      console.log("result", result.data.content);
      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (erorrs) {
      console.log("errors", erorrs.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    let result = await quanLyPhimService.xoaPhim(maPhim);
    alert("Xóa phim thành công");
    //Sau khi xóa xong load lại danh sách mới
    dispatch(layDanhSachPhimAction());
    try {
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
