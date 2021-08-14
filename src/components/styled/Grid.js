import styled from "styled-components";

const Grid = styled.div`
  max-width: 100rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
export default Grid;
