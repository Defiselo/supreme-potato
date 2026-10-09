<?php
return function (Router $r, Responder $out, array $d): void {
    $r->add('GET', 'user', function () use ($out) {
        if (isset($_SESSION["user"])) {
            if ($_SESSION["user"] != null) {
                $out->json(array("user" => $_SESSION["user"]));
            } else {
                $out->json(array("user" => "reader"));
            }
            return;
        }

        if (isset($_COOKIE['localhostUser'])) {
            switch ($_COOKIE['localhostUser']) {
                case 'admin':
                    $out->json(array("user" => "admin"));
                    break;
                case 'user':
                    $out->json(array("user" => "reader"));
                    break;
            }
        } else {
            $out->json(array("user" => "admin"));
        }
    });
};
