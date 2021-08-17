import styled from "styled-components";

const RatingStarIcon = styled.div`
  display: inline-block;
  background: url(${(props) => props.src}) center center no-repeat;
  line-height: 1rem;
  height: 1rem;
  width: 1rem;
  background-size: 1rem;
`;
export default RatingStarIcon;
