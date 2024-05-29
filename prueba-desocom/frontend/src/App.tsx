import Footer from "./components/Footer";
import Header from "./components/Header";
import UsersComponent from "./components/UsersComponent";
import "./styles-base.css";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <>
      <Header></Header>
      <h1>Frontend</h1>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UsersComponent />}></Route>
            <Route path="/:userId" element={<UserDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
