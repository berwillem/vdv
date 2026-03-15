import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout/Layout.jsx";

// Pages
import Accueil from "./pages/Accueil/Accueil.jsx";
import APropos from "./pages/APropos/APropos.jsx";
import NosVoyages from "./pages/NosVoyages/NosVoyages.jsx";
import VoyagePersonnalise from "./pages/VoyagePersonnalise/VoyagePersonnalise.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Entreprise from "./pages/Entreprise/Entreprise.jsx";
import Details from "./pages/Details/Details.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />

          <Route path="/a-propos" element={<APropos />} />
          <Route path="/nos-voyages" element={<NosVoyages />} />
          <Route path="/voyage-personnalise" element={<VoyagePersonnalise />} />
          <Route path="/entreprise" element={<Entreprise />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>

        {/* Auth routes without Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
