import UPNG from "upng-js";
type compressOption = {
    outputWidth?: number;
    outputHeight?: number;
    ratio?: number;
    toJPEG?: boolean;
};

export function CompressImage(file: File, options:compressOption): Promise<File> {
    const { outputWidth, outputHeight, ratio = 1, toJPEG = false } = options;
    return new Promise(resolve => {
        const reader = new FileReader();
        const name = file.name;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (file.type === 'image/png' && !toJPEG) {
            try {
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    const image = new Image();
                    image.src =
                        e.target && e.target.result
                            ? e.target.result.toString()
                            : '';
                    image.onload = function () {
                        const width = outputWidth ?? image.width * ratio;
                        const height = outputHeight ?? image.height * ratio;
                        canvas.width = width;
                        canvas.height = height;
                        if (context) {
                            context.clearRect(0, 0, width, height);
                            // 绘制图像到 Canvas
                            context.drawImage(image, 0, 0, width, height);
                            // 获取图像数据
                            const extendedImgData = context.getImageData(
                                0,
                                0,
                                width,
                                height,
                            );
                            const extendedRGBA = extendedImgData.data;
                            const compressedArrayBuffer = UPNG.encode(
                                [extendedRGBA.buffer],
                                width,
                                height,
                                256,
                            );
                            const blob = new Blob([compressedArrayBuffer], {
                                type: 'image/png',
                            });
                            // 创建一个新的 File 对象
                            const files = new File([blob], name, {
                                type: 'image/png',
                            });
                            resolve(files);
                        }
                    };
                };
            } catch (error) {
                console.log(error);
            }
        } else {
            reader.readAsDataURL(file); // 转base64
            reader.onload = function (e) {
                const image = new Image();
                image.src =
                    e.target && e.target.result
                        ? e.target.result.toString()
                        : '';
                image.onload = function () {
                    const width = outputWidth ?? image.width * ratio;
                    const height = outputHeight ?? image.height * ratio;
                    // canvas对图片进行缩放
                    canvas.width = width;
                    canvas.height = height;
                    // 清除画布
                    if (context) context.clearRect(0, 0, width, height);
                    // 将图片划到canvas上
                    if (context) {
                        context.drawImage(image, 0, 0, width, height);
                    }
                    const data = canvas.toDataURL('image/jpeg', 0.8); // 压缩比例0.6
                    const arr = data.split(',');
                    const mime = (arr as any)[0].match(/:(.*?);/)[1]; // 转成blob
                    const bstr = atob(arr[1]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    const files = new File([u8arr], name, { type: mime }); // 转成file
                    resolve(files);
                }
            }
        }
    });
}