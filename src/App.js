import logo from './logo.svg';
import './App.css';
import Websocket from './websocket/Websocket';
import AppStomp from './websocket/AppStomp';

function App() {
  return (
    <div className="App">
     <Websocket></Websocket>
     <AppStomp></AppStomp>
    </div>
  );
}

export default App;
