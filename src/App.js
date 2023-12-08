import './App.css'
import { Page } from './components/Page';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Page />
      </BrowserRouter>

      {/* <Routes> */}
        {/* <Route path='/' element={<Page />}/> */}
        {/* <Route path='/tasks' element={<Tasks/>}/> */}
        {/* <Route path='*' element={}/> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
