@echo off
SETLOCAL

call install-node

node -v
npm -v

rem %node% %*