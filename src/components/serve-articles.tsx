import { useEffect, useState } from 'react';

// Define the type for the userData object
interface UserData {
  title: string;
}

const UserProfile = () => {
  // Explicitly define the type of userData
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/get_json_data.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); // TypeScript now knows that `data` will have a `title`
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <h1>Welcome, {userData.title}</h1> // Access the title safely
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
