import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/Layout/HomeCarousel/HomeCarousel";
import News from "../News/News";
import HomeApp from "../HomeApp/HomeApp";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div>
      <HomeCarousel />
      <div className="container mx-auto px-4">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <MultipleRowSlick arrFilm={arrFilm} />
          </div>
        </section>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
        <News />
      </div>
      <HomeApp />
    </div>
  );
}
