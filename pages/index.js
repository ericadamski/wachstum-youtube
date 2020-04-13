import Link from "next/link";
import Cookie from "js-cookie";

export default () => {
  if (process.browser) alert(Cookie.get("_wsp"));

  return (
    <>
      <h1>Hello, welcome to the second youtube video</h1>
      <a href="/login">login</a>
      <Link href="/login">
        <button>also login</button>
      </Link>
    </>
  );
};
