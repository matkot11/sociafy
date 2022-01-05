import IconLink from "../../atoms/IconLink/IconLink";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const NavbarButtonsProfile = () => (
  <Wrapper>
    <button>
      <IconLink iconPath="/icons/home.svg" name="Home" width={24} height={24} />
    </button>
    <button>
      <IconLink
        iconPath="/icons/post.svg"
        name="Posts"
        width={24}
        height={24}
      />
    </button>
    <button>
      <IconLink
        iconPath="/icons/about.svg"
        name="About"
        width={24}
        height={24}
      />
    </button>
    <button>
      <IconLink
        iconPath="/icons/friends.svg"
        name="Friends"
        width={24}
        height={24}
      />
    </button>
    <button>
      <IconLink iconPath="/icons/pen.svg" name="Edit" width={24} height={24} />
    </button>
  </Wrapper>
);

export default NavbarButtonsProfile;
