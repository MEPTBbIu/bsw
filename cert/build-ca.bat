rem @echo off
cd %HOME%
rem build a cert authority valid for ten years, starting now
openssl.exe req -days 3650 -nodes -new -x509 -keyout %KEY_DIR%\ca.key -out %KEY_DIR%\ca.crt -config %KEY_CONFIG%
