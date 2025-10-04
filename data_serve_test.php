<?php 
$jsonData = file_get_contents('dist/ArticleData/article1.json');

$dataArray = json_decode($jsonData, true);

echo "Title: " . $dataArray['Content']['title'] . "<br>";
echo "Author: " . $dataArray['Metadata']['author'] . "<br>";
?>