<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

final class TestReqs extends TestCase {
    public function testCreateGuzzleClient() {
        $client = new Client([
            'base_uri' => 'http://localhost',
            'timeout'  => 5.0,
            'exceptions' => false
        ]);
        $response = $client->get('http://httpbin.org/get');
        $status = $response->getStatusCode();
        $this->assertTrue($status ==200);
        $response = $client->post('http://httpbin.org/post', 
            array('headers' => ['Content-Type' => 'application/json']), 
            '{"email": "hello"}');
        $status = $response->getStatusCode();
        $body = $response->getBody();
        $json = json_decode((string) $body);
        fwrite(STDERR, print_r($json, TRUE));
        return $client;
    }

    /**
     * @depends testCreateGuzzleClient
     */
    public function testGET($client) {
        $response = $client->get('ssys/backend/api/test.php?var1=test1&var2=test2');
        $status = $response->getStatusCode();
        $body = $response->getBody();
        $json = json_decode((string) $body);
        $this->assertTrue($status==200);
        $this->assertTrue(count($json->errors)==0);
        $this->assertTrue($json->objects == "test1test2");
        // fwrite(STDERR, print_r($stringBody, TRUE));
    }

    /**
     * @depends testCreateGuzzleClient
     */
    public function testStudentPost($client) {
        $response = $client->post('ssys/backend/api/student/', array(), array(
            'email' => 'superzrw@gmail.com'
        ));
        // $response = $request->send();
        $status = $response->getStatusCode();
        $body = $response->getBody();
        $json = json_decode((string) $body);
        $this->assertTrue($status==200);
        // $this->assertTrue(count($json->errors)==0);
        // $this->assertTrue($json->objects == "test1test2");

        fwrite(STDERR, print_r($json, TRUE));

    }

    /**
     * @depends testCreateGuzzleClient
     */
    public function testDB($client) {
        $response = $client->get('ssys/backend/modules/mysqltest.php');
        $status = $response->getStatusCode();
        $this->assertTrue($status == 200);
        $body = $response->getBody();
        $stringBody = (string) $body;
        // fwrite(STDERR, print_r($stringBody, TRUE));
    }

}