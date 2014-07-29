# -*- coding: utf-8 -*-
import os
dataPath = "/Users/alasarr/dev/Medinageoportal/data_tools/data/nador"

config = {
	"path_input": os.path.join(dataPath,"input"),
	"path_output": os.path.join(dataPath,"output"),
	"shapepath" : "data/nador",
	"mapfile_output_prefix":"nador_",
	"date":"01/01/2006",
	"layers":
	[
		{
			"name":"bacteria_biomass",
			"title":"Bacteria Biomass (mg C/m3)",
			"abs":"Bacteria Biomass in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"depth_mean_temperature",
			"title":"Depth Mean Temperature (grades centigrade)",
			"abs":"Depth Mean Temperature in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"gridded_FVCOM_file_oxygen",
			"title":"Oxygen (mmol/m3)",
			"abs":"Oxygen in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"nitrate",
			"title":"Nitrate (mmol/m3)",
			"abs":"Nitrate in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"phosphate",
			"title":"Phosphate (mmol/m3)",
			"abs":"Phosphate in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"phytoplankton_biomass_carbon",
			"title":"Phytoplankton biomass carbon (mg C/m3)",
			"abs":"Phytoplankton biomass carbon in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"zooplankton_carbon_biomass",
			"title":"Zooplankton carbon biomass (mg C/m3)",
			"abs":"Zooplankton carbon biomass in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		},
		{
			"name":"chlorophyl",
			"title":"Chlorophyl (mg C/m3)",
			"abs":"Chlorophyl in Nador",
			"class":	[
						{
							"name":"0-0.01",
							"expr":"([pixel] < 0.01)",
							"color":"112 0 144"
						},
						{
							"name":"0.01-0.02",
							"expr":"([pixel] >= 0.01 AND [pixel] < 0.02)",
							"color":"82 0 174"
						},
						{
							"name":"0.02-0.03",
							"expr":"([pixel] >= 0.02 AND [pixel] < 0.03)",
							"color":"62 0 194"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"32 0 224"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"0 0 255"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"0 76 255"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"0 116 255"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"0 176 255"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"0 216 255"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"0 255 231"
						},
						{
							"name":"0.10-0.12",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.12)",
							"color":"0 255 87"
						},
						{
							"name":"0.12-0.14",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.14)",
							"color":"0 255 0"
						},
						{
							"name":"0.14-0.16",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.16)",
							"color":"87 255 0"
						},
						{
							"name":"0.16-0.18",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.18)",
							"color":"111 255 0"
						},
						{
							"name":"0.18-0.20",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.20)",
							"color":"135 255 0"
						},
						{
							"name":"0.20-0.25",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.25)",
							"color":"159 255 0"
						},
						{
							"name":"0.25-0.30",
							"expr":"([pixel] >= 0.25 AND [pixel] < 0.30)",
							"color":"207 255 0"
						},
						{
							"name":"0.30-0.35",
							"expr":"([pixel] >= 0.30 AND [pixel] < 0.35)",
							"color":"231 255 0"
						},
						{
							"name":"0.35-0.40",
							"expr":"([pixel] >= 0.35 AND [pixel] < 0.40)",
							"color":"255 255 0"
						},
						{
							"name":"0.40-0.45",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.45)",
							"color":"255 239 0"
						},
						{
							"name":"0.45-0.50",
							"expr":"([pixel] >= 0.45 AND [pixel] < 0.50)",
							"color":"255 207 0"
						},
						{
							"name":"0.50-0.60",
							"expr":"([pixel] >= 0.50 AND [pixel] < 0.60)",
							"color":"255 159 0"
						},
						{
							"name":"0.60-0.70",
							"expr":"([pixel] >= 0.60 AND [pixel] < 0.70)",
							"color":"255 159 0"
						},
						{
							"name":"0.70-0.80",
							"expr":"([pixel] >= 0.70 AND [pixel] < 0.80)",
							"color":"255 143 0"
						},
						{
							"name":"0.80-0.90",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.90)",
							"color":"255 143 0"
						},
						{
							"name":"0.90-1.00",
							"expr":"([pixel] >= 0.90 AND [pixel] < 1.00)",
							"color":"255 127 0"
						},
						{
							"name":"1.00-1.50",
							"expr":"([pixel] >= 1.00 AND [pixel] < 1.50)",
							"color":"255 79 0"
						},
						{
							"name":"1.50-2.00",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.00)",
							"color":"255 47 0"
						},
						{
							"name":"2.00-2.50",
							"expr":"([pixel] >= 2.00 AND [pixel] < 2.50)",
							"color":"255 31 0"
						},
						{
							"name":"2.50-3.00",
							"expr":"([pixel] >= 2.50 AND [pixel] < 3.00)",
							"color":"255 15 0"
						},
						{
							"name":">3.00",
							"expr":"([pixel] >= 3.00)",
							"color":"215 0 0"
						}
					]
		}
	]
}