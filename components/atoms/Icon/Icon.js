import { forwardRef } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const Icon = forwardRef(
  ({ onClick, href, iconPath, imageWidth, imageHeight, name }, ref) => (
    <a href={href} onClick={onClick} ref={ref}>
      <Image
        src={iconPath}
        alt={name}
        layout="fixed"
        width={imageWidth}
        height={imageHeight}
      />
    </a>
  ),
);
Icon.displayName = "Icon";

Icon.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  iconPath: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Icon;
