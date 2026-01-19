@echo off
cd "%CD%\backend"
CALL node --version
CALL npm --version
CALL npm install -g pnpm
CALL pnpm install
CALL pnpm run build
CALL pnpm run start
pause