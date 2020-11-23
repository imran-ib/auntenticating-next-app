import { gql, useQuery } from "@apollo/react-hooks";
import { withApollo } from "../apollo/client";
import { useRouter } from "next/router";

const CurrentUser = gql`
  query CurrentUser {
    CurrentUser {
      id
      name
      email
    }
  }
`;

const PrivatePage = () => {
  //NOTE we should use router in client side component instead of pages
  const Router = useRouter();
  const { data, loading, error } = useQuery(CurrentUser);
  if (loading) return <p>Loading...</p>;
  if (loading) return <p>{error.message}</p>;
  const user = data.CurrentUser;
  if (!user) Router.back();

  return (
    <>
      <h1>This is Private Page </h1>
      {user?.id}
      {user?.email}
      {user?.name}
    </>
  );
};
export default withApollo(PrivatePage);
