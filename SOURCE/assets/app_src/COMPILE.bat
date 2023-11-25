REM if you run this file from another drive, add this:
REM echo -- SWITCH TO WORK DIRECTORY H --
REM cd /D H:

call %~dp0/dojo/util/buildscripts/build --profile %~dp0/project.profile.js

rd "%~dp0/../app_build" /q /s
del "%~dp0/../app/App.js" /q

echo ALL DONE!