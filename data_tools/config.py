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
							"name":"< 3.06",
							"expr":"([pixel] < 3.06)",
							"color":"235 235 235"
						},
						{
							"name":"3.06-3.25",
							"expr":"([pixel] >= 3.06 AND [pixel] < 3.25)",
							"color":"234 233 235"
						},
						{
							"name":"3.25-3.55",
							"expr":"([pixel] >= 3.25 AND [pixel] < 3.55)",
							"color":"231 229 237"
						},
						{
							"name":"3.55-3.88",
							"expr":"([pixel] >= 3.55 AND [pixel] < 3.88)",
							"color":"223 218 240"
						},
						{
							"name":"3.88-4.18",
							"expr":"([pixel] >= 3.88 AND [pixel] < 4.18)",
							"color":"218 213 241"
						},
						{
							"name":"4.18-4.51",
							"expr":"([pixel] >= 4.18 AND [pixel] < 4.51)",
							"color":"213 207 242"
						},
						{
							"name":"4.51-5.10",
							"expr":"([pixel] >= 4.51 AND [pixel] < 5.10)",
							"color":"204 198 243"
						},
						{
							"name":"5.10-5.43",
							"expr":"([pixel] >= 5.10 AND [pixel] < 5.43)",
							"color":"198 194 243"
						},
						{
							"name":"5.43-5.73",
							"expr":"([pixel] >= 5.43 AND [pixel] < 5.73)",
							"color":"193 190 242"
						},
						{
							"name":"5.73-6.36",
							"expr":"([pixel] >= 5.73 AND [pixel] < 6.36)",
							"color":"182 181 240"
						},
						{
							"name":"6.36-6.65",
							"expr":"([pixel] >= 6.36 AND [pixel] < 6.65)",
							"color":"177 178 238"
						},
						{
							"name":"6.65-6.98",
							"expr":"([pixel] >= 6.65 AND [pixel] < 6.98)",
							"color":"171 174 236"
						},
						{
							"name":"6.98-7.57",
							"expr":"([pixel] >= 6.98 AND [pixel] < 7.57)",
							"color":"160 167 231"
						},
						{
							"name":"7.57-7.91",
							"expr":"([pixel] >= 7.57 AND [pixel] < 7.91)",
							"color":"154 163 228"
						},
						{
							"name":"7.91-8.20",
							"expr":"([pixel] >= 7.91 AND [pixel] < 8.20)",
							"color":"149 160 225"
						},
						{
							"name":"8.20-8.49",
							"expr":"([pixel] >= 8.20 AND [pixel] < 8.49)",
							"color":"144 157 221"
						},
						{
							"name":"8.49-8.83",
							"expr":"([pixel] >= 8.49 AND [pixel] < 8.83)",
							"color":"138 153 217"
						},
						{
							"name":"8.83-9.41",
							"expr":"([pixel] >= 8.83 AND [pixel] < 9.41)",
							"color":"128 147 208"
						},
						{
							"name":"9.41-9.75",
							"expr":"([pixel] >= 9.41 AND [pixel] < 9.75)",
							"color":"123 144 203"
						},
						{
							"name":"9.75-10.04",
							"expr":"([pixel] >= 9.75 AND [pixel] < 10.04)",
							"color":"118 141 198"
						},
						{
							"name":"10.04-10.33",
							"expr":"([pixel] >= 10.04 AND [pixel] < 10.33)",
							"color":"114 138 193"
						},
						{
							"name":"10.33-10.67",
							"expr":"([pixel] >= 10.33 AND [pixel] < 10.67)",
							"color":"109 134 186"
						},
						{
							"name":"10.67-11.30",
							"expr":"([pixel] >= 10.67 AND [pixel] < 11.30)",
							"color":"100 127 174"
						},
						{
							"name":"11.30-11.59",
							"expr":"([pixel] >= 11.30 AND [pixel] < 11.59)",
							"color":"97 124 167"
						},
						{
							"name":"11.59-11.93",
							"expr":"([pixel] >= 11.59 AND [pixel] < 11.93)",
							"color":"93 120 160"
						},
						{
							"name":"11.93-12.51",
							"expr":"([pixel] >= 11.93 AND [pixel] < 12.51)",
							"color":"87 113 146"
						},
						{
							"name":"12.51-12.85",
							"expr":"([pixel] >= 12.51 AND [pixel] < 12.85)",
							"color":"84 109 138"
						},
						{
							"name":"12.85-13.14",
							"expr":"([pixel] >= 12.85 AND [pixel] < 13.14)",
							"color":"82 105 131"
						},
						{
							"name":"13.14-13.77",
							"expr":"([pixel] >= 13.14 AND [pixel] < 13.77)",
							"color":"78 97 115"
						},
						{
							"name":"13.77-14.35",
							"expr":"([pixel] >= 13.77 AND [pixel] < 14.35)",
							"color":"75 89 100"
						},
						{
							"name":"14.35-14.69",
							"expr":"([pixel] >= 14.35 AND [pixel] < 14.69)",
							"color":"74 84 91"
						},
						{
							"name":">14.69",
							"expr":"([pixel] >= 14.69)",
							"color":"74 76 78"
						}
					]
		},
		{
			"name":"depth_mean_temperature",
			"title":"Depth Mean Temperature (grades centigrade)",
			"abs":"Depth Mean Temperature in Nador",
			"class":	[
						{
							"name":"< 11.78",
							"expr":"([pixel] < 11.78)",
							"color":"0 0 255"
						},
						{
							"name":"11.78-11.98",
							"expr":"([pixel] >= 11.78 AND [pixel] < 11.98)",
							"color":"0 3 255"
						},
						{
							"name":"11.98-12.29",
							"expr":"([pixel] >= 11.98 AND [pixel] < 12.29)",
							"color":"0 15 255"
						},
						{
							"name":"12.29-12.65",
							"expr":"([pixel] >= 12.29 AND [pixel] < 12.65)",
							"color":"0 54 255"
						},
						{
							"name":"12.65-12.96",
							"expr":"([pixel] >= 12.65 AND [pixel] < 12.96)",
							"color":"0 72 255"
						},
						{
							"name":"12.96-13.32",
							"expr":"([pixel] >= 12.96 AND [pixel] < 13.32)",
							"color":"0 93 255"
						},
						{
							"name":"13.32-13.93",
							"expr":"([pixel] >= 13.32 AND [pixel] < 13.93)",
							"color":"0 129 255"
						},
						{
							"name":"13.93-14.29",
							"expr":"([pixel] >= 13.93 AND [pixel] < 14.29)",
							"color":"0 150 255"
						},
						{
							"name":"14.29-14.60",
							"expr":"([pixel] >= 14.29 AND [pixel] < 14.60)",
							"color":"0 168 255"
						},
						{
							"name":"14.60-15.27",
							"expr":"([pixel] >= 14.60 AND [pixel] < 15.27)",
							"color":"0 207 255"
						},
						{
							"name":"15.27-15.58",
							"expr":"([pixel] >= 15.27 AND [pixel] < 15.58)",
							"color":"0 225 255"
						},
						{
							"name":"15.58-15.94",
							"expr":"([pixel] >= 15.58 AND [pixel] < 15.94)",
							"color":"0 246 255"
						},
						{
							"name":"15.94-16.55",
							"expr":"([pixel] >= 15.94 AND [pixel] < 16.55)",
							"color":"27 255 228"
						},
						{
							"name":"16.55-16.91",
							"expr":"([pixel] >= 16.55 AND [pixel] < 16.91)",
							"color":"48 255 207"
						},
						{
							"name":"16.91-17.22",
							"expr":"([pixel] >= 16.91 AND [pixel] < 17.22)",
							"color":"66 255 189"
						},
						{
							"name":"17.22-17.53",
							"expr":"([pixel] >= 17.22 AND [pixel] < 17.53)",
							"color":"84 255 171"
						},
						{
							"name":"17.53-17.89",
							"expr":"([pixel] >= 17.53 AND [pixel] < 17.89)",
							"color":"105 255 150"
						},
						{
							"name":"17.89-18.50",
							"expr":"([pixel] >= 17.89 AND [pixel] < 18.50)",
							"color":"141 255 114"
						},
						{
							"name":"18.50-18.86",
							"expr":"([pixel] >= 18.50 AND [pixel] < 18.86)",
							"color":"162 255 93"
						},
						{
							"name":"18.86-19.17",
							"expr":"([pixel] >= 18.86 AND [pixel] < 19.17)",
							"color":"180 255 75"
						},
						{
							"name":"19.17-19.48",
							"expr":"([pixel] >= 19.17 AND [pixel] < 19.48)",
							"color":"198 255 57"
						},
						{
							"name":"19.48-19.84",
							"expr":"([pixel] >= 19.48 AND [pixel] < 19.84)",
							"color":"219 255 36"
						},
						{
							"name":"19.84-20.50",
							"expr":"([pixel] >= 19.84 AND [pixel] < 20.50)",
							"color":"255 252 0"
						},
						{
							"name":"20.50-20.81",
							"expr":"([pixel] >= 20.50 AND [pixel] < 20.81)",
							"color":"255 234 0"
						},
						{
							"name":"20.81-21.17",
							"expr":"([pixel] >= 20.81 AND [pixel] < 21.17)",
							"color":"255 213 0"
						},
						{
							"name":"21.17-21.79",
							"expr":"([pixel] >= 21.17 AND [pixel] < 21.79)",
							"color":"255 213 0"
						},
						{
							"name":"21.79-22.15",
							"expr":"([pixel] >= 21.79 AND [pixel] < 22.15)",
							"color":"255 156 0"
						},
						{
							"name":"22.15-22.46",
							"expr":"([pixel] >= 22.15 AND [pixel] < 22.46)",
							"color":"255 138 0"
						},
						{
							"name":"22.46-23.12",
							"expr":"([pixel] >= 22.46 AND [pixel] < 23.12)",
							"color":"255 99 0"
						},
						{
							"name":"23.12-23.74",
							"expr":"([pixel] >= 23.12 AND [pixel] < 23.74)",
							"color":"255 63 0"
						},
						{
							"name":"23.74-24.41",
							"expr":"([pixel] >= 23.74 AND [pixel] < 24.41)",
							"color":"255 42 0"
						},
						{
							"name":">24.41",
							"expr":"([pixel] >= 24.41)",
							"color":"255 12 0"
						}
					]
		},
		{
			"name":"gridded_FVCOM_file_oxygen",
			"title":"Oxygen (mmol/m3)",
			"abs":"Oxygen in Nador",
			"class":	[
						{
							"name":"< 150.79",
							"expr":"([pixel] < 150.79)",
							"color":"235 235 235"
						},
						{
							"name":"150.79-153.94",
							"expr":"([pixel] >= 150.79 AND [pixel] < 153.94)",
							"color":"235 233 233"
						},
						{
							"name":"153.94-158.66",
							"expr":"([pixel] >= 153.94 AND [pixel] < 158.66)",
							"color":"236 228 229"
						},
						{
							"name":"158.66-164.17",
							"expr":"([pixel] >= 158.66 AND [pixel] < 164.17)",
							"color":"238 214 217"
						},
						{
							"name":"164.17-168.90",
							"expr":"([pixel] >= 164.17 AND [pixel] < 168.90)",
							"color":"239 208 212"
						},
						{
							"name":"168.90-174.41",
							"expr":"([pixel] >= 168.90 AND [pixel] < 174.41)",
							"color":"239 200 207"
						},
						{
							"name":"174.41-183.86",
							"expr":"([pixel] >= 174.41 AND [pixel] < 183.86)",
							"color":"239 189 199"
						},
						{
							"name":"183.86-189.37",
							"expr":"([pixel] >= 183.86 AND [pixel] < 189.37)",
							"color":"239 182 195"
						},
						{
							"name":"189.37-194.09",
							"expr":"([pixel] >= 189.37 AND [pixel] < 194.09)",
							"color":"238 176 192"
						},
						{
							"name":"194.09-204.33",
							"expr":"([pixel] >= 194.09 AND [pixel] < 204.33)",
							"color":"235 165 185"
						},
						{
							"name":"204.33-209.06",
							"expr":"([pixel] >= 204.33 AND [pixel] < 209.06)",
							"color":"233 160 182"
						},
						{
							"name":"209.06-214.57",
							"expr":"([pixel] >= 209.06 AND [pixel] < 214.57)",
							"color":"231 154 179"
						},
						{
							"name":"214.57-224.02",
							"expr":"([pixel] >= 214.57 AND [pixel] < 224.02)",
							"color":"226 144 174"
						},
						{
							"name":"224.02-229.53",
							"expr":"([pixel] >= 224.02 AND [pixel] < 229.53)",
							"color":"223 139 171"
						},
						{
							"name":"229.53-234.25",
							"expr":"([pixel] >= 229.53 AND [pixel] < 234.25)",
							"color":"219 135 169"
						},
						{
							"name":"234.25-238.98",
							"expr":"([pixel] >= 234.25 AND [pixel] < 238.98)",
							"color":"216 131 167"
						},
						{
							"name":"238.98-244.49",
							"expr":"([pixel] >= 238.98 AND [pixel] < 244.49)",
							"color":"212 126 164"
						},
						{
							"name":"244.49-253.94",
							"expr":"([pixel] >= 244.49 AND [pixel] < 253.94)",
							"color":"203 118 159"
						},
						{
							"name":"253.94-259.45",
							"expr":"([pixel] >= 253.94 AND [pixel] < 259.45)",
							"color":"198 114 156"
						},
						{
							"name":"259.45-264.17",
							"expr":"([pixel] >= 259.45 AND [pixel] < 264.17)",
							"color":"193 111 154"
						},
						{
							"name":"264.17-268.90",
							"expr":"([pixel] >= 264.17 AND [pixel] < 268.90)",
							"color":"188 108 151"
						},
						{
							"name":"268.90-274.41",
							"expr":"([pixel] >= 268.90 AND [pixel] < 274.41)",
							"color":"182 104 148"
						},
						{
							"name":"274.41-284.65",
							"expr":"([pixel] >= 274.41 AND [pixel] < 284.65)",
							"color":"169 98 141"
						},
						{
							"name":"284.65-289.37",
							"expr":"([pixel] >= 284.65 AND [pixel] < 289.37)",
							"color":"163 96 138"
						},
						{
							"name":"289.37-294.88",
							"expr":"([pixel] >= 289.37 AND [pixel] < 294.88)",
							"color":"156 93 134"
						},
						{
							"name":"294.88-304.33",
							"expr":"([pixel] >= 294.88 AND [pixel] < 304.33)",
							"color":"143 88 126"
						},
						{
							"name":"304.33-309.84",
							"expr":"([pixel] >= 304.33 AND [pixel] < 309.84)",
							"color":"135 86 121"
						},
						{
							"name":"309.84-314.57",
							"expr":"([pixel] >= 309.84 AND [pixel] < 314.57)",
							"color":"129 84 117"
						},
						{
							"name":"314.57-324.80",
							"expr":"([pixel] >= 314.57 AND [pixel] < 324.80)",
							"color":"113 81 106"
						},
						{
							"name":"324.80-334.25",
							"expr":"([pixel] >= 324.80 AND [pixel] < 334.25)",
							"color":"99 78 95"
						},
						{
							"name":"334.25-344.49",
							"expr":"([pixel] >= 334.25 AND [pixel] < 344.49)",
							"color":"90 76 88"
						},
						{
							"name":">344.49",
							"expr":"([pixel] >= 344.49)",
							"color":"78 74 77"
						}
					]
		},
		{
			"name":"nitrate",
			"title":"Nitrate (mmol/m3)",
			"abs":"Nitrate in Nador",
			"class":	[
						{
							"name":"< 0.54",
							"expr":"([pixel] < 0.54)",
							"color":"235 235 235"
						},
						{
							"name":"0.54-0.59",
							"expr":"([pixel] >= 0.54 AND [pixel] < 0.59)",
							"color":"233 234 235"
						},
						{
							"name":"0.59-0.66",
							"expr":"([pixel] >= 0.59 AND [pixel] < 0.66)",
							"color":"229 231 236"
						},
						{
							"name":"0.66-0.74",
							"expr":"([pixel] >= 0.66 AND [pixel] < 0.74)",
							"color":"215 222 239"
						},
						{
							"name":"0.74-0.81",
							"expr":"([pixel] >= 0.74 AND [pixel] < 0.81)",
							"color":"208 218 240"
						},
						{
							"name":"0.81-0.89",
							"expr":"([pixel] >= 0.81 AND [pixel] < 0.89)",
							"color":"200 214 240"
						},
						{
							"name":"0.89-1.04",
							"expr":"([pixel] >= 0.89 AND [pixel] < 1.04)",
							"color":"187 208 239"
						},
						{
							"name":"1.04-1.12",
							"expr":"([pixel] >= 1.04 AND [pixel] < 1.12)",
							"color":"179 204 237"
						},
						{
							"name":"1.12-1.19",
							"expr":"([pixel] >= 1.12 AND [pixel] < 1.19)",
							"color":"172 202 235"
						},
						{
							"name":"1.19-1.34",
							"expr":"([pixel] >= 1.19 AND [pixel] < 1.34)",
							"color":"157 196 230"
						},
						{
							"name":"1.34-1.41",
							"expr":"([pixel] >= 1.34 AND [pixel] < 1.41)",
							"color":"150 193 227"
						},
						{
							"name":"1.41-1.50",
							"expr":"([pixel] >= 1.41 AND [pixel] < 1.50)",
							"color":"143 190 222"
						},
						{
							"name":"1.50-1.64",
							"expr":"([pixel] >= 1.50 AND [pixel] < 1.64)",
							"color":"131 185 214"
						},
						{
							"name":"1.64-1.72",
							"expr":"([pixel] >= 1.64 AND [pixel] < 1.72)",
							"color":"124 182 209"
						},
						{
							"name":"1.72-1.79",
							"expr":"([pixel] >= 1.72 AND [pixel] < 1.79)",
							"color":"118 180 204"
						},
						{
							"name":"1.79-1.86",
							"expr":"([pixel] >= 1.79 AND [pixel] < 1.86)",
							"color":"113 177 199"
						},
						{
							"name":"1.86-1.95",
							"expr":"([pixel] >= 1.86 AND [pixel] < 1.95)",
							"color":"107 174 192"
						},
						{
							"name":"1.95-2.09",
							"expr":"([pixel] >= 1.95 AND [pixel] < 2.09)",
							"color":"98 168 181"
						},
						{
							"name":"2.09-2.17",
							"expr":"([pixel] >= 2.09 AND [pixel] < 2.17)",
							"color":"93 165 174"
						},
						{
							"name":"2.17-2.24",
							"expr":"([pixel] >= 2.17 AND [pixel] < 2.24)",
							"color":"89 161 168"
						},
						{
							"name":"2.24-2.31",
							"expr":"([pixel] >= 2.24 AND [pixel] < 2.31)",
							"color":"86 158 161"
						},
						{
							"name":"2.31-2.39",
							"expr":"([pixel] >= 2.31 AND [pixel] < 2.39)",
							"color":"82 154 154"
						},
						{
							"name":"2.39-2.55",
							"expr":"([pixel] >= 2.39 AND [pixel] < 2.55)",
							"color":"76 146 140"
						},
						{
							"name":"2.55-2.62",
							"expr":"([pixel] >= 2.55 AND [pixel] < 2.62)",
							"color":"74 142 134"
						},
						{
							"name":"2.62-2.70",
							"expr":"([pixel] >= 2.62 AND [pixel] < 2.70)",
							"color":"72 137 127"
						},
						{
							"name":"2.70-2.84",
							"expr":"([pixel] >= 2.70 AND [pixel] < 2.84)",
							"color":"70 128 115"
						},
						{
							"name":"2.84-2.93",
							"expr":"([pixel] >= 2.84 AND [pixel] < 2.93)",
							"color":"69 122 109"
						},
						{
							"name":"2.93-3.00",
							"expr":"([pixel] >= 2.93 AND [pixel] < 3.00)",
							"color":"69 117 104"
						},
						{
							"name":"3.00-3.15",
							"expr":"([pixel] >= 3.00 AND [pixel] < 3.15)",
							"color":"69 105 93"
						},
						{
							"name":"3.15-3.29",
							"expr":"([pixel] >= 3.15 AND [pixel] < 3.29)",
							"color":"70 94 84"
						},
						{
							"name":"3.29-3.49",
							"expr":"([pixel] >= 3.29 AND [pixel] < 3.49)",
							"color":"71 87 80"
						},
						{
							"name":">3.49",
							"expr":"([pixel] >= 3.49)",
							"color":"73 77 75"
						}
					]
		},
		{
			"name":"phosphate",
			"title":"Phosphate (mmol/m3)",
			"abs":"Phosphate in Nador",
			"class":	[
						{
							"name":"< 0.03",
							"expr":"([pixel] < 0.03)",
							"color":"235 235 235"
						},
						{
							"name":"0.03-0.03",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.03)",
							"color":"233 234 233"
						},
						{
							"name":"0.03-0.04",
							"expr":"([pixel] >= 0.03 AND [pixel] < 0.04)",
							"color":"227 233 227"
						},
						{
							"name":"0.04-0.05",
							"expr":"([pixel] >= 0.04 AND [pixel] < 0.05)",
							"color":"212 229 207"
						},
						{
							"name":"0.05-0.05",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.05)",
							"color":"207 227 198"
						},
						{
							"name":"0.05-0.06",
							"expr":"([pixel] >= 0.05 AND [pixel] < 0.06)",
							"color":"203 223 187"
						},
						{
							"name":"0.06-0.07",
							"expr":"([pixel] >= 0.06 AND [pixel] < 0.07)",
							"color":"199 215 168"
						},
						{
							"name":"0.07-0.07",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.07)",
							"color":"199 209 158"
						},
						{
							"name":"0.07-0.08",
							"expr":"([pixel] >= 0.07 AND [pixel] < 0.08)",
							"color":"199 203 151"
						},
						{
							"name":"0.08-0.09",
							"expr":"([pixel] >= 0.08 AND [pixel] < 0.09)",
							"color":"203 190 138"
						},
						{
							"name":"0.09-0.09",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.09)",
							"color":"205 183 133"
						},
						{
							"name":"0.09-0.10",
							"expr":"([pixel] >= 0.09 AND [pixel] < 0.10)",
							"color":"207 175 129"
						},
						{
							"name":"0.10-0.11",
							"expr":"([pixel] >= 0.10 AND [pixel] < 0.11)",
							"color":"210 161 126"
						},
						{
							"name":"0.11-0.11",
							"expr":"([pixel] >= 0.11 AND [pixel] < 0.11)",
							"color":"211 153 126"
						},
						{
							"name":"0.11-0.12",
							"expr":"([pixel] >= 0.11 AND [pixel] < 0.12)",
							"color":"212 146 127"
						},
						{
							"name":"0.12-0.12",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.12)",
							"color":"212 140 129"
						},
						{
							"name":"0.12-0.13",
							"expr":"([pixel] >= 0.12 AND [pixel] < 0.13)",
							"color":"210 133 132"
						},
						{
							"name":"0.13-0.14",
							"expr":"([pixel] >= 0.13 AND [pixel] < 0.14)",
							"color":"205 122 138"
						},
						{
							"name":"0.14-0.15",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.15)",
							"color":"200 116 142"
						},
						{
							"name":"0.15-0.15",
							"expr":"([pixel] >= 0.14 AND [pixel] < 0.15)",
							"color":"195 112 145"
						},
						{
							"name":"0.15-0.16",
							"expr":"([pixel] >= 0.15 AND [pixel] < 0.16)",
							"color":"189 108 147"
						},
						{
							"name":"0.16-0.16",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.16)",
							"color":"181 104 150"
						},
						{
							"name":"0.16-0.17",
							"expr":"([pixel] >= 0.16 AND [pixel] < 0.17)",
							"color":"164 99 153"
						},
						{
							"name":"0.17-0.18",
							"expr":"([pixel] >= 0.17 AND [pixel] < 0.18)",
							"color":"155 97 153"
						},
						{
							"name":"0.18-0.18",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.18)",
							"color":"145 95 151"
						},
						{
							"name":"0.18-0.19",
							"expr":"([pixel] >= 0.18 AND [pixel] < 0.19)",
							"color":"127 93 146"
						},
						{
							"name":"0.19-0.20",
							"expr":"([pixel] >= 0.19 AND [pixel] < 0.20)",
							"color":"117 92 140"
						},
						{
							"name":"0.20-0.20",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.20)",
							"color":"108 91 135"
						},
						{
							"name":"0.20-0.21",
							"expr":"([pixel] >= 0.20 AND [pixel] < 0.21)",
							"color":"93 88 120"
						},
						{
							"name":"0.21-0.22",
							"expr":"([pixel] >= 0.21 AND [pixel] < 0.22)",
							"color":"82 85 103"
						},
						{
							"name":"0.22-0.24",
							"expr":"([pixel] >= 0.22 AND [pixel] < 0.24)",
							"color":"78 82 93"
						},
						{
							"name":">0.24",
							"expr":"([pixel] >= 0.24)",
							"color":"74 76 78"
						}
					]
		},
		{
			"name":"phytoplankton_biomass_carbon",
			"title":"Phytoplankton biomass carbon (mg C/m3)",
			"abs":"Phytoplankton biomass carbon in Nador",
			"class":	[
						{
							"name":"< 7.67",
							"expr":"([pixel] < 7.67)",
							"color":"235 235 235"
						},
						{
							"name":"7.67-8.80",
							"expr":"([pixel] >= 7.67 AND [pixel] < 8.80)",
							"color":"233 234 234"
						},
						{
							"name":"8.80-10.49",
							"expr":"([pixel] >= 8.80 AND [pixel] < 10.49)",
							"color":"225 233 231"
						},
						{
							"name":"10.49-12.46",
							"expr":"([pixel] >= 10.49 AND [pixel] < 12.46)",
							"color":"205 230 221"
						},
						{
							"name":"12.46-14.16",
							"expr":"([pixel] >= 12.46 AND [pixel] < 14.16)",
							"color":"196 229 216"
						},
						{
							"name":"14.16-16.13",
							"expr":"([pixel] >= 14.16 AND [pixel] < 16.13)",
							"color":"186 227 210"
						},
						{
							"name":"16.13-19.52",
							"expr":"([pixel] >= 16.13 AND [pixel] < 19.52)",
							"color":"172 223 199"
						},
						{
							"name":"19.52-21.49",
							"expr":"([pixel] >= 19.52 AND [pixel] < 21.49)",
							"color":"164 221 192"
						},
						{
							"name":"21.49-23.19",
							"expr":"([pixel] >= 21.49 AND [pixel] < 23.19)",
							"color":"157 218 185"
						},
						{
							"name":"23.19-26.86",
							"expr":"([pixel] >= 23.19 AND [pixel] < 26.86)",
							"color":"145 213 172"
						},
						{
							"name":"26.86-28.55",
							"expr":"([pixel] >= 26.86 AND [pixel] < 28.55)",
							"color":"140 210 165"
						},
						{
							"name":"28.55-30.52",
							"expr":"([pixel] >= 28.55 AND [pixel] < 30.52)",
							"color":"134 207 158"
						},
						{
							"name":"30.52-33.91",
							"expr":"([pixel] >= 30.52 AND [pixel] < 33.91)",
							"color":"126 201 145"
						},
						{
							"name":"33.91-35.89",
							"expr":"([pixel] >= 33.91 AND [pixel] < 35.89)",
							"color":"122 197 137"
						},
						{
							"name":"35.89-37.58",
							"expr":"([pixel] >= 35.89 AND [pixel] < 37.58)",
							"color":"119 193 131"
						},
						{
							"name":"37.58-39.27",
							"expr":"([pixel] >= 37.58 AND [pixel] < 39.27)",
							"color":"116 189 125"
						},
						{
							"name":"39.27-41.25",
							"expr":"([pixel] >= 39.27 AND [pixel] < 41.25)",
							"color":"113 185 118"
						},
						{
							"name":"41.25-44.63",
							"expr":"([pixel] >= 41.25 AND [pixel] < 44.63)",
							"color":"109 176 107"
						},
						{
							"name":"44.63-46.61",
							"expr":"([pixel] >= 44.63 AND [pixel] < 46.61)",
							"color":"106 171 102"
						},
						{
							"name":"46.61-48.30",
							"expr":"([pixel] >= 46.61 AND [pixel] < 48.30)",
							"color":"105 166 97"
						},
						{
							"name":"48.30-50.00",
							"expr":"([pixel] >= 48.30 AND [pixel] < 50.00)",
							"color":"103 162 92"
						},
						{
							"name":"50.00-51.97",
							"expr":"([pixel] >= 50.00 AND [pixel] < 51.97)",
							"color":"102 156 88"
						},
						{
							"name":"51.97-55.64",
							"expr":"([pixel] >= 51.97 AND [pixel] < 55.64)",
							"color":"99 145 80"
						},
						{
							"name":"55.64-57.33",
							"expr":"([pixel] >= 55.64 AND [pixel] < 57.33)",
							"color":"98 140 77"
						},
						{
							"name":"57.33-59.31",
							"expr":"([pixel] >= 57.33 AND [pixel] < 59.31)",
							"color":"97 134 74"
						},
						{
							"name":"59.31-62.69",
							"expr":"([pixel] >= 59.31 AND [pixel] < 62.69)",
							"color":"95 124 71"
						},
						{
							"name":"62.69-64.67",
							"expr":"([pixel] >= 62.69 AND [pixel] < 64.67)",
							"color":"93 117 69"
						},
						{
							"name":"64.67-66.36",
							"expr":"([pixel] >= 64.67 AND [pixel] < 66.36)",
							"color":"92 112 68"
						},
						{
							"name":"66.36-70.03",
							"expr":"([pixel] >= 66.36 AND [pixel] < 70.03)",
							"color":"88 101 68"
						},
						{
							"name":"70.03-73.42",
							"expr":"([pixel] >= 70.03 AND [pixel] < 73.42)",
							"color":"84 90 69"
						},
						{
							"name":"73.42-78.21",
							"expr":"([pixel] >= 73.42 AND [pixel] < 78.21)",
							"color":"81 84 70"
						},
						{
							"name":">78.21",
							"expr":"([pixel] >= 78.21)",
							"color":"76 76 73"
						}
					]
		},
		{
			"name":"zooplankton_carbon_biomass",
			"title":"Zooplankton carbon biomass (mg C/m3)",
			"abs":"Zooplankton carbon biomass in Nador",
			"class":	[
						{
							"name":"< 0.58",
							"expr":"([pixel] < 0.58)",
							"color":"235 235 235"
						},
						{
							"name":"0.58-1.50",
							"expr":"([pixel] >= 0.58 AND [pixel] < 1.50)",
							"color":"233 234 234"
						},
						{
							"name":"1.50-2.89",
							"expr":"([pixel] >= 1.50 AND [pixel] < 2.89)",
							"color":"225 233 231"
						},
						{
							"name":"2.89-4.50",
							"expr":"([pixel] >= 2.89 AND [pixel] < 4.50)",
							"color":"205 230 221"
						},
						{
							"name":"4.50-5.89",
							"expr":"([pixel] >= 4.50 AND [pixel] < 5.89)",
							"color":"196 229 216"
						},
						{
							"name":"5.89-7.50",
							"expr":"([pixel] >= 5.89 AND [pixel] < 7.50)",
							"color":"186 227 210"
						},
						{
							"name":"7.50-10.27",
							"expr":"([pixel] >= 7.50 AND [pixel] < 10.27)",
							"color":"172 223 199"
						},
						{
							"name":"10.27-11.88",
							"expr":"([pixel] >= 10.27 AND [pixel] < 11.88)",
							"color":"164 221 192"
						},
						{
							"name":"11.88-13.27",
							"expr":"([pixel] >= 11.88 AND [pixel] < 13.27)",
							"color":"157 218 185"
						},
						{
							"name":"13.27-16.27",
							"expr":"([pixel] >= 13.27 AND [pixel] < 16.27)",
							"color":"145 213 172"
						},
						{
							"name":"16.27-17.65",
							"expr":"([pixel] >= 16.27 AND [pixel] < 17.65)",
							"color":"140 210 165"
						},
						{
							"name":"17.65-19.27",
							"expr":"([pixel] >= 17.65 AND [pixel] < 19.27)",
							"color":"134 207 158"
						},
						{
							"name":"19.27-22.04",
							"expr":"([pixel] >= 19.27 AND [pixel] < 22.04)",
							"color":"126 201 145"
						},
						{
							"name":"22.04-23.65",
							"expr":"([pixel] >= 22.04 AND [pixel] < 23.65)",
							"color":"122 197 137"
						},
						{
							"name":"23.65-25.03",
							"expr":"([pixel] >= 23.65 AND [pixel] < 25.03)",
							"color":"119 193 131"
						},
						{
							"name":"25.03-26.42",
							"expr":"([pixel] >= 25.03 AND [pixel] < 26.42)",
							"color":"116 189 125"
						},
						{
							"name":"26.42-28.03",
							"expr":"([pixel] >= 26.42 AND [pixel] < 28.03)",
							"color":"113 185 118"
						},
						{
							"name":"28.03-30.80",
							"expr":"([pixel] >= 28.03 AND [pixel] < 30.80)",
							"color":"109 176 107"
						},
						{
							"name":"30.80-32.42",
							"expr":"([pixel] >= 30.80 AND [pixel] < 32.42)",
							"color":"106 171 102"
						},
						{
							"name":"32.42-33.80",
							"expr":"([pixel] >= 32.42 AND [pixel] < 33.80)",
							"color":"105 166 97"
						},
						{
							"name":"33.80-35.18",
							"expr":"([pixel] >= 33.80 AND [pixel] < 35.18)",
							"color":"103 162 92"
						},
						{
							"name":"35.18-36.80",
							"expr":"([pixel] >= 35.18 AND [pixel] < 36.80)",
							"color":"102 156 88"
						},
						{
							"name":"36.80-39.80",
							"expr":"([pixel] >= 36.80 AND [pixel] < 39.80)",
							"color":"99 145 80"
						},
						{
							"name":"39.80-41.18",
							"expr":"([pixel] >= 39.80 AND [pixel] < 41.18)",
							"color":"98 140 77"
						},
						{
							"name":"41.18-42.80",
							"expr":"([pixel] >= 41.18 AND [pixel] < 42.80)",
							"color":"97 134 74"
						},
						{
							"name":"42.80-45.57",
							"expr":"([pixel] >= 42.80 AND [pixel] < 45.57)",
							"color":"95 124 71"
						},
						{
							"name":"45.57-47.18",
							"expr":"([pixel] >= 45.57 AND [pixel] < 47.18)",
							"color":"93 117 69"
						},
						{
							"name":"47.18-48.56",
							"expr":"([pixel] >= 47.18 AND [pixel] < 48.56)",
							"color":"92 112 68"
						},
						{
							"name":"48.56-51.56",
							"expr":"([pixel] >= 48.56 AND [pixel] < 51.56)",
							"color":"88 101 68"
						},
						{
							"name":"51.56-54.33",
							"expr":"([pixel] >= 51.56 AND [pixel] < 54.33)",
							"color":"84 90 69"
						},
						{
							"name":"54.33-58.25",
							"expr":"([pixel] >= 54.33 AND [pixel] < 58.25)",
							"color":"81 84 70"
						},
						{
							"name":">58.25",
							"expr":"([pixel] >= 58.25)",
							"color":"76 76 73"
						}
					]
		},
		{
			"name":"chlorophyl",
			"title":"Chlorophyl (mg C/m3)",
			"abs":"Chlorophyl in Nador",
			"class":	[
						{
							"name":"< 0.21",
							"expr":"([pixel] < 0.21)",
							"color":"235 235 235"
						},
						{
							"name":"0.21-0.24",
							"expr":"([pixel] >= 0.21 AND [pixel] < 0.24)",
							"color":"233 234 234"
						},
						{
							"name":"0.24-0.28",
							"expr":"([pixel] >= 0.24 AND [pixel] < 0.28)",
							"color":"225 233 231"
						},
						{
							"name":"0.28-0.32",
							"expr":"([pixel] >= 0.28 AND [pixel] < 0.32)",
							"color":"205 230 221"
						},
						{
							"name":"0.32-0.36",
							"expr":"([pixel] >= 0.32 AND [pixel] < 0.36)",
							"color":"196 229 216"
						},
						{
							"name":"0.36-0.40",
							"expr":"([pixel] >= 0.36 AND [pixel] < 0.40)",
							"color":"186 227 210"
						},
						{
							"name":"0.40-0.48",
							"expr":"([pixel] >= 0.40 AND [pixel] < 0.48)",
							"color":"172 223 199"
						},
						{
							"name":"0.48-0.52",
							"expr":"([pixel] >= 0.48 AND [pixel] < 0.52)",
							"color":"164 221 192"
						},
						{
							"name":"0.52-0.56",
							"expr":"([pixel] >= 0.52 AND [pixel] < 0.56)",
							"color":"157 218 185"
						},
						{
							"name":"0.56-0.64",
							"expr":"([pixel] >= 0.56 AND [pixel] < 0.64)",
							"color":"145 213 172"
						},
						{
							"name":"0.64-0.68",
							"expr":"([pixel] >= 0.64 AND [pixel] < 0.68)",
							"color":"140 210 165"
						},
						{
							"name":"0.68-0.72",
							"expr":"([pixel] >= 0.68 AND [pixel] < 0.72)",
							"color":"134 207 158"
						},
						{
							"name":"0.72-0.80",
							"expr":"([pixel] >= 0.72 AND [pixel] < 0.80)",
							"color":"126 201 145"
						},
						{
							"name":"0.80-0.84",
							"expr":"([pixel] >= 0.80 AND [pixel] < 0.84)",
							"color":"122 197 137"
						},
						{
							"name":"0.84-0.88",
							"expr":"([pixel] >= 0.84 AND [pixel] < 0.88)",
							"color":"119 193 131"
						},
						{
							"name":"0.88-0.92",
							"expr":"([pixel] >= 0.88 AND [pixel] < 0.92)",
							"color":"116 189 125"
						},
						{
							"name":"0.92-0.96",
							"expr":"([pixel] >= 0.92 AND [pixel] < 0.96)",
							"color":"113 185 118"
						},
						{
							"name":"0.96-1.04",
							"expr":"([pixel] >= 0.96 AND [pixel] < 1.04)",
							"color":"109 176 107"
						},
						{
							"name":"1.04-1.08",
							"expr":"([pixel] >= 1.04 AND [pixel] < 1.08)",
							"color":"106 171 102"
						},
						{
							"name":"1.08-1.12",
							"expr":"([pixel] >= 1.08 AND [pixel] < 1.12)",
							"color":"105 166 97"
						},
						{
							"name":"1.12-1.16",
							"expr":"([pixel] >= 1.12 AND [pixel] < 1.16)",
							"color":"103 162 92"
						},
						{
							"name":"1.16-1.20",
							"expr":"([pixel] >= 1.16 AND [pixel] < 1.20)",
							"color":"102 156 88"
						},
						{
							"name":"1.20-1.28",
							"expr":"([pixel] >= 1.20 AND [pixel] < 1.28)",
							"color":"99 145 80"
						},
						{
							"name":"1.28-1.32",
							"expr":"([pixel] >= 1.28 AND [pixel] < 1.32)",
							"color":"98 140 77"
						},
						{
							"name":"1.32-1.36",
							"expr":"([pixel] >= 1.32 AND [pixel] < 1.36)",
							"color":"97 134 74"
						},
						{
							"name":"1.36-1.44",
							"expr":"([pixel] >= 1.36 AND [pixel] < 1.44)",
							"color":"95 124 71"
						},
						{
							"name":"1.44-1.48",
							"expr":"([pixel] >= 1.44 AND [pixel] < 1.48)",
							"color":"93 117 69"
						},
						{
							"name":"1.48-1.52",
							"expr":"([pixel] >= 1.48 AND [pixel] < 1.52)",
							"color":"92 112 68"
						},
						{
							"name":"1.52-1.60",
							"expr":"([pixel] >= 1.52 AND [pixel] < 1.60)",
							"color":"88 101 68"
						},
						{
							"name":"1.60-1.68",
							"expr":"([pixel] >= 1.60 AND [pixel] < 1.68)",
							"color":"84 90 69"
						},
						{
							"name":"1.68-1.72",
							"expr":"([pixel] >= 1.68 AND [pixel] < 1.72)",
							"color":"81 84 70"
						},
						{
							"name":">1.72",
							"expr":"([pixel] >= 1.72)",
							"color":"76 76 73"
						}
					]
		}
	]
}