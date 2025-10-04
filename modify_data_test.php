<?php
$jsonData = file_get_contents('dist/ArticleData/article1.json');

$dataArray = json_decode($jsonData, true);

echo "Title: " . $dataArray['Content']['title'] . "<br>";
echo "Author: " . $dataArray['Metadata']['author'] . "<br>";

$dataArray['Content']['title'] = "Updated Article Title";

$dataArray['Content']['category'] = "Tech";


echo "Updated Title: " . $dataArray['Content']['title'] . "<br>";
echo "Category: " . $dataArray['Content']['category'] . "<br>";

$newJsonData = json_encode($dataArray, JSON_PRETTY_PRINT);

file_put_contents('dist/ArticleData/article1.json', $newJsonData);
?>