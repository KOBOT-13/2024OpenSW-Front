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
import LoginProtectedRoute from "./components/ProtectedRoute/LoginProtectedRoute";
import { useEffect, useState } from "react";
import cookies from 'js-cookie';
import Quiz from "./screens/Quiz";

function App() {
  const [isLogin, setIsLogin] = useState(undefined);
  const [reload, setReload] = useState(false);
  const token = cookies.get('token');
  // cookies.remove('token');
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [reload, token]);

  return (
    <Router>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginProtectedRoute>
          <Login setReload={setReload} />
        </LoginProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute>
          <Logout setReload={setReload} />
        </ProtectedRoute>} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<ProtectedRoute>
          <Mypage />
        </ProtectedRoute>} />
        <Route path="/serviceinfo" element={<ServiceInfo />} />
        <Route path="/bookclick/:id" element={<ProtectedRoute setReload={setReload}>
          <Bookclick />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/chatcharchoose" element={<ProtectedRoute>
          <ChatCharChoose />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/chatcharchoose/:characterid/chat" element={<ProtectedRoute>
          <Chat />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/bookreport" element={<ProtectedRoute>
          <BookReport />
        </ProtectedRoute>} />
        <Route path="/bookclick/:id/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;