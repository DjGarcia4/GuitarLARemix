import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export const meta = () => {
  return [{ title: "GuitarLA - Nosotros" }];
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A unde nemo
            molestiae similique minus incidunt officia aut vitae. Facilis ad non
            dolores atque amet adipisci rerum molestias quidem itaque commodi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A unde nemo
            molestiae similique minus incidunt officia aut vitae. Facilis ad non
            dolores atque amet adipisci rerum molestias quidem itaque commodi.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
