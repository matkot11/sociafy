import { forwardRef } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const Icon = forwardRef(
  ({ onClick, href, iconPath, width, height, name }, ref) => (
    <a href={href} onClick={onClick} ref={ref}>
      <Image
        src={iconPath}
        alt={name}
        layout="fixed"
        width={width}
        height={height}
      />
    </a>
  ),
);
Icon.displayName = "Icon";

Icon.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  iconPath: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Icon;
