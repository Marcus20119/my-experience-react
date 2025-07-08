import { FileType } from '../types';

const getFileTypeByExtension = (extension?: string) => {
  switch (extension) {
    case 'pdf':
      return FileType.Pdf;
    case 'doc':
      return FileType.Doc;
    case 'docx':
      return FileType.Docx;
    case 'mp4':
      return FileType.Mp4;
    case 'jpg':
      return FileType.Jpg;
    case 'png':
      return FileType.Png;
    case 'jpeg':
      return FileType.Jpeg;
    case 'svg':
      return FileType.Svg;
    case 'webp':
      return FileType.Webp;
    case 'gif':
      return FileType.Gif;
    case 'txt':
      return FileType.Txt;
    case 'csv':
      return FileType.Csv;
    case 'xls':
      return FileType.Xls;
    case 'xlsx':
      return FileType.Xlsx;
    case 'ppt':
      return FileType.Ppt;
    case 'pptx':
      return FileType.Pptx;
    case 'mp3':
      return FileType.Mp3;
    case 'avi':
      return FileType.Avi;
    case 'zip':
      return FileType.Zip;
    case 'rar':
      return FileType.Rar;
    default:
      return undefined;
  }
};

const getFileTypeFromName = (name?: string) => {
  if (!name) {
    return undefined;
  }

  const ext = name.split('.').pop()?.toLowerCase();
  return getFileTypeByExtension(ext);
};

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const joinFileUrl = (key: string, url: string) => `${key}>${url}`;

const splitFileUrl = (fileUrl?: null | string) => {
  if (!fileUrl) {
    return {
      key: undefined,
      url: undefined,
    };
  }

  const [key, url] = fileUrl.split('>');

  return {
    key,
    url,
  };
};

export const FileTool = {
  downloadURI,
  getFileTypeByExtension,
  getFileTypeFromName,
  joinFileUrl,
  splitFileUrl,
};
