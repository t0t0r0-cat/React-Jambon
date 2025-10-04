import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Assuming your PHP script is running on localhost at /api/getUser.php
    fetch('http://localhost:8000/get_json_data.php')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {userData ? (
        <h1>Welcome, {userData.userName}</h1>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
