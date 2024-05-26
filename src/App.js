import { BrowserRouter,Route, Routes  } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Miss from "./pages/Miss";
const App = () => {
  return (
	  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/post/:postId" element={<Detail/>}></Route>
          <Route path="*" element={<Miss/>}></Route>
        </Routes>
     </BrowserRouter>
  );
}

export default App;