import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Flow from './canvas/Flow';
import NodeFlow from './canvas/NodeFlow';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Flow />} />
          <Route path="/node/:nodeId" element={<NodeFlow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
