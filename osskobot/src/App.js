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
        {/* 각각 스크린 구현 후 라우팅 시켜주면 됨
          /bookclick/talk : 대화하기 스크린
          /bookclick/bookquiz : 독서퀴즈 스크린
          /bookclick/knowledgequiz : 지식 키우기 스크린
        */}
        {/* <Route path="/bookclick/talk" element={<Home/>}/>
        <Route path="/bookclick/bookquiz" element={<Home/>}/>
        <Route path="/bookclick/knowledgequiz" element={<Home/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
