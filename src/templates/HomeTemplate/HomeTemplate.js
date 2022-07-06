import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import ScrollToTop from "react-scroll-up";

export const HomeTemplate = (props) => {
  //path, exact, Component
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <Fragment>
            <Header {...propsRoute} />

            <Component {...propsRoute} />

            <Footer />
            <ScrollToTop showUnder={160}>
              <img
                src="/img/logoTixLoading.png"
                alt="logoTix"
                style={{ width: 50, transform: "rotate(180deg)" }}
              />
            </ScrollToTop>
          </Fragment>
        );
      }}
    />
  );
};
