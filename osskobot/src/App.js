import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import cookies from 'js-cookie';
import Quiz from "./screens/Quiz";
import { useEffect, useState } from "react";
import Loading from './screens/Loading'

function App() {
  const [isLogin, setIsLogin] = useState(undefined);
  const [reload, setReload] = useState(false);
  const token = cookies.get('token');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/token/verify/`,
          {
            token: cookies.get('token')
          }
        )
          .then((response) => {
            if (response.status === 200) {
              setIsLogin(true);
            } else {
              setIsLogin(false);
              alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
            }
          })
          .catch((error) => {
            console.log(error);
          })
      } catch (error) {
        setIsLogin(false);
      }
    }
    if(token !== undefined){
      console.log(token);
      checkLoginStatus();
    }
  }, [reload, token]);

  return (
    <Router>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setReload={setReload} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<ProtectedRoute>
          <Mypage />
        </ProtectedRoute>} />
        <Route path="/serviceinfo" element={<ServiceInfo />} />
        <Route path="/bookclick/:id" element={<ProtectedRoute>
          <Bookclick />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/:id" element={<ProtectedRoute>
          <ChatCharChoose />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/:id/chat" element={<ProtectedRoute>
          <Chat />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/bookreport" element={<ProtectedRoute>
          <BookReport />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/quiz" element={<Quiz />} />                                     

        {/* 각각 스크린 구현 후 라우팅 시켜주면 됨
          /bookclick/bookquiz : 독서퀴즈 스크린
        */}
      </Routes>
    </Router>
  );
}

export default App;
