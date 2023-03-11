import Home from "./components/Home";
import About from "./components/About";
import Navigationbar from "./components/Navigationbar";
import Create from "./components/Create";
import SignIn from "./components/SignIn";
import BlogDetails from "./components/BlogDetails";
import SignUp from "./components/SignUp";
import { Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/blogs/:id" element={<BlogDetails />}/>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
    </div>

  );
}

export default App;
