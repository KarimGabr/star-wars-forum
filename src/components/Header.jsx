import jedi_logo from "../assets/images/jedi-logo.svg";
import sith_logo from "../assets/images/sith-logo.svg";
import setThemeColors from "../utils/setThemeColors";

export default function Header() {
  return (
    <div className="d-flex flex-row justify-content-end p-5 pb-0">
      <div className="d-flex flex-row">
        <img
          src={jedi_logo}
          alt="jedi_logo"
          style={{ width: "50px", marginRight: "25px", cursor: "pointer" }}
          onClick={() => setThemeColors("light")}
        />
        <img
          src={sith_logo}
          alt="sith_logo"
          style={{ width: "50px", cursor: "pointer" }}
          onClick={() => setThemeColors("dark")}
        />
      </div>
    </div>
  );
}
