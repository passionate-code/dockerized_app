import React, { useState, useEffect } from 'react'; // import React and React hooks: useState and useEffect
import axios from 'axios';

function App() { // define functional component App
  const [data, setData] = useState([]); // set state value to null and assign to variable data and set state function to variable setData
  var axios_api = (url) => { // define axios_api function
    axios.get(url) // fetch response data via an axios call to the backend and return a promise object
      .then(response => setData(response.data)) // on success, state function setData  is used to assign json object from the http response to the state value data
      .catch(error => console.error(error)); // on reject, print error to console
  }
  useEffect(() => { // perform side effects after functional component renders the page
    axios_api('http://10.232.50.10:9000/'); // execute function to make initial API call
    const interval = setInterval(() => { // a method to execute subsequent API call periodically every 1 minute
      axios_api('http://10.232.50.10:9000/');
    }, 60000);
  }, []); // dependency array is empty thus run side effect only once after initial rendering
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  return (
    <div style={styles}>
      <ol>
        {data.map(element => (
          <li key={element.id}>site name: {element.name}
            <ul>
              <li>url: {element.url}</li>
              <li>status code: {element.statuscode.toString()}</li>
              <li>time updated: {element.date}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
  ); // return state value that contains array of json object fetched through backend API and rendered it as a list
}

export default App; // exports the App functinoal component
