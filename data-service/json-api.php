<?php
// Function to filter candidates by office
function filterCandidatesByOffice($candidates, $office) {
    $filteredCandidates = [];
    foreach ($candidates as $candidate) {
        if ($candidate['position'] === $office) {
            $filteredCandidates[] = $candidate;
        }
    }
    return $filteredCandidates;
} 

// Check if 'office' parameter is set in the query string
if (isset($_GET['office'])) {
    // Get the value of the 'office' parameter
    $selectedOffice = $_GET['office'];

    // Read the CSV file
    $csvFile = fopen('data.csv', 'r'); // Change the file path if needed

    if (($handle = fopen("data.csv", "r")) !== FALSE) { 
        $csvs = [];
        while(! feof($handle)) {
           $csvs[] = fgetcsv($handle);
        }
        $candidates = [];
        $column_names = [];
        foreach ($csvs[0] as $single_csv) {
            $column_names[] = $single_csv;
        }
    
        foreach ($csvs as $key => $csv) {
            if ($key == 0 || !$csv) {
                continue;
            }
    
            foreach ($column_names as $column_key => $column_name) {
                $candidates[$key-1][$column_name] = $csv[$column_key];
            }
    
        }
        $filteredCandidates = filterCandidatesByOffice($candidates, $selectedOffice);
        $json = json_encode($filteredCandidates);
        fclose($handle);
        
        header('Content-Type: application/json; charset=utf-8');
        header("Access-Control-Allow-Origin: *");
    
        print_r($json);
    }
} else {
    // No 'office' parameter provided in the query string
     // Read the CSV file
     $csvFile = fopen('data.csv', 'r'); // Change the file path if needed

     if (($handle = fopen("data.csv", "r")) !== FALSE) { 
         $csvs = [];
         while(! feof($handle)) {
            $csvs[] = fgetcsv($handle);
         }
         $candidates = [];
         $column_names = [];
         foreach ($csvs[0] as $single_csv) {
             $column_names[] = $single_csv;
         }
     
         foreach ($csvs as $key => $csv) {
             if ($key == 0 || !$csv) {
                 continue;
             }
     
             foreach ($column_names as $column_key => $column_name) {
                 $candidates[$key-1][$column_name] = $csv[$column_key];
             }
     
         }
        
         $json = json_encode($candidates);
         fclose($handle);
         
         header('Content-Type: application/json; charset=utf-8');
         header("Access-Control-Allow-Origin: *");
     
         print_r($json);
}
}
?>

