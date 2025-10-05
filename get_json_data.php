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
        // Determine image URL: some files put it in Content, others in Metadata
        $imageUrl = $articleData['Content']['imageUrl'] ?? $articleData['Metadata']['imageUrl'] ?? $articleData['Content']['image'] ?? '/default-image.png';

        // Normalize the image path:
        // - remove leading './'
        // - ensure it has a leading '/' if it's a site-root relative path
        if (strpos($imageUrl, './') === 0) {
            $imageUrl = substr($imageUrl, 1);
        }
        if (!preg_match('#^(https?:)?//#', $imageUrl) && strpos($imageUrl, '/') !== 0) {
            $imageUrl = '/' . ltrim($imageUrl, '/');
        }

        // Build article URL safely: JSON sometimes already stores '/articles/...' in system.article
        $articlePath = '/articles/unknown';
        if (!empty($articleData['system']['article'])) {
            $raw = $articleData['system']['article'];
            // If the stored value already starts with /articles, keep it; otherwise prefix
            if (strpos($raw, '/articles') === 0) {
                $articlePath = $raw;
            } else {
                $articlePath = '/articles/' . ltrim($raw, '/');
            }
        }

        // Safely access other keys and provide default values if missing
        $articles[] = [
            'id' => $articleData['system']['article'] ?? $articleData['system']['id'] ?? 'unknown',
            'title' => $articleData['Content']['title'] ?? 'Sans Titre',
            'description' => $articleData['Content']['description'] ?? 'Aucune Description',
            'content' => $articleData['Content']['content'] ?? 'Cet article n\'a pas de contenu',
            'imageUrl' => $imageUrl,
            'imageAlt' => $articleData['Content']['imageAlt'] ?? $articleData['Metadata']['imageAlt'] ?? 'Image non disponible',
            'date' => $articleData['Metadata']['date'] ?? 'Date inconnue',
            'author' => $articleData['Metadata']['author'] ?? 'Inconnue/anonyme',
            'articleUrl' => $articlePath,
        ];
    }
}

// Return the articles as a JSON array
echo json_encode($articles);
?>
