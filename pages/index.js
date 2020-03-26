import Link from "next/link";

export default () => (
  <>
    <h1>Hello, welcome to the second youtube video</h1>
    <a href="/login">login</a>
    <Link href="/login">
      <button>also login</button>
    </Link>
  </>
);
