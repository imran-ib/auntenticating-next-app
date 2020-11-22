import { withApollo } from "../apollo/client";

const PrivatePage = () => {
  return <h1>This is Private Page </h1>;
};
export default withApollo(PrivatePage);
