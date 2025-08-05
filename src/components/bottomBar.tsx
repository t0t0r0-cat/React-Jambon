import React from "react";

const bottomBar: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <>
        <nav>
            <ul>
                <li>Code sous licence<a href='https://www.gnu.org/licenses/gpl-3.0.en.html'>GNU GPL v3.</a>Illustrations et images © {year} Tous droits réservés au proprietaires.</li>
                <li>Code disponible sur<a href='https://github.com/t0t0r0-cat/React-Jambon'>github.</a></li>
            </ul>
        </nav>
        </>
    );
};

export default bottomBar;
