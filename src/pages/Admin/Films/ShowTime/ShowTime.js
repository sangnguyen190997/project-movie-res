import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      let result = await quanLyDatVeService.taoLichChieu(values);
      alert(result.data.content);
    },
  });
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.reponse?.data);
    }
  }, []);
  const handleChangeHeThongRap = async (value) => {
    //từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.reponse?.data);
    }
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onchangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const convertSelecHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.tenHeThongRap };
    });
  };
  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-2xl">
          Tạo lịch chiếu - {props.match.params.tenphim}
        </h3>
        <img src={film.hinhAnh} alt={film.hinhAnh} width={300} height={300} />
        <Form.Item label="Hệ thống rạp">
          <Select
            options={convertSelecHTR()}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
