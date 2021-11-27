<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

final class TestPost extends TestCase {
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
    }

    /**
     * @depends testCreateGuzzleClient
     */
    public function testDB($client) {
        $response = $client->get('ssys/backend/modules/mysqltest.php');
        $status = $response->getStatusCode();
        $this->assertTrue($status == 200);
    }

}

?>