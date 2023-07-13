import * as fs from 'fs-extra';

const state = {
  fileTags: Object,
  fileNamesByTags: new Map<string, string>()
}
interface FileTags {
  [file_path: string]: string[];
}

export const pipelineActions = {
  load() {
    console.log('XXXXXXXXXXXXXXXXXXXX')
    const filePath = '../../prototypes/notebooks/pipeline_generation/data/tags.json';
    console.log('YYYYYYYYYYYYYYYYYY')
    fs.readJson(filePath)
      .then(jsonData => {
        state.fileTags = jsonData
        console.log('Parsed JSON object:', jsonData);
        const result = this.searchFilesByTags(['npm', 'gcp', 'github']);
        console.log(result);
      })
      .catch(err => {
        console.error('Error reading or parsing JSON:', err);
      });

  },

  searchFilesByTags(tags: string[]): string[] {
    console.log('==========================================')
    console.log(`tags:`, tags)
    return Object.entries(state.fileTags)
      .filter(([file_path, ftags]) => tags.every(tag => ftags.includes(tag)))
      .map(([file_path]) => file_path);
  },

  getFileContentByTags(tags: string[]): string {
    const matchingFiles = this.searchFilesByTags(tags);
    if (matchingFiles.length === 0) {
      throw new Error(`Error: no tag matching to tags ${tags} pipeline found.`);
    }
    if (matchingFiles.length === 1) {
      const filePath = matchingFiles[0];
      console.log("../../prototypes/notebooks/pipeline_generation/data/" + filePath)
      try {
        const fileContents = fs.readFileSync("../../prototypes/notebooks/pipeline_generation/data/" + filePath, 'utf8');
        return fileContents;
      } catch (err) {
        throw new Error(`Error: Failed to read file ${filePath}.`);
      }
    } else {
      throw new Error("Error: The specified tags match more than one file.");
    }
  }

}