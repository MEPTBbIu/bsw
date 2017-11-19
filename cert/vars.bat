@echo on
rem Edit this variable to point to
rem the openssl.cnf file included
rem with easy-rsa.

set HOME=E:\.prj\lo\BSWClientApp\cert\
set KEY_CONFIG=openssl-1.0.0.cnf

rem Edit this variable to point to
rem your soon-to-be-created key
rem directory.
rem
rem WARNING: clean-all will do
rem a rm -rf on this directory
rem so make sure you define
rem it correctly!
set KEY_DIR=keys

rem Increase this if you
rem are paranoid.  This will slow
rem down TLS negotiation performance
rem as well as the one-time DH parms
rem generation process.
set DH_KEY_SIZE=2048

rem Private key size
set KEY_SIZE=4096

rem These are the default values for fields
rem which will be placed in the certificate.
rem Change these to reflect your site.
rem Don't leave any of these parms blank.

set KEY_COUNTRY=RU
set KEY_PROVINCE=
set KEY_CITY=Moscow
set KEY_ORG=BLACK STAR RUSSIA
set KEY_EMAIL=info@blackstarwear.ru
set KEY_CN=xo.bsw.sale
set KEY_NAME=xo.bsw.sale
set KEY_OU=BLACK STAR WEAR
set PKCS11_MODULE_PATH=changeme
set PKCS11_PIN=changeme