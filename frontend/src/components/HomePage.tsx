import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/css/HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="homepage-container">
            <div className="div">
                <div className="homepage-img"></div>
                <div className="homepage-text">
                    <h5>Herzlich Willkommen</h5>
                    <p>im Mitgliederbereich des Angelsportvereins "HappFishing" e.V.</p>
                    <p>Bitte wählen Sie aus dem Menü links.</p>
                    <p>Bei Fragen wenden Sie sich bitte an den Administrator.</p>
                </div>

            </div>
        </div>
    );
};

export default HomePage;








