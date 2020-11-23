import { withApollo } from "../apollo/client";
import { gql, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const USER_LOGIN = gql`
  mutation UserLogin {
    userLogin(email: "john@exapmle.com", password: "123456")
  }
`;

const IndexPage = () => {
  //NOTE we should use router in client side component instead of pages
  const Router = useRouter();

  const [login, { data, loading, error }] = useMutation(USER_LOGIN, {
    onCompleted: (data) => {
      const token = data?.userLogin;
      localStorage.setItem("token", token);
      Router.push("/private");
    },
  });
  if (loading) return <p>Loading...</p>;
  if (loading) return <p>{error.message}</p>;
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <button onClick={() => login()}>Login</button>
    </>
  );
};
export default withApollo(IndexPage);
