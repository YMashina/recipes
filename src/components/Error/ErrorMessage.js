import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "shards-react";
import ErrorDiv from "../styled/ErrorDiv";

const ErrorMessage = ({ message, status }) => {
  const getMessage = () => {
    if (status === 429) {
      return "Sorry, Yummly.com have limited the number of available requests. The maximum quota has been reached. New requests will be available next month.";
    }
    return message;
  };
  return (
    <ErrorDiv>
      <Card>
        <CardBody>
          <CardTitle>Oops!</CardTitle>
          <p>{getMessage()}</p>
        </CardBody>
      </Card>
    </ErrorDiv>
  );
};

export default ErrorMessage;
