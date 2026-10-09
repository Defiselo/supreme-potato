<?php
return function (Router $r, Responder $out, array $d): void {
    $c = $d['campaigns'];

    $r->add('GET', 'copyCampaign/{id}',            fn($u) => $out->json($c->copyCampaign($u[2])));
    $r->add('GET', 'campaignAttachment/{id}',      fn($u) => $out->attachment($c->getAttachment($u[2])));
    $r->add('GET', 'campaignExport',               fn($u) => $out->json($c->getCampaignExport($u[2] ?? 0)));
    $r->add('GET', 'campaigns/getCampaignSending', fn($u) => $out->json($c->getCampaignSending($u[3] ?? 0)));
    $r->add('GET', 'campaigns',                    fn()   => $out->json($c->getCampaigns()));
    $r->add('GET', 'getCampaignContacts/{id}',     fn($u) => $out->json($c->getCampaignContacts($u[2])));
    $r->add('GET', 'campaign/{id}',                fn($u) => $out->json($c->getCampaign($u[2])));

    $r->add('POST', 'campaigns',                   fn($u, $in) => $out->json($c->insert($in)));
    $r->add('POST', 'getCampaignSeindingExport',   fn($u, $in) => $out->json($c->getCampaignSeindingExport($u[2], $in)));
    $r->add('POST', 'campaignContacts',            fn($u, $in) => $out->json($c->campaignContactsUpdate($u[2], $in)));

    $r->add('PUT', 'campaigns',                    fn($u, $in) => $out->json($c->update($in)));

    $r->add('DELETE', 'campaignContacts',          fn($u, $in) => $out->json($c->deleteCampaignContacts($u[2], $in)));
    $r->add('DELETE', 'campaign',                  fn($u)      => $out->json($c->delete($u[2])));
};
