# -*- coding: utf-8 -*-

import os
import json
import re
import sys
import netCDF_translate
from datetime import datetime, timedelta
from json import config

numbers = re.compile(r'(\d+)')
def numericalSort(value):
    parts = numbers.split(value)
    parts[1::2] = map(int, parts[1::2])
    return parts

def main(argv):
	if len(argv) >= 2:
		if argv[1] == "true":
			netCDF_translate.batchProcess(config["path_origen"]);

		date = datetime.strptime(config["fecha"], "%d/%m/%Y")
		file = open(config["fichero_destino"], "w")
		file.write('MAP\n' \
					'NAME			Nador\n' \
					'IMAGETYPE      PNG24\n' \
					'EXTENT         -39.8 1.3 59.4 78.5\n' \
					'SIZE           4000 4000\n' \
					'MAXSIZE		 10000\n' \
					'IMAGECOLOR		255 255 255\n' \
					'SHAPEPATH      "' + config["path_images"] + '"\n' \
					'FONTSET        "fonts/fonts.list"\n\n'

					'CONFIG "MS_ERRORFILE" "tmp/ms_error.txt"\n' \
					'DEBUG	5\n\n' \
					'CONFIG "PROJ_DEBUG" "ON"\n' \
					'CONFIG "CPL_DEBUG" "ON"\n' \
					'OUTPUTFORMAT\n' \
				    '    NAME AGG\n' \
				    '    DRIVER "AGG/PNG"\n' \
				    '    MIMETYPE "image/png"\n' \
				    '    IMAGEMODE RGBA\n' \
				    'END\n\n' \
				   'OUTPUTFORMAT\n' \
				    '    NAME AGG\n' \
				    '    DRIVER "AGG/PNG"\n' \
				    '    MIMETYPE "image/jpeg"\n' \
				    '    IMAGEMODE RGBA\n' \

				    'END\n\n' \
			  		'PROJECTION\n\n' \
			    	'	"init=epsg:3857"\n\n' \
			  		 'END\n\n' \
			 		 'WEB\n' \
			 		 	'IMAGEPATH "tmp/"\n' \
						'IMAGEURL  "/tmp/"\n' \
						'METADATA\n' \
						'		"wms_title"					"Medina E-Infraestructure WMS"\n' \
						'		"wms_abstract"				"Medina project"\n' \
						'		"wms_onlineresource"		"http://www.medinageoportal.eu/cgi-bin/nador"\n' \
						'		"wms_srs" 					"EPSG:4326 EPSG:3857"\n' \
						'		"wms_format"				"image/png"\n' \
						'		"wms_feature_info_mime_type" "text/html"\n' \
						'		"wms_encoding" "iso-8859-1"\n' \
						'		"wms_extent" "-11.27 27.83 39.18 47.50"\n' \
						'		"wms_enable_request" "GetMap GetFeatureInfo GetCapabilities"\n' \
						'END\n' \
					'END\n\n' \
					)

		for layer in config["layers"]:
			for base, dirs, files in os.walk(config["path_origen"] + layer["name"]):
				for tif in sorted(files,key=numericalSort):
					if "_" in tif:
						dateAux = date + timedelta(days=int(tif.split("_", 1)[1].replace(".tif",""))-1)
						dateAux = dateAux.strftime("%Y-%m-%d").replace("-","_")
						file.write('LAYER\n' \
									'NAME         ' + layer["name"] + '_' + dateAux + '\n' \
									'DATA         "'+ tif + '"\n' \
									'STATUS       ON\n' \
									'EXTENT       -11.27	27.83 39.18	47.50\n' \
									'TYPE         RASTER\n' \
									'TEMPLATE	"../mapserverdata/html/info.html"\n' \
									'DUMP TRUE\n' \
									'METADATA\n' \
									'	"wms_title"					"' + layer["title"] + ' ' + dateAux + '"\n' \
									'	"wms_abstract"				"' + layer["abs"] + ' ' + dateAux + '"\n' \
									'	"wms_srs" "EPSG:4326"\n' \
									'	"wms_format"			"image/png"\n' \
									'	"ows_enable_request" "*"\n' \
									'	"wms_extent" "-11.27 27.83 39.18 47.50"\n' \
									'	"gml_include_items" "all"\n' \
									'	"gml_featureid"	"gid"\n' \
									'	"ows_include_items" "all"\n' \
									'	"wms_include_items"	"all"\n' \
									'	"wms_feature_info_mime_type"  "text/html"\n' \
									'END\n' \
									'PROJECTION\n' \
									'	"init=epsg:4326"\n' \
									'END\n' \
									'CLASSITEM	"Banda 1"\n' \
									)
						for clase in layer["class"]:
							file.write('CLASS\n' \
										'	NAME "' + clase["name"] +'"\n' \
										'	EXPRESSION '+ clase["expr"] +'\n' \
										'	STYLE\n' \
										'		COLOR	'+ clase["color"] +'\n' \
										'	END\n' \
										'END\n' \
										)

						file.write('END\n')
		file.write('END\n')
		print("OK");
	else:
		print("Especifique con un parámetro true o false si desea generar los .tif")


if __name__ == "__main__":
    main(sys.argv)
				