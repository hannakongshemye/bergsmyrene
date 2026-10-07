#!/usr/bin/env bash
# Bygger forhandsvisningen og publiserer den til gh-pages-grenen.
# Siden havner pa https://hannakongshemye.github.io/bergsmyrene/
# Produksjonsbygget for bergsmyrene.no er urort, det bruker ikke PAGES.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist
PAGES=1 npm run build
touch dist/.nojekyll   # uten denne ignorerer GitHub Pages _astro-mappa

rm -rf .preview
git worktree prune
git worktree add -B gh-pages .preview >/dev/null 2>&1 || git worktree add .preview gh-pages
rm -rf .preview/*
cp -R dist/. .preview/
cd .preview
git add -A
git -c user.email=kongshemhanna@gmail.com -c user.name="Hanna Kongshem" \
  commit -q -m "Forhandsvisning bygget $(date +%Y-%m-%d\ %H:%M)" || echo "ingen endringer"
git -c credential.helper= -c credential.helper=store push -f origin gh-pages
cd ..
git worktree remove .preview --force

echo "Publisert: https://hannakongshemye.github.io/bergsmyrene/"
