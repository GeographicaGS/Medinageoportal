<? 
header('Content-type: application/xml');

//set GET variables
$url = $_GET['url'];
unset($_GET['url']);

$fields_string = "";
//url-ify the data for the GET
foreach($_GET as $key=>$value) 
{
	$fields_string .= $key.'='.$value.'&';
}

$fields_string = rtrim($fields_string,'&');
//open connection
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url . "?" . str_replace ( ' ', '+',$fields_string));
//execute GET
$result = curl_exec($ch);

//close connection
curl_close($ch);





