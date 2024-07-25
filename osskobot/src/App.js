import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import Join from './screens/Join';
import Mypage from './screens/Mypage';
import Bookclick from './screens/BookClick';
import Logout from './screens/Logout';
import ChatCharChoose from "./screens/ChatCharChoose";
import Chat from "./screens/Chat";
import BookReport from './screens/BookReport';
import ServiceInfo from "./screens/ServiceInfo";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setIsLogin(!isLogin);
  }, [reload]);

  return (
    <Router>
      <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login reload={reload} setReload={setReload} />}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/serviceinfo" element={<ServiceInfo/>}/>
        <Route path="/bookclick/:id" element={<Bookclick/>}/>
        <Route path="/bookclick/:id/:id" element={<ChatCharChoose/>}/>
        <Route path="/bookclick/:id/:id/chat" element={<Chat/>}/>
        <Route path="/bookclick/:id/bookreport" element={<BookReport/>}/>
        {/* 각각 스크린 구현 후 라우팅 시켜주면 됨
          /bookclick/bookquiz : 독서퀴즈 스크린
        */}
      </Routes>
    </Router>
  );
}

export default App;
