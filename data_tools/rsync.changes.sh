#!/bin/bash

rsync -avz -e "ssh" --progress data/nador/output/data/ USER@SERVER:PATH_DATA

rsync -avz -e "ssh" --progress data/nador/output/*.map  USER@SERVER:PATH_MAPFILES

