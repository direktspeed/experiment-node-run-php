<?php
  //parse the command line into the $_GET variable
  if ( isset($_SERVER) && array_key_exists('QUERY_STRING', $_SERVER) ) {
    parse_str($_SERVER['QUERY_STRING'], $_GET);
  }
  
  // For 4.3.0 <= PHP <= 5.4.0
  if (!function_exists('http_response_code'))
  {
      function http_response_code($newcode = NULL)
      {
          static $code = 200;
          if($newcode !== NULL)
          {
              header('X-PHP-Response-Code: '.$newcode, true, $newcode);
              if(!headers_sent())
                  $code = $newcode;
          }       
          return $code;
      }
  }
  //parse the standard input into the $_POST variable
  if (($_SERVER['REQUEST_METHOD'] === 'POST')
   && ($_SERVER['CONTENT_LENGTH'] > 0))
  {
    parse_str(fread(STDIN, $_SERVER['CONTENT_LENGTH']), $_POST);
  }
  chdir($argv[1]);
  require_once $argv[2];