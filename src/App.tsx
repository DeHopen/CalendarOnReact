import React, {useState} from 'react';
import CalendarComponent from './features/Main/components_main/CalendarComponent/CalendarComponent';
import Calendar from './features/Beta/components_beta/Calendar/Calendar';

function App() {
  const [isBeta, setIsBeta] = useState(true);

  const toggleComponent = () => {
    setIsBeta(!isBeta);
  };

  return (
      <div className="App">
        <div>
          <h1>{isBeta ? 'Actual Version' : 'Beta Version'}</h1>
          <button onClick={toggleComponent}>
            {isBeta ? 'Switch to Beta' : 'Switch to Actual'}
          </button>
        </div>
        {isBeta ? <CalendarComponent/> : <Calendar/>}
      </div>
  );
}

export default App;
