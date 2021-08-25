import { Button, ButtonGroup } from "shards-react";
import { useCallback, useMemo, useState } from "react";
import { calculateMaxPage } from "./constants";

const Pagination = ({ totalResults, itemsPerPage, getPage, currentPage }) => {
  const maxPage = useMemo(
    () => calculateMaxPage(totalResults, itemsPerPage),
    [totalResults, itemsPerPage]
  );

  const handlePageClick = (value) => {
    getPage(value);
  };

  const generateButtons = useCallback(
    (currentPage, maxPage) => {
      let buttons = [];
      if (currentPage !== 1)
        buttons.push(
          <Button outline theme="light" onClick={() => handlePageClick(1)}>
            {1}
          </Button>
        );
      if (currentPage > 4)
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage - 3)}
          >
            {"..."}
          </Button>
        );
      if (currentPage - 2 > 1) {
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage - 2)}
          >
            {currentPage - 2}
          </Button>
        );
      }
      if (currentPage - 1 > 1) {
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {currentPage - 1}
          </Button>
        );
      }
      buttons.push(
        <Button theme="info" onClick={() => handlePageClick(currentPage)}>
          {currentPage}
        </Button>
      );
      if (currentPage + 1 < maxPage) {
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
        );
      }
      if (currentPage + 2 < maxPage) {
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage + 2)}
          >
            {currentPage + 2}
          </Button>
        );
      }
      if (currentPage < maxPage - 3)
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(currentPage + 3)}
          >
            {"..."}
          </Button>
        );

      if (currentPage !== maxPage)
        buttons.push(
          <Button
            outline
            theme="light"
            onClick={() => handlePageClick(maxPage)}
          >
            {maxPage}
          </Button>
        );

      return buttons.map((button) => button);
    },
    [currentPage, maxPage]
  );

  return (
    <>
      <ButtonGroup>
        <Button
          outline
          theme="light"
          onClick={() =>
            currentPage > 1 ? handlePageClick(currentPage - 1) : null
          }
        >
          {"<"}
        </Button>
        {generateButtons(currentPage, maxPage)}
        <Button
          outline
          theme="light"
          onClick={() =>
            currentPage < maxPage ? handlePageClick(currentPage + 1) : null
          }
        >
          {">"}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Pagination;
