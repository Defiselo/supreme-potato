<?php
return function (Router $r, Responder $out, array $d): void {
    $s = $d['stats'];
    $year = fn($u) => isset($u[3]) ? intval($u[3]) : 0;

    $r->add('GET', 'stats/invitations', fn($u) => $out->json($s->getInvitations(1, $year($u))));

    $yearly = [
        'cvcount'           => 'getCvCount',
        'practices'         => 'getAllPractices',
        'getAllWSs'         => 'getAllWSs',
        'getAllGifts'       => 'getAllGifts',
        'getAllMeets'       => 'getAllMeets',
        'getTopCompanies'   => 'getTopCompanies',
        'getAllNotActivity' => 'getAllNotActivity',
    ];
    foreach ($yearly as $path => $method) {
        $r->add('GET', "stats/$path", fn($u) => $out->json($s->$method($year($u))));
    }

    foreach (['getStatBySYears', 'getAllCVInvitations', 'getFirmStats', 'export'] as $method) {
        $r->add('GET', "stats/$method", fn() => $out->json($s->$method()));
    }

    $r->add('GET', 'stats', fn() => $out->json($s->getAll())); // musí být až po konkrétních
};
