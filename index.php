<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "usuarios";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


if (isset($_GET["consultar"])){
    $sqlUsuarios = mysqli_query($conexionBD,"SELECT * FROM usuarios WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios,MYSQLI_ASSOC);
        echo json_encode($usuarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if (isset($_GET["borrar"])){
    $sqlUsuarios = mysqli_query($conexionBD,"DELETE FROM usuarios WHERE id=".$_GET["borrar"]);
    if($sqlUsuarios){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $cedula=$data->cedula;
    $telefono=$data->telefono;
    $mail=$data->mail;
        if(($cedula!="")&&($nombre!="")&&($telefono!="")&&($mail!="")){
            
    $sqlUsuarios = mysqli_query($conexionBD,"INSERT INTO usuarios(nombre, cedula, telefono, mail) VALUES('$nombre','$cedula','$telefono','$mail') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $cedula=$data->cedula;
    $telefono=$data->telefono;
    $mail=$data->mail;
    
    $sqlUsuarios = mysqli_query($conexionBD,"UPDATE usuarios SET nombre='$nombre',cedula='$cedula', telefono='$telefono',mail='$mail' WHERE id_usuario='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
$sqlUsuarios = mysqli_query($conexionBD,"SELECT * FROM usuarios");
if(mysqli_num_rows($sqlUsuarios) > 0){
    $usuarios = mysqli_fetch_all($sqlUsuarios,MYSQLI_ASSOC);
    echo json_encode($usuarios);
}
else{ echo json_encode([["success"=>0]]); }


?>