#! /usr/bin/env python
# -*- coding: utf-8 -*-

"""

Translate NetCDF files to GeoTiff format

IMPORTANT: GDAL >=1.10.1 compiled with libnetCDF 
            and GDAL Python bindings

Author: Cayetano Benavent Vinuales 2014
        GIS Analyst at
        www.geographica.gs

"""

#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  


import os
import sys
from osgeo import gdal


def netCDF2geotiff(in_filename, out_format_r="GTiff", var_index=1):
    """
    
    Convert NetCDF files to Geotiff
    
    """
    
    # Open Grib 2 edition file
    src_ds = gdal.Open(in_filename)

    if src_ds is None:
        print "Open failed"
        sys.exit()
    
    # Open output format driver
    driver_r = gdal.GetDriverByName(out_format_r)
    
    # File extension for filename
    ext = driver_r.GetMetadata()['DMD_EXTENSION']
    
    if src_ds.GetSubDatasets() > 1:
        # If exists more than one var in the NetCDF...
        subdataset = src_ds.GetSubDatasets()[var_index][0]
        src_ds_sd = gdal.Open(subdataset)
        dst_filename = '%s.%s' % (os.path.splitext(in_filename)[0], ext)
        
        try:
            # Exporting in one Geotiff one var with multiple time dimensions
            dst_ds = driver_r.CreateCopy(dst_filename, src_ds_sd)
        except:
            print 'Error creating file...'
        
        # Close the dataset
        dst_ds = None
        
        # Get one GeoTiff per Raster Band
        for i in range(1, src_ds_sd.RasterCount + 1):
            src_ds_sd_band = src_ds_sd.GetRasterBand(i)
            # Output to new format
            dst_filename_band = '%s_%s.%s' % (os.path.splitext(in_filename)[0], i, ext)
            # Call to Gdal command for translate to GeoTiff
            # Exporting in one Geotiff one var with one time dimensions
            gdal_translate = 'gdal_translate -of %s -b %s %s %s' % (out_format_r, i, dst_filename, dst_filename_band)
            cmd = os.system(gdal_translate)
            
            if cmd == 0:
                print 'File created: %s' % (dst_filename_band)
            else:
                print 'Error creating file...'
        
        # Close the dataset
        src_ds_sd = None
    
    # Print metadata
    metadata = src_ds.GetMetadata_Dict()
    print '\nNetCDF METADATA:'
    for i in metadata:
        print '%s:  %s' % (i, metadata[i])
        
    # Close the dataset
    src_ds = None

    return dst_filename

def batchProcess(folder):
    """
    
    Creating a batch geoprocess.
    Translate all files in folder and subfolders
    
    """
    
    for subdir, dirs, files in os.walk(folder):
        # Walking through folders to translate all NetCDF files
        if len(files) > 0:
            for fl in files:
                filepath = '%s/%s' % (subdir, fl)
                new_file = netCDF2geotiff(filepath)
                print '\nCreated complete file (One var/multiple time dimensions): %s\n\n' % (new_file)


if __name__ == "__main__":

    folder = '/myNetCDFfolder'
    
    batchProcess(folder)
