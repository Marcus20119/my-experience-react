import { FileType } from '@/shared/types';

interface Props {
  fileType: FileType;
}

export const getFileExtension = ({ fileType }: Props) => {
  switch (fileType) {
    case FileType.Avi:
      return 'avi';
    case FileType.Csv:
      return 'csv';
    case FileType.Doc:
      return 'doc';
    case FileType.Docx:
      return 'docx';
    case FileType.Gif:
      return 'gif';
    case FileType.Jpeg:
      return 'jpeg';
    case FileType.Jpg:
      return 'jpg';
    case FileType.Mp3:
      return 'mp3';
    case FileType.Mp4:
      return 'mp4';
    case FileType.Pdf:
      return 'pdf';
    case FileType.Png:
      return 'png';
    case FileType.Ppt:
      return 'ppt';
    case FileType.Pptx:
      return 'pptx';
    case FileType.Rar:
      return 'rar';
    case FileType.Svg:
      return 'svg';
    case FileType.Txt:
      return 'txt';
    case FileType.Webp:
      return 'webp';
    case FileType.Xls:
      return 'xls';
    case FileType.Xlsx:
      return 'xlsx';
    case FileType.Zip:
      return 'zip';
    default:
      return '';
  }
};
