<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="output.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, ['Item', 'Quantity', 'Price', 'Total']);

// Example data (replace with your database data)
$data = [
    ['Pen', 10, 5, 50],
    ['Notebook', 5, 20, 100]
];

foreach($data as $row){
    fputcsv($output, $row);
}

fclose($output);
?>
