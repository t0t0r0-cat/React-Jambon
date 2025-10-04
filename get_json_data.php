<?php
header('Content-Type: application/json');

// Read the JSON file content into $jsonData
$jsonData = file_get_contents('dist/ArticleData/article1.json');

// Decode the JSON data into an associative array
$dataArray = json_decode($jsonData, true);

// Directly use the value from the JSON structure
$title = $dataArray['Content']['title'];

// Prepare the response array with the title from the JSON
$response = ['title' => $title];

// Encode and return the response as JSON
echo json_encode($response);
?>
