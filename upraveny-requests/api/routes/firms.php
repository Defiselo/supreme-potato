<?php
return function (Router $r, Responder $out, array $d): void {
    $f = $d['firms'];

    $r->add('GET', 'checkfirmExist', fn($u) => $out->json($f->checkIfFirmExist($u[2])));

    $r->add('GET', '*/list/filter',    fn()   => $out->json($f->getFirmsFilter($_GET)));
    $r->add('GET', '*/list',           fn()   => $out->json($f->getFirms()));
    $r->add('GET', '*/getFirmsNotCont', fn()  => $out->json($f->getFirmsNotCont()));
    $r->add('GET', '*/form', fn($u) => $out->json(
        isset($u[3]) ? $f->getFirmAndForm($u[3]) : $f->getFirmForm()
    ));

    $r->add('GET', 'firm/contactsList', fn()   => $out->json($f->contactsList()));
    $r->add('GET', 'firm',              fn($u) => $out->json($f->getFirm($u[2])));

    $r->add('GET', 'columnsFilter', fn() => $out->json($f->getColmVisibilityFilter()));
    $r->add('GET', 'columns',       fn() => $out->json($f->getColmVisibility()));
    $r->add('GET', 'columnsList',   fn() => $out->json($f->getColms()));

    $r->add('POST',   'firms',   fn($u, $in) => $out->json($f->insert($in)));
    $r->add('POST',   'columns', fn($u, $in) => $out->json($f->saveColmVisibility($in)));
    $r->add('POST',   'column',  fn($u, $in) => $out->json($f->addColm($in["name"], $in["type"])));

    $r->add('PUT',    'firms',  fn($u, $in) => $out->json($f->updateFirm($in)));
    $r->add('PUT',    'column', fn($u, $in) => $out->json($f->updateColmn($in)));

    $r->add('DELETE', 'firms',  fn($u) => $out->json($f->delete($u[2])));
    $r->add('DELETE', 'column', fn($u) => $out->json($f->deleteColmn($u[2])));
};
