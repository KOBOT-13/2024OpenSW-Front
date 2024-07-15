import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import Join from './screens/Join';
import Mypage from './screens/Mypage';
import Bookclick from './screens/BookClick';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/bookclick" element={<Bookclick/>}/>
      </Routes>
    </Router>
  );
}

export default App;
