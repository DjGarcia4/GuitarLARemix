import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import Styles from "../styles/carrito.css";

export function meta() {
  return [
    { title: `GuitarLA - Carrito de Compras` },
    {
      description: `Guitarras, Venta de Guitarras, Carrito de Compras`,
    },
  ];
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: Styles,
    },
  ];
}
function Carrito() {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarGuitarra, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);
  return (
    <ClientOnly fallback={"cargando..."}>
      {() => (
        <main className="contenedor">
          <Toaster />
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito.length === 0
                ? "El carrito esta Vacio"
                : carrito.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen Guitarra ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p className="cantidad">Cantidad: </p>
                        <select
                          id="cantidad"
                          onChange={(e) => {
                            actualizarGuitarra({
                              cantidad: +e.target.value,
                              id: producto.id,
                            });
                            toast.success("Cantidad Actualizada");
                          }}
                          value={producto.cantidad}
                          className="select"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">
                          $ <span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: ${" "}
                          <span>{producto.precio * producto.cantidad}</span>
                        </p>
                      </div>
                      <button
                        className="btn_eliminar"
                        type="button"
                        onClick={() => {
                          eliminarGuitarra(producto.id);
                          toast.success("Guitarra Eliminada");
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a Pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;
