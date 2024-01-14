import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import MemberCreateForm from './pages/MemberCreateForm';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <SideMenu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Routes>
                            <Route path="/mitgliederverwaltung/mitglied-anlegen" element={<MemberCreateForm />} />
                            {/* Weitere Routen hier */}
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;