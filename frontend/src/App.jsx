import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Pages from './Pages/Pages';

const App = () => {
  return (
    <Router>
      <Pages />
    </Router>
  );
}

export default App