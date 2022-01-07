import PropTypes from "prop-types";
import gsap from "gsap";
import { Wrapper } from "./ErrorMessage.styles";
import { useEffect, useRef } from "react";

const ErrorMessage = ({ message = "Something went wrong" }) => {
  const border = useRef(null);

  useEffect(() => {
    const { current: e } = border;
    const borders = e.querySelectorAll("span");

    const tl = gsap.timeline({
      duration: 7,
    });

    tl.fromTo(
      e,
      {
        y: document.documentElement.scrollTop + 100,
      },
      {
        duration: 1,
        y: document.documentElement.scrollTop,
      },
      "0",
    )
      .addLabel("up")
      .fromTo(
        borders[4],
        {
          width: 0,
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          width: "50%",
          background: "#CC0000",
        },
        "up",
      )
      .fromTo(
        borders[5],
        {
          width: "0",
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          width: "50%",
          background: "#CC0000",
        },
        "up",
      )
      .addLabel("bottom")
      .fromTo(
        borders[0],
        {
          height: 0,
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          height: "100%",
          background: "#CC0000",
        },
        "bottom",
      )
      .fromTo(
        borders[3],
        {
          height: 0,
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          height: "100%",
          background: "#CC0000",
        },
        "bottom",
      )
      .addLabel("sides")
      .fromTo(
        borders[1],
        {
          width: 0,
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          width: "50%",
          background: "#CC0000",
        },
        "sides",
      )
      .fromTo(
        borders[2],
        {
          width: "0",
          background: "#CC0000",
          immediateRender: false,
          autoRound: false,
        },
        {
          duration: 1.5,
          width: "50%",
          background: "#CC0000",
        },
        "sides",
      )
      .addLabel("top")
      .to(
        e,
        {
          duration: 1,
          y: document.documentElement.scrollTop + 100,
        },
        "top",
      );
  }, []);

  return (
    <Wrapper ref={border}>
      <p>{message}</p>
      <div>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </Wrapper>
  );
};

ErrorMessage.proptypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
