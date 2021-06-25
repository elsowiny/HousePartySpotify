import HomePage from "./components/HomePage.jsx";

function App(props) {
  return (

    <div className="App">
      hey 
         <h1>{props.name}</h1>
         <HomePage />

     
    </div>
  );
}

export default App;
