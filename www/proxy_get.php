<? 
//header('Content-type: application/xml');

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

$headers = apache_request_headers();
$curl_array_headers = array();
foreach ($headers as $name => $value)
{
	if ($name == "Host") continue;
	$curl_array_headers [] = "$name : $value";
}
curl_setopt($ch,CURLOPT_HTTPHEADER,$curl_array_headers);

//echo $url . "?$fields_string";
curl_setopt($ch,CURLOPT_URL,$url . "?" . str_replace ( ' ', '+',$fields_string));
//curl_setopt($ch, CURLOPT_VERBOSE, 1);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch,CURLOPT_HTTP_VERSION,1);
//execute GET
$result = curl_exec($ch);

//print_r(curl_getinfo($ch));
//close connection
curl_close($ch);





