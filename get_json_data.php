<?php
// Allow CORS for specific origin (your frontend's URL)
header('Access-Control-Allow-Origin: http://localhost:5173'); // Replace with your frontend URL
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// If it's a preflight request (OPTIONS), we just respond with 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

// Path to the directory where JSON files are stored
$directory = './ArticleData/';  // Adjust the path to your article files

// Get all JSON files from the directory
$jsonFiles = glob($directory . '/*.json');

// Initialize an empty array to hold the article data
$articles = [];

// Loop through each JSON file
foreach ($jsonFiles as $jsonFile) {
    // Read the file contents
    $fileContents = file_get_contents($jsonFile);

    // Decode the JSON content into a PHP array
    $articleData = json_decode($fileContents, true);

    // Check if the data is valid
    if ($articleData) {
        // Safely access the keys and provide default values if missing
        $articles[] = [
            'id' => $articleData['system']['article'] ?? 'unknown', // Use 'unknown' if the ID is missing
            'title' => $articleData['Content']['title'] ?? 'Untitled', // Default to 'Untitled' if missing
            'description' => $articleData['Content']['description'] ?? 'No description available', // Default description
            'content' => $articleData['Content']['content'] ?? '', // Default empty content if missing
            'imageUrl' => $articleData['Content']['imageUrl'] ?? '/default-image.png', // Default image if missing
            'imageAlt' => $articleData['Content']['imageAlt'] ?? 'Image not available', // Default alt text if missing
            'date' => $articleData['Metadata']['date'] ?? 'Unknown date', // Default date if missing
            'author' => $articleData['Metadata']['author'] ?? 'Unknown author', // Default author if missing
            'articleUrl' => '/articles/' . ($articleData['system']['article'] ?? 'unknown'), // Default article URL
        ];
    }
}

// Return the articles as a JSON array
echo json_encode($articles);
?>
