import { useEffect, useRef } from "react";
import Image from "next/image";
import { Wrapper } from "./LoadingComments.styles";
import gsap from "gsap";

const LoadingComments = () => {
  const image = useRef(null);

  useEffect(() => {
    const { current: e } = image;
    const message = e.querySelectorAll("span");
    const tl = gsap.timeline({
      repeat: -1,
      duration: 1.2,
    });
    tl.fromTo(
      message[0],
      {
        display: "none",
        opacity: 1,
        y: 0,
        ease: "easeInCirc",
      },
      {
        opacity: 0,
        y: 50,
        display: "block",
      },
      "0",
    )
      .fromTo(
        message[1],
        {
          opacity: 1,
          y: 0,
          ease: "easeInCirc",
        },
        {
          opacity: 0,
          y: 50,
        },
        "+0.3",
      )
      .fromTo(
        message[2],
        {
          opacity: 1,
          y: 0,
          ease: "easeInCirc",
        },
        {
          opacity: 0,
          y: 50,
        },
        "+0.5",
      );
  }, []);

  return (
    <Wrapper ref={image}>
      {[0, 1, 2].map((i) => (
        <Image
          key={i}
          src={"/svg/loadingMessage.svg"}
          alt={`${i + 1} loader`}
          layout="fixed"
          width={200}
          height={65}
          priority="true"
        />
      ))}
    </Wrapper>
  );
};

export default LoadingComments;
