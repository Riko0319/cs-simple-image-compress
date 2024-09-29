# cs-simple-image-compress
## intro

support png compress and other types compress to jpg,if you don't need high quality image compress output.

## option

CompressImage(file: File, options:compressOption)

file: your upload image file

options: {
    
    outputWidth?: number;

    outputHeight?: number;

    ratio?: number;

    toJPEG?: boolean;

}

1.if you want to output images with fixed width and height,please enter the value of outputWidth and outputHeight.

2.ratio: output the image in its original size ratio.

3.toJPEG: png would output as jpeg image.