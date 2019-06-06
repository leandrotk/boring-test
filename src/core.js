import { readFileSync, writeFile } from "fs";

import mkdirp from "mkdirp";
import { dirname, resolve } from "path";

import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "./read.js";

import { callback, getTestPath } from "./write.js";

const generateTest = (template, file) => {
  const componentName = getComponentName(file);
  const templateFile = getTemplateFile(template);

  const templatePath = resolve(__dirname, `../${templateFile}`);
  const content = readFileSync(templatePath, "utf8");

  const newTest = componentReplacement(content, componentName);
  const newTestPath = getTestPath(file);

  mkdirp(dirname(newTestPath), err => {
    if (err) return cb(err);

    writeFile(newTestPath, newTest, callback);
  });
};

export { generateTest };
