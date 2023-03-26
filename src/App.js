import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CreateEditUser from "./components/CreateEditUser";
import ViewEditProfile from "./components/ViewEditProfile";
import Layout from "./pages/layout/Index";
import UsersListHome from "./pages/userslist/Index";

function App() {
  return (
    <div className="app">
       <BrowserRouter>
          <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Navigate to='/users' replace />} />
            <Route path="/users" element={<UsersListHome/>} />
            <Route path="/create-user" element={<CreateEditUser />} />
            <Route path="/edit-user/:userId" element={<CreateEditUser />} />
            <Route path="/profile" element={<ViewEditProfile />} />
            <Route path="/edit-profile" element={<ViewEditProfile/>}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
