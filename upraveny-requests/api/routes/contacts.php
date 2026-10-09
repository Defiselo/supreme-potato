<?php
return function (Router $r, Responder $out, array $d): void {
    $c = $d['contacts'];

    $r->add('GET', 'contacts/search', fn($u) => $out->json($c->search($u[3])));
    $r->add('GET', 'contacts/exportVcf', function ($u, $in) use ($d) {
        $exporter = new ContactVcfExporter($d['conn']);
        $exporter->export($in);
        exit;
    });
    $r->add('GET', 'contacts', fn($u) => $out->json($c->getFirmContacts($u[2])));

    $r->add('POST',   'contacts', fn($u, $in) => $out->json($c->insertContacts($in)));
    $r->add('PUT',    'contacts', fn($u, $in) => $out->json($c->updateContacts($in)));
    $r->add('DELETE', 'contacts', fn($u)      => $out->json($c->deleteContact($u[2])));
};
