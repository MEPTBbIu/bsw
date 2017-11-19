REM cmd /K "cd %~dp0" && ".\node_modules\.bin\webpack --config .\webpack.config.js --colors --watch" %*
cmd /C %~dp0node_modules\.bin\webpack --config webpack.config.js --progress --debug --watch --colors --env.sourceMap --watch --watch-aggregate-timeout 100 %*






