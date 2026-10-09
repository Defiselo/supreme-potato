<?php
return function (Router $r, Responder $out, array $d): void {
    $cv = $d['cvInvitations'];
    $r->add('GET',  'cvinvitations', fn($u)      => $out->json($cv->getcvIvnvitatios($u[2])));
    $r->add('POST', 'cvinvitations', fn($u, $in) => $out->json($cv->save($in)));

    $crud = ['workshops' => 'getworkshops', 'meets' => 'getMeets', 'gifts' => 'getgifts'];
    foreach ($crud as $path => $getter) {
        $o = $d[$path];
        $r->add('GET',    $path, fn($u)      => $out->json($o->$getter($u[2])));
        $r->add('POST',   $path, fn($u, $in) => $out->json($o->insert($in)));
        $r->add('PUT',    $path, fn($u, $in) => $out->json($o->update($in)));
        $r->add('DELETE', $path, fn($u)      => $out->json($o->delete($u[2])));
    }

    $p = $d['practices'];
    $r->add('GET',    'practices', fn($u)      => $out->json($p->getpractices($u[2] ?? 0)));
    $r->add('POST',   'practices', fn($u, $in) => $out->json($p->save($in)));
    $r->add('DELETE', 'practices', fn($u)      => $out->json($p->delete($u[2])));
};
