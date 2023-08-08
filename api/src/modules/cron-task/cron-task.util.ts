import * as fs from 'fs';
import { join } from 'path';

export function getAllFileNameInFolder(folderPath: string) {
  const data = fs.readdirSync(folderPath);
  return data;
}

export function getExecuteFile() {
  const folderPath = join(__dirname, '../../../', 'file-import');
  const allFiles = getAllFileNameInFolder(folderPath);
  const sortedFiles = allFiles.sort((a: string, b: string) => {
    return a < b ? 1 : -1;
  });
  const executeFile = sortedFiles[0] || '';

  return executeFile;
}
