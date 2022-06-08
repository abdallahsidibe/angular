<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


 $method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}


if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed',
    ]);
    exit;
endif;

require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));


if (!isset($data->id)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Arti id.']);
    exit;
}

try {

    $fetch_post = "SELECT * FROM `article` WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $title = isset($data->title) ? $data->title : $row['title'];
        $description = isset($data->description) ? $data->description : $row['description'];
        $published = isset($data->published) ? $data->published : $row['published'];

        

       $update_query = "UPDATE `article` SET title = :title, description = :description, published = :published
        WHERE id = :id";

        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':title', htmlspecialchars(strip_tags($title)), PDO::PARAM_STR);
        $update_stmt->bindValue(':description', htmlspecialchars(strip_tags($description)), PDO::PARAM_STR);
        $update_stmt->bindValue(':published', htmlspecialchars(strip_tags($published)), PDO::PARAM_STR);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record udated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}