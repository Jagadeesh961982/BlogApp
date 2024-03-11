import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm"> React & Node </span>{" "}
        <span className="headerTitleLg"> Blog </span>{" "}
      </div>{" "}
      <img
        className="headerImg"
        src="https://media.istockphoto.com/id/1391198660/photo/hands-printing-on-laptop-banner.jpg?s=1024x1024&w=is&k=20&c=WUV9wg9qgNs28vEAoVuvLtQ7Ej-rHlmEWJLwG2MpUX4="
        alt=""
      />
    </div>
  );
}
