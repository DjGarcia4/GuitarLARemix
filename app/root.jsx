import { useState, useEffect } from "react";

import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta() {
  return [
    {
      charset: "utf-8",
    },
    { title: "GuitarLA - Remix" },
    { viewport: "widht=device-widht,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    { rel: "stylesheet", href: styles },
  ];
}

export default function App() {
  const [carrito, setCarrito] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : []
  );
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  const agregarCarrito = (guitarra) => {
    //*Validamos guitarras duplicadas iterando con un some el cual nos retorna o true o false si se repite o no
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      //*En el caso de que si haya un ID repetido volvemos a iterar el carrito pero esta vez con un map, el cual no modifica el arreglo original, sino que nos devuelve uno nuevo
      const carritoActualizado = carrito.map((guitarraState) => {
        //*Volvemos a validar cual es el id repetido
        if (guitarraState.id === guitarra.id) {
          //*Cuando lo encuentra solo modificamos la cantidad
          guitarraState.cantidad = guitarra.cantidad;
        }
        //*Retornamos el objeto que modificamos
        return guitarraState;
      });
      //*Volvemos a actualizar el carrito pero agregando el nuevo arreglo
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };
  const actualizarGuitarra = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };
  const eliminarGuitarra = (id) => {
    const carritoActualzado = carrito.filter((producto) => producto.id !== id);
    setCarrito(carritoActualzado);
  };
  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarGuitarra,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
//* Manejo de errores
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <Link to="/" className="error-enlace">
          Tal vez quiera volver a la pagina principal
        </Link>
      </Document>
    );
  }
}
