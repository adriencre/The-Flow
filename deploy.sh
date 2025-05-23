#!/bin/bash

# Compiler le projet
npm run build

# Copier le fichier .htaccess dans le dossier dist
cp .htaccess dist/

# Déployer vers OVH via git-ftp
git ftp push
