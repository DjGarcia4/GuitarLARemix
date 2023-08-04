import { Outlet } from "@remix-run/react";
import Styles from "../styles/blog.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: Styles,
    },
  ];
}
function Blog() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
}

export default Blog;
