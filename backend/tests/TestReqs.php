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
        return $client;
    }

    /**
     * @depends testCreateGuzzleClient
     */
    public function testGET($client) {
        $response = $client->get('ssys/backend/api/test.php');
        $status = $response->getStatusCode();
        $this->assertTrue($status ==200);
        $body = $response->getBody();
        $stringBody = (string) $body;
        // Read the remaining contents of the body as a string
        $remainingBytes = $body->getContents();
        json_decode($stringBody);
        fwrite(STDERR, print_r($stringBody, TRUE));
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
        fwrite(STDERR, print_r($stringBody, TRUE));

    }

}

?>