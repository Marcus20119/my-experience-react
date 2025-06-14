import { FileType } from '@/shared/types';

interface Props {
  fileType?: FileType;
}

export const getFileIconName = ({ fileType }: Props) => {
  switch (fileType) {
    case FileType.Avi:
      return '@local:file-avi';
    case FileType.Csv:
      return '@local:file-csv';
    case FileType.Doc:
      return '@local:file-doc';
    case FileType.Docx:
      return '@local:file-docx';
    case FileType.Gif:
      return '@local:file-gif';
    case FileType.Jpeg:
      return '@local:file-jpeg';
    case FileType.Jpg:
      return '@local:file-jpg';
    case FileType.Mp3:
      return '@local:file-mp3';
    case FileType.Mp4:
      return '@local:file-mp4';
    case FileType.Pdf:
      return '@local:file-pdf';
    case FileType.Png:
      return '@local:file-png';
    case FileType.Ppt:
      return '@local:file-ppt';
    case FileType.Pptx:
      return '@local:file-pptx';
    case FileType.Rar:
      return '@local:file-rar';
    case FileType.Svg:
      return '@local:file-svg';
    case FileType.Txt:
      return '@local:file-txt';
    case FileType.Webp:
      return '@local:file-webp';
    case FileType.Xls:
      return '@local:file-xls';
    case FileType.Xlsx:
      return '@local:file-xlsx';
    case FileType.Zip:
      return '@local:file-zip';
    default:
      return '@local:file';
  }
};
