import { Routes, Route } from "react-router-dom";

import { Home, Search, Create, UserProfile, SharedLayout,Error,LandingPage,Register } from "./pages";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/user" element={<UserProfile />} /> */}
        <Route path="/" element={<LandingPage /> }/>
        <Route path="register" element={<Register /> }/>
        <Route path='*' element={ <Error />}/>
   
      </Routes>
    </div>
  );
}

export default App;
