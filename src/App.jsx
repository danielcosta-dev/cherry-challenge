import { useState, useRef, useEffect } from "react";

function App() {
  const clientY = useRef(0);
  const clientX = useRef(0);
  const cherry_id = useRef(0);

  const [newCherry, setNewCherry] = useState(null);
  const [cherrys, setCherrys] = useState([]);
  const [lastCherry, setLastCherry] = useState();

  const handleCreateNewCherry = () => {
    cherry_id.current++;
    setNewCherry({
      id: cherry_id.current,
      name: 'New Cherry',
      y_axis: clientY.current,
      x_axis: clientX.current,
    });
  };

  const handleRemoveCherry = () => {
    setLastCherry(cherrys[cherrys.length - 1]);
    setCherrys(prevCherrys => prevCherrys.slice(0, -1));
  };
  
  const handleRedoLastCherry = () => {
    setCherrys(prevCherrys => [...prevCherrys, lastCherry]);
  }

  useEffect(() => {
    const handleClick = (event) => {
      clientY.current = event.clientY;
      clientX.current = event.clientX;
      handleCreateNewCherry();
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (newCherry !== null) {
      setCherrys(prevCherrys => [...prevCherrys, newCherry]);
    }
  }, [newCherry]);

  const styles = {
    cherry: {
      backgroundColor: "pink",
      width: 100,
      height: 100,
    },
  };

  return (
   <>
      {cherrys.length > 0
      ? cherrys.map(item => (
        <div key={item.id} style={{...styles.cherry, position: "absolute", top: item.y_axis, left: item.x_axis}}>
          {item.id}
        </div>
      ))
      : (<h1>Olá, mundo!</h1>)
      }

      <button onClick={() => handleRemoveCherry()}>Undo</button>
      <button onClick={() => handleRedoLastCherry()}>Redo</button>
   </>
  );
}

export default App;
