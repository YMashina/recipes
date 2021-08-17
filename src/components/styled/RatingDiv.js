import styled from "styled-components";

const Icon = styled.div`
  display: inline-block;
  background: url(${(props) => props.src}) center center no-repeat;
  height: 2rem;
  width: 2rem;
  background-size: 2rem;
  margin-right: 1rem;
`;
export default Icon;
