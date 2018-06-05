@echo off

SET tool=%~1
SET url=%~2
set extension=%~3
SET version=%~4
SET relativePath=%~5

if "%extension%"=="" (
    SET extension=exe 
)

if "%tool%"=="" (
    echo "Tool name not set"
    EXIT /B 0
)

if "%url%"=="" (
    echo "Tool Url not set"
    EXIT /B 0
)

set toolDir=%LocalAppData%\batch-%tool%-%version%

SET downloadLocation=%LocalAppData%\batch-downloads\%tool%-%version%
SET downloadFile=%downloadLocation%\%tool%.%extension%
set toolLocation=%toolDir%\%relativePath%%tool%


echo Using %tool%-%version%

IF NOT EXIST %downloadFile% (
    echo Downloading %url%
    IF NOT EXIST %downloadLocation% md %downloadLocation% 
    @powershell -NoProfile -ExecutionPolicy unrestricted -Command "$ProgressPreference = 'Continue';[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest '%url%' -OutFile '%downloadFile%'"
)

if not exist "C:\Program Files (x86)\7-Zip" (
	if not exist "C:\Program Files\7-Zip" (
		echo Missing 7zip please install 7zip
		EXIT /B 1
	)
	set zip="C:\Program Files\7-Zip\7z.exe"
) 
if exist "C:\Program Files (x86)\7-Zip" (
	set zip="C:\Program Files (x86)\7-Zip\7z.exe"
)


IF "%extension%"=="tgz" GOTO exctract
IF "%extension%"=="tar" GOTO exctract
IF "%extension%"=="zip" GOTO exctract
IF "%extension%"=="rar" GOTO exctract 
IF "%extension%"=="7z" GOTO exctract 

IF NOT EXIST %toolDir% (
	cp %downloadFile% %toolDir%
)
goto end-extract
:exctract


IF NOT EXIST %toolDir% (
	if "%extension%"=="tgz" (
		%zip% x %downloadFile% -o%downloadLocation% -y
		%zip% x %downloadLocation%\%tool%.tar -o%toolDir% -y
		goto end-extract
	)
	%zip% x %downloadFile% -o%toolDir% -y
	goto end-extract
)
:end-extract

set path=%toolDir%\%relativePath%;%path%
set %tool%=%toolLocation%


EXIT /B 0