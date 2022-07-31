<?php

    function fileToPhp($file_name) {
        $json_obj = file_get_contents($file_name) or die('Unable to read ' . $file_name);
        return json_decode($json_obj, true);
    }

    function phpToFile($file_name, $php_obj) {
        $json_text = json_encode($php_obj);
        file_put_contents($file_name, $json_text) or die('Unable to write in ' . $file_name);
    }

    function addUserData($php_obj, $name, $time) {
        $user = ['name' => $name, 'time' => $time];
        array_push($php_obj, $user);
        return $php_obj;
    }

    function sortRanking($php_obj) {
        usort($php_obj, function ($a, $b) {
            return $a['time'] <=> $b['time'];
        });
        return $php_obj;
    }

    $file_name = '../ranking.json';
    $user_cookie = 'user_name';
    $time_cookie = 'total_time';
    $max_ranking = 6;

    if (isset($_COOKIE[$user_cookie]) and isset($_COOKIE[$time_cookie])) {
        $user_name = $_COOKIE[$user_cookie];
        $user_time = $_COOKIE[$time_cookie];
        if (! empty($user_name) and ! empty($user_time)) {
            $ranking = fileToPhp($file_name);
            $ranking = addUserData($ranking, $user_name, $user_time);
            $ranking = sortRanking($ranking);
            $ranking = array_slice($ranking, 0, $max_ranking);
            phpToFile($file_name, $ranking);
        }
    }

    header('Location: /html/ranking.html'); // redirect back to html

?>