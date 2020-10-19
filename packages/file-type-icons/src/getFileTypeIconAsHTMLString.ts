import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import {
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  FileTypeIconSize,
  ImageFileType,
  DEFAULT_ICON_SIZE,
} from './getFileTypeIconProps';
import { FileIconType } from './FileIconType';

export function getFileTypeIconAsHTMLString(
  options: {
    extension?: string;
    size?: FileTypeIconSize;
    type?: FileIconType;
    imageFileType?: ImageFileType;
  },
  baseUrl: string = DEFAULT_BASE_URL,
): string | undefined {
  const { extension, size = DEFAULT_ICON_SIZE, type, imageFileType } = options;
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type); // eg: docx
  const baseSuffix = getFileTypeIconSuffix(size, imageFileType); // eg: 96_3x_svg or 96_png
  const suffixArray = baseSuffix.split('_'); // eg: ['96', '3x', 'svg']

  let src: string | undefined;
  if (suffixArray.length === 3) {
    /** suffix is of type 96_3x_svg  - it has a pixel ratio > 1*/
    src = `${baseUrl}${size}_${suffixArray[1]}/${baseIconName}.${suffixArray[2]}`;
    return `<img src="${src}" height="100%" width="100%" />`;
  } else if (suffixArray.length === 2) {
    /** suffix is of type 96_svg  - it has a pixel ratio of 1*/
    src = `${baseUrl}${size}/${baseIconName}.${suffixArray[1]}`;
    return `<img src="${src}" alt="" />`;
  }
}
