#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'fs';
import path from 'path';

import ExcelJS from 'exceljs';

function flattenObject(obj: Record<string, any>, parentKey = '', result: Record<string, any> = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
              // Assign each primitive to a separate key with index
              result[`${newKey}[${index}]`] = item;
            } else {
              // Flatten objects/arrays recursively
              flattenObject(item, `${newKey}[${index}]`, result);
            }
          });
        } else {
          flattenObject(obj[key], newKey, result);
        }
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

/**
 * Load locales from each language.
 * Assumes each language contains a `translations.json` file.
 * @returns Record<languageCode, translationsJson>
 */
function loadLocales(): Record<string, any> {
  const languageCodes = readdirSync('./assets/locales', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const translations: Record<string, any> = {};

  for (const languageCode of languageCodes) {
    const filePath = path.join('./assets/locales', languageCode, 'translations.json');

    if (existsSync(filePath)) {
      try {
        const fileContents = readFileSync(filePath, 'utf-8');
        translations[languageCode] = JSON.parse(fileContents);
      } catch (err) {
        console.error(`❌ Error reading ${filePath}:`, err);
      }
    } else {
      console.warn(`⚠️ No translations.json found in ${languageCode}`);
    }
  }

  return translations;
}

/**
 * Load tools translations from each Country x Language.
 * Assumes each Country x Language contains a `tools.json` file.
 * @returns Record<languageCode, translationsJson>
 */
function loadTools(): Record<string, any> {
  const countryCodes = readdirSync('./assets/tools', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const translations: Record<string, any> = {};

  for (const countryCode of countryCodes) {
    const languageCodes = readdirSync(path.join('./assets/tools', countryCode), { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const languageCode of languageCodes) {
      const filePath = path.join('./assets/tools', countryCode, languageCode, 'tools.json');

      if (existsSync(filePath)) {
        try {
          const fileContents = readFileSync(filePath, 'utf-8');
          translations[`${countryCode}_${languageCode}`] = JSON.parse(fileContents);
        } catch (err) {
          console.error(`❌ Error reading ${filePath}:`, err);
        }
      } else {
        console.warn(`⚠️ No tools.json found in ${path.join('./assets/tools', countryCode, languageCode)}`);
      }
    }
  }

  return translations;
}

async function exportLocalesToExcel() {
  console.log('⏳ Exporting locales ...');

  const start = Date.now();
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  const columns = [
    { header: 'Key', key: 'keyName', width: 90 },
    { header: 'Text', key: 'value' },
  ];

  const locales = loadLocales();
  Object.entries(locales).forEach(([locale, translations]) => {
    const worksheet = workbook.addWorksheet(`locale_${locale}`);

    // Define columns
    worksheet.columns = columns;

    const data = flattenObject(translations);

    worksheet.addRows(Object.entries(data));
  });

  const tools = loadTools();
  Object.entries(tools).forEach(([countryXLanguage, translations]) => {
    const worksheet = workbook.addWorksheet(`tools_${countryXLanguage}`);

    // Define columns
    worksheet.columns = columns;

    const data = flattenObject(translations);

    worksheet.addRows(Object.entries(data));
  });

  // // Write the workbook to a file
  await workbook.xlsx.writeFile('locales.xlsx');

  const end = Date.now();

  console.log(`✅ Exporting completed in ${end - start}ms`);

  process.exit(0);
}

exportLocalesToExcel().catch((err) => {
  console.error('❌ Exporting locales');
  console.error(err);
  process.exit(1);
});
