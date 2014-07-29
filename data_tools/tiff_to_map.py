# -*- coding: utf-8 -*-

import os
import json
import re
import sys
import netCDF_translate
from datetime import datetime, timedelta
from config import config
import shutil

numbers = re.compile(r'(\d+)')
def numericalSort(value):
    parts = numbers.split(value)
    parts[1::2] = map(int, parts[1::2])
    return parts

def main(argv):
	if len(argv) >= 2:

		# if argv[1] == "true":
		# 	datafolder = os.path.join(config["path_output"],"data")
		# 	if os.path.exists(datafolder):
		# 		shutil.rmtree(datafolder)
		# 	if os.path.exists(config["path_output"]):
		# 		shutil.rmtree(config["path_output"])
				
		# 	os.makedirs(config["path_output"])
		# 	os.makedirs(datafolder)
		# 	netCDF_translate.batchProcess(config["path_input"])
		
		date = datetime.strptime(config["date"], "%d/%m/%Y")
	

		for layer in config["layers"]:

			outfolder = os.path.join(config["path_output"],"data",layer["name"])
			if argv[1] == "true":
				datafolder = os.path.join(config["path_output"],"data",layer["name"])
				if os.path.exists(datafolder):
					shutil.rmtree(datafolder)
				
				os.makedirs(datafolder)
				netCDF_translate.netCDF2geotiff(in_filename=os.path.join(config["path_input"],layer["name"]+".nc"), \
						out_folder=outfolder)


			fname = os.path.join(config["path_output"],config["mapfile_output_prefix"] + layer["name"] + ".map")
			file = open(fname, "w")
			file.write('MAP\n' \
				'NAME			Nador\n' \
				'IMAGETYPE      PNG24\n' \
				'EXTENT         -39.8 1.3 59.4 78.5\n' \
				'SIZE           4000 4000\n' \
				'MAXSIZE		 10000\n' \
				'IMAGECOLOR		255 255 255\n' \
				'SHAPEPATH      "' + os.path.join(config["shapepath"],layer["name"])+ '"\n' \
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
					'		"wms_title"					"' + layer["title"] + '"\n' \
					'		"wms_abstract"				"' + layer["abs"] + '"\n' \
					'		"wms_onlineresource"		"http://www.medinageoportal.eu/cgi-bin/' + config["mapfile_output_prefix"] + layer["name"] +'" \n' \
					'		"wms_srs" 					"EPSG:4326 EPSG:3857"\n' \
					'		"wms_format"				"image/png"\n' \
					'		"wms_feature_info_mime_type" "text/html"\n' \
					'		"wms_encoding" "iso-8859-1"\n' \
					'		"wms_extent" "-11.27 27.83 39.18 47.50"\n' \
					'		"wms_enable_request" "GetMap GetFeatureInfo GetCapabilities"\n' \
					'END\n' \
				'END\n\n' \
				)

			for  root, dirs, files in os.walk(outfolder):
				for tiff in sorted(files,key=numericalSort):
					if tiff.endswith(".tiff"):
						dateAux = date + timedelta(days=int(tiff[tiff.rfind("_")+1:].replace(".tiff",""))-1)
						dateAux = dateAux.strftime("%Y_%m_%d")
						file.write('LAYER\n' \
									'NAME         ' + layer["name"] + '_' + dateAux + '\n' \
									'DATA         "'+ tiff + '"\n' \
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
			file.close()

		print("OK");
	else:
		print "Unknown parameters:\n %s <create_tiff (true|false)>" % sys.argv[0]


if __name__ == "__main__":
    main(sys.argv)
				