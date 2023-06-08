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
    /*

    originally I was trying to do something similar to
    let continousInterval;
        if(!continousInterval)
        {
          continousInterval = setInterval(this.getDataFromServer, 500)
        }
          This doesn't work because in order to use that syntax the first "arguement"(the first thing you can put inside)
          has to be a function. We are working with methods that are attached to an object. 
          So instead we have to use the syntax:
          setInterval(code, delay)
          In the model example which I followed, we set a variable to 0 so to act as a timer. Which when it reaches a full second clears the interval. Which after a tenth of a second we then repeat the interval again. 
          I'm surprised we have to use x for a counter but alas, I'm still figuring this programming stuff out. 
          We use a pointer to put all the code inside getDataFromServer to serve as the code and then after putting in the x to clear the interval
          we then add the final delay.
    */
    let x=0;
   const continousInterval = setInterval(()=>{
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server

      //We know that we have a working function already with get datafrom server
      //All we need to do is have this function repeat on a predetermined interval
      //Let's set the interval to every 10 milliseconds
      this.setState({ data:serverResponds,
                      showGraph: true});
    
    });
    x++;
    if (x>1000) {
      clearInterval(continousInterval);
    }
   }, 100);
   
   
  }
/*


Our data now streams continously, the problem now is that we need to aggregate the duplicated data and have a graph appear to visualize the data. 
*/
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
