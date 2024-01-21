import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MemberList from './components/MemberList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulare from './components/Formulare';
import Kalender from './components/Kalender';
import Statistiken from './components/Statistiken';
import Nachrichten from './components/Nachrichten';
import Fangberichte from './components/Fangberichte';
import Mitgliederverwaltung from './components/Mitgliederverwaltung';
import Mitgliedermenu from './components/Mitgliedermenu';
import DatabaseStatus from './components/DatabaseStatus.tsx';


const App: React.FC = () => {
    return (
        <Router>
            <Header />


            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mitgliederverwaltung" element={<Mitgliederverwaltung />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/formulare" element={<Formulare />} />
                <Route path="/kalender" element={<Kalender />} />
                <Route path="/statistiken" element={<Statistiken />} />
                <Route path="/nachrichten" element={<Nachrichten />} />
                <Route path="/fangberichte" element={<Fangberichte />} />
                <Route path="/mitgliedermenu" element={<Mitgliedermenu />} />
                <Route path="/dbstatus" element={<DatabaseStatus />} />
            </Routes>
        </Router>

    );
};

export default App;