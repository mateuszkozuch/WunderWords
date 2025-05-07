import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Learn from "./pages/learn/Learn";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import Games from "./pages/Games";
import Settings from "./pages/Settings";
import TestArea from "./pages/TestArea";

const App = () => {
  return(
    <main className="">
      <Nav />
      <section className="w-[60vw] absolute left-[15vw]">
        <Routes>
          <Route path="*" element={<Learn />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<Notes />}/>
          <Route path="/games" element={<Games />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/testarea" element={<TestArea />}></Route>
        </Routes>
      </section>
    </main>
  )
}

export default App;