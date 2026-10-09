<?php
return function (Router $r, Responder $out, array $d): void {
    $e = $d['events'];

    $r->add('GET', 'event/{id}',            fn($u) => $out->json($e->getevent($u[2])));
    $r->add('GET', 'events/generateICS',    fn($u) => $e->generateICS($u[3]));
    $r->add('GET', 'events/getFutureEvents', fn()  => $out->json($e->getFutureEvents()));
    $r->add('GET', 'events',                fn($u) => $out->json($e->getEvents($u[2] ?? null)));

    $r->add('POST',   'events', fn($u, $in) => $out->json($e->insert($in)));
    $r->add('PUT',    'events', fn($u, $in) => $out->json($e->update($in)));
    $r->add('DELETE', 'events', fn($u)      => $out->json($e->delete($u[2])));
};
