/* eslint-disable prefer-destructuring */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import range from 'lodash-es/range';

import { getExcelColumnRange } from '../lib';
import type { RangeAddress, RangeStyle } from '../model';

export const StyledExcelWrapper = styled.div<{
  selectedRange: null | RangeAddress;
  rangeStyles: RangeStyle[];
}>`
  td {
    transition: none !important;
  }

  td:has(.row-key-cell) {
    pointer-events: none;
  }

  ${({ selectedRange }) => {
    if (!selectedRange) {
      return '';
    }

    const { end, start } = selectedRange;

    const rowRange =
      start.row < end.row
        ? range(start.row, end.row + 1)
        : range(end.row, start.row + 1);

    const colRange =
      start.col < end.col
        ? getExcelColumnRange(start.col, end.col)
        : getExcelColumnRange(end.col, start.col);

    const minRow = rowRange[0];
    const maxRow = rowRange[rowRange.length - 1];
    const minCol = colRange[0];
    const maxCol = colRange[colRange.length - 1];

    // Flatten all styles into a single CSS block
    return css`
      ${rowRange
        .map(row =>
          colRange
            .map(col => {
              const background = `
            tr[data-row-key="${row}"] td[data-col-key="${col}"] {
              background-color: var(--neutral-50-color) !important;
            }`;
              const borderRight =
                col === maxCol
                  ? `
                tr[data-row-key="${row}"] td[data-col-key="${col}"] {
                  border-right: 2px solid var(--neutral-500-color) !important;
                }`
                  : '';

              const borderBottom =
                row === maxRow
                  ? `
                tr[data-row-key="${row}"] td[data-col-key="${col}"] {
                  border-bottom: 2px solid var(--neutral-500-color) !important;
                }`
                  : '';

              const borderTop =
                row === minRow
                  ? `
                tr[data-row-key="${row}"] td[data-col-key="${col}"] {
                  border-top: 2px solid var(--neutral-500-color) !important;
                }`
                  : '';

              const borderLeft =
                col === minCol
                  ? `
                tr[data-row-key="${row}"] td[data-col-key="${col}"] {
                  border-left: 2px solid var(--neutral-500-color) !important;
                }`
                  : '';

              return [
                background,
                borderRight,
                borderBottom,
                borderTop,
                borderLeft,
              ].join('');
            })
            .join(''),
        )
        .join('')}
    `;
  }}

  ${({ rangeStyles }) => css`
    ${rangeStyles
      .map(({ range: rangeAddress, style }) => {
        const { end, start } = rangeAddress;

        const rowRange =
          start.row < end.row
            ? range(start.row, end.row + 1)
            : range(end.row, start.row + 1);

        const colRange =
          start.col < end.col
            ? getExcelColumnRange(start.col, end.col)
            : getExcelColumnRange(end.col, start.col);

        // Flatten all styles into a single CSS block
        return `${rowRange
          .map(row =>
            colRange
              .map(col => {
                const fontWeight = style.font?.bold
                  ? 'font-weight: bold !important;'
                  : style.font?.bold === false &&
                    'font-weight: normal !important;';
                const fontStyle = style.font?.italic
                  ? 'font-style: italic !important;'
                  : style.font?.italic === false &&
                    'font-style: normal !important;';
                const textDecoration = style.font?.underline
                  ? 'text-decoration: underline !important;'
                  : style.font?.underline === false &&
                    'text-decoration: none !important;';
                const backgroundColor =
                  style.fill?.fgColor?.rgb &&
                  `
                background-color: #${style.fill.fgColor.rgb} !important;`;
                const color =
                  style.font?.color?.rgb &&
                  `
                *{color: #${style.font.color.rgb} !important;}`;

                const styles = [
                  fontWeight,
                  fontStyle,
                  textDecoration,
                  backgroundColor,
                  color,
                ].filter(Boolean);

                return `tr[data-row-key="${row}"] td[data-col-key="${col}"] {
                ${styles.join('')}}`;
              })
              .join(''),
          )
          .join('')}`;
      })
      .join('')}
  `}
`;
