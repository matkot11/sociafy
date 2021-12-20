import Image from "next/image";
import { Wrapper } from "./Loading.styles";

const Loading = () => (
  <Wrapper>
    <Image
      src={"/svg/loadingMessage.svg"}
      alt="Message svg"
      layout="fixed"
      width={300}
      height={100}
    />
    <Image
      src={"/svg/loadingMessage.svg"}
      alt="Message svg"
      layout="fixed"
      width={300}
      height={100}
    />
    <Image
      src={"/svg/loadingMessage.svg"}
      alt="Message svg"
      layout="fixed"
      width={300}
      height={100}
    />
  </Wrapper>
);

export default Loading;
