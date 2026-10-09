<?php
class Responder
{
    public function json($str): void
    {
        if (isset($_GET["csvexport"])) {
            $this->csv($str);
            exit;
        }

        if (!is_array($str)) {
            if ($str == "0") {
                $str = "err";
            }
            echo json_encode(array("msg" => $str));
        } else {
            echo json_encode($str);
        }
    }

    private function csv($str): void
    {
        if ($str == null) {
            return;
        }

        $fp = fopen(getcwd() . '/csvexport.csv', 'w');
        if (is_array($str)) {
            $firstRow = reset($str);
            $headers = array_merge([''], array_keys($firstRow));
            fputcsv($fp, $this->convertEncoding($headers), ';', '"', '\\');

            foreach ($str as $key => $row) {
                if (isset($row["name"])) {
                    $row["name"] = preg_replace('/\/\(kont\).*/', '', $row["name"]);
                }
                fputcsv($fp, $this->convertEncoding(array_merge([$key], $row)), ';', '"', '\\');
            }
        } else {
            fputs($fp, $str);
        }
        fclose($fp);

        header("Content-Type: text/plain; charset=Windows-1250");
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="/v3/csvexport.csv"');
        readfile(getcwd() . '/csvexport.csv');
        exit;
    }

    private function convertEncoding(array $array): array
    {
        return array_map(function ($value) {
            if ($value == null) {
                return "";
            }
            return iconv("UTF-8", "Windows-1250//IGNORE", $value);
        }, $array);
    }

    public function attachment($data): void
    {
        if (!$data || !$data["attachment"]) {
            http_response_code(404);
            echo "Soubor nenalezen";
            exit;
        }

        $filename = $data["attachment_name"];
        $filedata = $data["attachment"];

        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment; filename=\"$filename\"");
        header("Content-Length: " . strlen($filedata));

        echo $filedata;
        exit;
    }
}

function fix_encoding($data)
{
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = fix_encoding($value);
        }
    } elseif (is_string($data)) {
        return iconv('ISO-8859-2', 'UTF-8//IGNORE', $data);
    }
    return $data;
}
