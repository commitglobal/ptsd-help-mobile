#!/usr/bin/env node
import ExcelJS from 'exceljs';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function unflattenObject(flattened: Record<string, string>) {
  const result: Record<string, any> = {};

  for (let key in flattened) {
    if (flattened.hasOwnProperty(key)) {
      let keys = key.split(/[\.\[\]]+/).filter((k) => k !== '');
      keys.reduce((acc, part, index) => {
        if (index === keys.length - 1) {
          acc[part] = flattened[key];
        } else {
          if (!acc[part]) {
            // @ts-ignore
            acc[part] = isNaN(keys[index + 1]) ? {} : [];
          }
        }
        return acc[part];
      }, result);
    }
  }

  return result;
}

async function importLocalesFromExcel() {
  console.log('⏳ Importing locales ...');

  const start = Date.now();

  const options = yargs(hideBin(process.argv))
    .usage('Usage: $0 <filePath>')
    .demandCommand(1, 'You must provide the Excel file path')
    .parseSync();

  if (!existsSync(options._[0] as string)) {
    console.log(`Could not find translations Excel file: ${options._[0]}`);
    process.exit(0);
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(options._[0] as string);

  // Process locale_* sheets
  for (const languageLocaleSheet of workbook.worksheets.filter((worksheet) => worksheet.name.includes('locale_'))) {
    console.log(`📄 Processing locale sheet: ${languageLocaleSheet.name}`);

    const translations: Record<string, any> = {};
    languageLocaleSheet.eachRow((row) => {
      if (row.number === 1) return;

      if (row.getCell('A').value?.toLocaleString()) {
        translations[row.getCell('A').value?.toLocaleString()!] = row.getCell('B').value?.toLocaleString();
      }
    });

    const locale = languageLocaleSheet.name.replace('locale_', '');
    const outPath = path.join('./assets/locales', locale, 'translations.json');

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    console.log(`📝 Writing translations to ${outPath}`);
    await fs.writeFile(outPath, JSON.stringify(unflattenObject(translations), null, 4));
  }

  // Process tools_* sheets
  for (const countryLanguageToolsSheet of workbook.worksheets.filter((x) => x.name.includes('tools_'))) {
    console.log(`📄 Processing tools sheet: ${countryLanguageToolsSheet.name}`);

    const translations: Record<string, any> = {};
    countryLanguageToolsSheet.eachRow((row) => {
      if (row.number === 1) return;

      if (row.getCell('A').value?.toLocaleString()) {
        translations[row.getCell('A').value?.toLocaleString()!] = row.getCell('B').value?.toLocaleString();
      }
    });

    const [countryCode, languageCode] = countryLanguageToolsSheet.name.replace('tools_', '').split('_');
    const outPath = path.join('./assets/tools', countryCode, languageCode, 'tools.json');

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    console.log(`📝 Writing translations to ${outPath}`);
    await fs.writeFile(outPath, JSON.stringify(unflattenObject(translations), null, 4));
  }

  const end = Date.now();
  console.log(`✅ Importing completed in ${end - start}ms`);

  process.exit(0);
}

importLocalesFromExcel().catch((err) => {
  console.error('❌ Importing locales failed');
  console.error(err);
  process.exit(1);
});
