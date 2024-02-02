import React from 'react';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class AppStomp extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: 'You server message here.',
      username:'vipi'
    };
  };

  componentDidMount() {
    this.subscribeSTOMP();
  }

    subscribeSTOMP(){
      let currentComponent = this;
      const userName = this.state.username;
      let onConnected = () => {
        console.log("Connected!!")
        client.subscribe(`/user/${userName}/topic/message`, function (msg) {
          if (msg.body) {
            var jsonBody = JSON.parse(msg.body);
            if (jsonBody.message) {
              currentComponent.setState({ messages: jsonBody.message })
            }
          }
        });
    }

    let onDisconnected = () => {
      console.log("Disconnected!!")
    }

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected
    });

    client.activate();
  };

  handleChange = (event)=>{
    this.setState({username:event.target.value});
  }

  render() {
    return (
      <div>
        <div>{this.state.messages}</div>
        <input type="text" onChange={this.handleChange}/>
        <button onClick={()=>this.subscribeSTOMP()}>subscribe</button>
      </div>
    );
  }

}

export default AppStomp;