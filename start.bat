@echo off
chcp 65001 >nul
title Code Combat Edu - Servidor de Avaliacao
echo ========================================================
echo   CASTELO DO CODIGO - CODE COMBAT EDU (AVALIACAO)
echo ========================================================
echo.
echo Abrindo o navegador em http://127.0.0.1:5000...
start http://127.0.0.1:5000
echo Iniciando o servidor local...
echo Para encerrar, basta fechar esta janela.
echo.

REM Tenta usar py ou python
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    py server.py
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
    goto end
)

REM Caminho direto conhecido no sistema
if exist "%LOCALAPPDATA%\Programs\Python\Python314\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python314\python.exe" server.py
    goto end
)

echo [ERRO] Python nao foi encontrado no PATH.
pause

:end
