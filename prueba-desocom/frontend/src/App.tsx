import Footer from "./components/Footer";
import Header from "./components/Header";
import UsersComponent from "./components/UsersComponent";
import "./styles-base.css";
import "./app.css";

function App() {
  return (
    <>
      <Header></Header>
      <h1>Frontend</h1>
      <main>
        <UsersComponent />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
