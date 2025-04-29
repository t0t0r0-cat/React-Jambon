import React from "react";

const bottomBar: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <>
        <nav>
            <ul>
                <li>Code sous licence GNU GPL v3. Illustrations et images © {year} Tous droits réservés.</li>
            </ul>
        </nav>
        </>
    );
};

export default bottomBar;