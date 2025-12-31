@echo off
cd "%CD%\backend"
CALL pnpm install
CALL pnpm run build
CALL pnpm run start
pause