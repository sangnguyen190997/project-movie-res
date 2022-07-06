import React from "react";
import "./HomeApp.css";
import Slider from "react-slick";

export default function HomeApp() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div id="appHome">
      <div className="jss116">
        <div className="jss117">
          <div className="row">
            <div>
              <p className="jss120 sm:text-sm">Ứng dụng tiện lợi dành cho</p>
              <p className="jss120 sm:text-sm">người yêu điện ảnh</p>

              <p>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm
                <br></br>
                rạp và đổi quà hấp dẫn.
              </p>
              <button className="jss121">App miễn phí - Tải về ngay!</button>
              <p className="py-3 text-lg font-bold">
                Tix có hai phiên bản{" "}
                <span>
                  <a
                    href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8"
                    target="_blank"
                  >
                    IOS
                  </a>
                </span>{" "}
                và{" "}
                <span>
                  <a
                    href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                    target="_blank"
                  >
                    Android
                  </a>
                </span>
              </p>
            </div>
            <section>
              <div className="jss122 sm:w-9/12 md:w-full lg:w-full">
                <img
                  className="jss123"
                  src="/img/mobile/mobile.png"
                  alt="mobile.png"
                />
                <Slider {...settings} className="jss124">
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide1.jpg"
                      alt="slide1"
                    />
                  </div>
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide2.jpg"
                      alt="slide2"
                    />
                  </div>
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide3.jpg"
                      alt="slide3"
                    />
                  </div>
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide4.jpg"
                      alt="slide4"
                    />
                  </div>
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide5.jpg"
                      alt="slide5"
                    />
                  </div>
                  <div>
                    <img
                      className="jss125"
                      src="./img/mobile/slide6.jpg"
                      alt="slide6"
                    />
                  </div>
                </Slider>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
