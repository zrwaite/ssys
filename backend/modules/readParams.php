<?php
function getBody($param){
	if (isset($_POST[$param])) return htmlspecialchars(stripslashes(trim($_POST[$param])));
	else return false;
}
function getQuery($param){
	if (isset($_GET[$param])) return htmlspecialchars(stripslashes(trim($_GET[$param])));
	else return false;
}
?>