import styled from "styled-components";

const Spinner = styled.div`
  background: url("spinner.gif") center center no-repeat;
  height: 8rem;
  width: 8rem;
  background-size: 8rem;
  ${(props) =>
    props.mainPage
      ? "margin: -4rem -4rem;\n  position: absolute;\n  top: 50vh;\n  left: 50vw;"
      : null}
`;

export default Spinner;
