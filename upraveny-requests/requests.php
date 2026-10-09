<?php
require_once "helper.php";
require_once 'firms/firms.php';
require 'firms/contacts.php';
require 'firms/workshops.php';
require 'firms/stats.php';
require 'firms/meets.php';
require 'firms/gifts.php';
require 'firms/events.php';
require 'firms/campaign.php';
require 'firms/practice.php';
require 'firms/cvinvitations.php';
require_once "firms/ContactVcfExporter.php";
require_once __DIR__ . '/api/Router.php';
require_once __DIR__ . '/api/Responder.php';

class requests
{
    public function __construct($conn)
    {
        $d = [
            'conn'          => $conn,
            'firms'         => new firms($conn),
            'contacts'      => new contacts($conn),
            'workshops'     => new workshops($conn),
            'stats'         => new stats($conn),
            'meets'         => new meets($conn),
            'gifts'         => new gifts($conn),
            'events'        => new events($conn),
            'campaigns'     => new campaigns($conn),
            'practices'     => new practices($conn),
            'cvInvitations' => new cvInvitations($conn),
        ];

        $uri = $this->uri();
        $this->debugSession($uri);

        $out = new Responder();
        $router = new Router();

        foreach (['user', 'campaigns', 'events', 'contacts', 'firms', 'stats', 'other'] as $name) {
            (require __DIR__ . "/api/routes/$name.php")($router, $out, $d);
        }

        $method = $_SERVER["REQUEST_METHOD"];
        if (!in_array($method, ['GET', 'POST', 'PUT', 'DELETE'], true)) {
            $out->json("err");
            return;
        }

        $input = json_decode(file_get_contents('php://input'), true);
        $router->dispatch($method, $uri, $input);
    }

    private function uri(): array
    {
        $url = $_SERVER['REQUEST_URI'];
        $url = str_replace("/rest.php", "", $url);
        $url = str_replace("/v3", "", $url);
        $url = str_replace("//", "/", $url);
        return explode('/', $url);
    }

    private function debugSession(array $uri): void
    {
        if (isset($uri[1]) && $uri[1] === 'session') {
            print_r($_SESSION);
            print_r($_COOKIE);
            exit;
        }
    }
}
