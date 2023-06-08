import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';
import { setInterval } from 'timers';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  //displays a graph. There is already a graph function hidden the files that we will have to activate later
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //The initial state of the graph is hidden so that it only appears when the 
      //user clicks the data stream button
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() 
  {
    //if the graph is shown, put the data into the graph. 
    if (this.state.showGraph)
    {
      return (<Graph data={this.state.data}/>)

    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    //creating interval variable
   
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server

      //We know that we have a working function already with get datafrom server
      //All we need to do is have this function repeat on a predetermined interval
      //Let's set the interval to every 10 milliseconds
      this.setState({ data: [...this.state.data, ...serverResponds] });
      
      let ContinousInterval;
if (!ContinousInterval)
{
  ContinousInterval = setInterval(this.getDataFromServer, 500);
}

      


    
    });
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
