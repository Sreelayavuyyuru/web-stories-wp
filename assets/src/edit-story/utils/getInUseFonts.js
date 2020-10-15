/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function getInUseFontsForPages(pages) {
  return [
    ...new Set(
      pages
        .reduce((storyMemo, { elements = [] }) => {
          return [
            ...storyMemo,
            ...elements.reduce((pageMemo, element) => {
              if (element.type === 'text' && Boolean(element.font?.family)) {
                return [...pageMemo, element.font?.family];
              }
              return pageMemo;
            }, []),
          ];
        }, [])
        .filter(Boolean)
    ),
  ];
}

export function getTextSetsForFonts({ fonts, textSets }) {
  return textSets
    .reduce((textSetMemo, currentTextSet) => {
      const hasFontInUse = currentTextSet.reduce(
        (elementMemo, currentElement) => {
          if (
            currentElement.type === 'text' &&
            Boolean(currentElement.font?.family)
          ) {
            return (
              elementMemo | (fonts.indexOf(currentElement.font?.family) !== -1)
            );
          }
          return elementMemo;
        },
        false
      );
      return [...textSetMemo, hasFontInUse && currentTextSet];
    }, [])
    .filter(Boolean);
}
