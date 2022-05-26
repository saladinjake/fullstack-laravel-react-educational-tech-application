import React from "react";

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  React.useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);
  if (loadedSrc === props.src) {
    return <img {...props} />;
  }
  return null;
};

const App = () => {
  return (
    <div>
      <AsyncImage src="https://dirask.com/static/bucket/1574890428058-BZOQxN2D3p--image.png" />
      <p>Some text here ...</p>
      <AsyncImage src="https://dirask.com/static/bucket/1590005168287-pPLQqVWYa9--image.png" />
      <p>Some text here ...</p>
      <AsyncImage src="https://dirask.com/static/bucket/1590005138496-MWXQzxrDw4--image.png" />
      <p>Some text here ...</p>
      <AsyncImage src="https://dirask.com/static/bucket/1590005318053-3nbAR5nDEZ--image.png" />
    </div>
  );
};

export default App;
