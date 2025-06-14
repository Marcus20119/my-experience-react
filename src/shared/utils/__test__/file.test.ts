import { describe, expect, test, vi } from 'vitest';

import { FileType } from '@/shared/types';

import { FileTool } from '../file';

const { getFileTypeByExtension, getFileTypeFromName } = FileTool;

describe('FileTool', () => {
  describe('getFileTypeByExtension', () => {
    test.each([
      ['pdf', FileType.Pdf],
      ['doc', FileType.Doc],
      ['docx', FileType.Docx],
      ['mp4', FileType.Mp4],
      ['jpg', FileType.Jpg],
      ['png', FileType.Png],
      ['jpeg', FileType.Jpeg],
      ['svg', FileType.Svg],
      ['webp', FileType.Webp],
      ['gif', FileType.Gif],
      ['txt', FileType.Txt],
      ['csv', FileType.Csv],
      ['xls', FileType.Xls],
      ['xlsx', FileType.Xlsx],
      ['ppt', FileType.Ppt],
      ['pptx', FileType.Pptx],
      ['mp3', FileType.Mp3],
      ['avi', FileType.Avi],
      ['zip', FileType.Zip],
      ['rar', FileType.Rar],
      ['', undefined],
      ['abc', undefined],
      [undefined, undefined],
    ])('getFileTypeByExtension(%j) -> %s', (name, expected) => {
      expect(getFileTypeByExtension(name)).toBe(expected);
    });
  });

  describe('getFileTypeFromName', () => {
    test.each([
      ['file.pdf', FileType.Pdf],
      ['file.doc', FileType.Doc],
      ['file.docx', FileType.Docx],
      ['file.mp4', FileType.Mp4],
      ['file.jpg', FileType.Jpg],
      ['file.png', FileType.Png],
      ['file.jpeg', FileType.Jpeg],
      ['file.svg', FileType.Svg],
      ['file.webp', FileType.Webp],
      ['file.gif', FileType.Gif],
      ['file.txt', FileType.Txt],
      ['file.csv', FileType.Csv],
      ['file.xls', FileType.Xls],
      ['file.xlsx', FileType.Xlsx],
      ['file.ppt', FileType.Ppt],
      ['file.pptx', FileType.Pptx],
      ['file.mp3', FileType.Mp3],
      ['file.avi', FileType.Avi],
      ['file.zip', FileType.Zip],
      ['file.rar', FileType.Rar],
      ['file', undefined],
      ['', undefined],
      [undefined, undefined],
    ])('getFileTypeFromName(%j) -> %s', (name, expected) => {
      expect(getFileTypeFromName(name)).toBe(expected);
    });
  });

  describe('downloadURI', () => {
    test('should create a download link with the correct URI and name', () => {
      const uri = 'data:image/png;base64,abc';
      const name = 'test.png';

      const link = document.createElement('a');
      link.download = name;
      link.href = uri;

      const spy = vi.spyOn(document, 'createElement').mockReturnValue(link);
      const appendSpy = vi.spyOn(document.body, 'appendChild');

      FileTool.downloadURI(uri, name);

      expect(spy).toHaveBeenCalledWith('a');
      expect(appendSpy).toHaveBeenCalledWith(link);
    });
  });
});
