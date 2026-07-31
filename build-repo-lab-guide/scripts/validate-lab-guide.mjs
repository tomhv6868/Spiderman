import { readFile } from 'node:fs/promises';

const path = process.argv[2];
if (!path) throw new Error('Usage: node validate-lab-guide.mjs <CODELAB.md>');

const markdown = await readFile(path, 'utf8');
const fail = (message) => { throw new Error(`Invalid Codelab Markdown: ${message}`); };
const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!frontmatter) fail('missing YAML frontmatter');

const fields = frontmatter[1]
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.trimStart().startsWith('#'))
  .map((line) => line.match(/^([A-Za-z][A-Za-z0-9_-]*):/)?.[1]);
if (fields.some((field) => !field)) fail('frontmatter contains an invalid field');
if (fields.length !== 19) fail(`expected 19 frontmatter fields, found ${fields.length}`);
if (new Set(fields).size !== fields.length) fail('frontmatter has duplicate fields');
const canonicalFields = [
  'title', 'slug', 'description', 'day', 'duration_minutes', 'level', 'audience',
  'language', 'prerequisites', 'learning_outcomes', 'repository', 'timebox_minutes',
  'team_size', 'format', 'sidebar_group', 'sidebar_order', 'source_status',
  'assumptions', 'last_verified',
];
if (fields.join(',') !== canonicalFields.join(',')) {
  fail(`frontmatter fields must be canonical order: ${canonicalFields.join(', ')}`);
}

const body = markdown.slice(frontmatter[0].length);
if (!body.startsWith(':::goal')) fail('body must start with :::goal');
if (/^# (?!#)/m.test(body)) fail('body contains H1');
if (/^#{2,6} .*?[\p{Extended_Pictographic}]/mu.test(body)) fail('heading contains emoji');
if (/\b(?:TODO|TBD)\b/i.test(markdown) || /\{\{[^}]+\}\}/.test(markdown)) fail('unresolved placeholder');

const allowed = new Set(['goal', 'checkpoint', 'caution', 'input', 'export', 'os', 'quiz']);
for (const match of body.matchAll(/^:::(\w+)/gm)) {
  if (!allowed.has(match[1])) fail(`unsupported directive :::${match[1]}`);
}

const inputTargets = [...body.matchAll(/^:::input\{([^}]*)\}/gm)].map((match) => {
  const target = match[1].match(/\btarget="([^"]+)"/);
  if (!target) fail(':::input is missing target');
  return target[1];
});
const exports = [...body.matchAll(/^:::export\{([^}]*)\}/gm)].map((match) => match[1]).join('\n');
if (!exports) fail('missing :::export');
for (const target of inputTargets) {
  if (!exports.includes(target)) fail(`input target missing from :::export: ${target}`);
}

const fences = [...markdown.matchAll(/^```/gm)].length;
if (fences % 2) fail('unclosed code fence');
console.log(`Validated ${path}: 19 fields, directives, input/export targets, headings, and code fences.`);
