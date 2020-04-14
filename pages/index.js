import Link from "next/link";
import useAuth from "../hooks/useAuth";
import AuthService from "../services/auth";

export default (props) => {
  const user = useAuth(props.user);

  return (
    <>
      <h1>
        {user._id
          ? `Bonjour ${user.name}`
          : "Hello, welcome to the sixth youtube video"}
      </h1>
      <a href="/login">login</a>
      <Link href="/login">
        <button>also login</button>
      </Link>
    </>
  );
};

// NODE JS CODE
export async function getServerSideProps(context) {
  return {
    props: {
      user: await AuthService.getUserFromCookie(context.req),
    },
  };
}
