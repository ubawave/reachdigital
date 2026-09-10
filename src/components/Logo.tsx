import logo from "../images/dark__logo.svg";

type Props = {
  height?: number;
};

export default function Logo({ height = 60 }: Props) {
  return (
    <img
      src={logo}
      alt="Reach Digital Concept logo"
      height={height}
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
     