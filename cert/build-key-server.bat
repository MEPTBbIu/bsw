@echo on
cd %HOME%
rem build a request for a cert that will be valid for ten years
openssl req -days 3650 -nodes -new -keyout %KEY_DIR%\%1.key -out %KEY_DIR%\%1.csr -config %KEY_CONFIG%
rem sign the cert request with our ca, creating a cert/key pair
openssl ca -policy policy_anything -days 3650 -out %KEY_DIR%\%1.cer -in %KEY_DIR%\iis-xo.bsw.sale.txt -extensions server -config %KEY_CONFIG%
rem delete any .old files created in this process, to avoid future file creation errors
rem del /q %KEY_DIR%\*.old
rem openssl ca -policy policy_anything -config %KEY_CONFIG% -cert %KEY_DIR%\ca.crt -in %KEY_DIR%\iis-xo.bsw.sale.txt -keyfile %KEY_DIR%\ca.key -days 3650 -out %KEY_DIR%\%1.cer -extensions server
