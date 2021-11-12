import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src="https://insideclimatenews.org/wp-content/uploads/2021/02/norway_joel-santos-barcroft-media-getty-2048x1366.jpg"
        alt="" />
    </div>
  )
}
