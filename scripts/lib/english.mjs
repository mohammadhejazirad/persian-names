import { readFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { EXTRA_ENGLISH, GOLD_BY_NAME } from './gold.mjs';

const CONS = {
  ب: 'b',
  پ: 'p',
  ت: 't',
  ث: 's',
  ج: 'j',
  چ: 'ch',
  ح: 'h',
  خ: 'kh',
  د: 'd',
  ذ: 'z',
  ر: 'r',
  ز: 'z',
  ژ: 'zh',
  س: 's',
  ش: 'sh',
  ص: 's',
  ض: 'z',
  ط: 't',
  ظ: 'z',
  غ: 'gh',
  ف: 'f',
  ق: 'gh',
  ک: 'k',
  گ: 'g',
  ل: 'l',
  م: 'm',
  ن: 'n',
};

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function polish(name, folded) {
  let english = folded.toLowerCase().replace(/[^a-z]/gu, '');
  if (!name.includes('یی')) english = english.replaceAll('ii', 'i');
  english = english.replaceAll('q', 'gh');
  const rehCount = [...name].filter((char) => char === 'ر').length;
  if (rehCount < 2) english = english.replaceAll('rr', 'r');
  if (
    name.endsWith('ه') &&
    !name.endsWith('اه') &&
    !name.endsWith('وه') &&
    english.endsWith('e') &&
    !english.endsWith('ee')
  ) {
    english += 'h';
  }
  if (!/^[a-z]{2,}$/u.test(english)) return '';
  return capitalize(english);
}

function fallback(name) {
  let out = '';
  const chars = [...name];
  for (let index = 0; index < chars.length; index += 1) {
    const current = chars[index];
    const previous = chars[index - 1];
    const next = chars[index + 1];
    if (current === 'آ' || current === 'ا') {
      out += 'a';
      continue;
    }
    if (current === 'ی' || current === 'ئ') {
      out += previous === 'ا' || previous === 'آ' || next === 'ا' ? 'y' : 'i';
      continue;
    }
    if (current === 'و') {
      if (!previous || previous === 'ا' || previous === 'آ' || next === 'ا') out += 'v';
      else if (index === chars.length - 1) out += 'u';
      else out += 'o';
      continue;
    }
    if (current === 'ه') {
      out += index === chars.length - 1 && previous !== 'ا' && previous !== 'و' ? 'eh' : 'h';
      continue;
    }
    if (current === 'ع' || current === 'ء') {
      if (!out.endsWith('a')) out += 'a';
      continue;
    }
    out += CONS[current] ?? '';
  }
  return out.replace(/[^a-z]/gu, '');
}

function segment(name, names, folded) {
  const parts = [];
  let index = 0;
  while (index < name.length) {
    let end = -1;
    for (let cursor = name.length; cursor >= index + 3; cursor -= 1) {
      if (index === 0 && cursor === name.length) continue;
      const part = name.slice(index, cursor);
      if (names.has(part) && folded.has(part)) {
        end = cursor;
        break;
      }
    }
    if (end < 0) return '';
    parts.push(folded.get(name.slice(index, end)));
    index = end;
  }
  return parts.length >= 2 ? parts.join('') : '';
}

export async function loadFoldedEnglish() {
  const compressed = await readFile(
    new URL('../../src/assets/english-folded.tsv.gz', import.meta.url)
  );
  const folded = new Map();
  for (const line of gunzipSync(compressed).toString('utf8').split('\n')) {
    if (!line) continue;
    const tab = line.indexOf('\t');
    folded.set(line.slice(0, tab), line.slice(tab + 1));
  }
  return folded;
}

export function englishFor(name, names, folded) {
  const gold = GOLD_BY_NAME.get(name);
  if (gold) return gold.english;
  const extra = EXTRA_ENGLISH.get(name);
  if (extra) return extra;

  const known = folded.get(name);
  if (known) {
    const polished = polish(name, known);
    if (polished) return polished;
  }

  const segmented = segment(name, names, folded);
  if (segmented) {
    const polished = polish(name, segmented);
    if (polished) return polished;
  }

  const synthesized = polish(name, fallback(name));
  if (!synthesized) throw new Error(`No English spelling for ${name}`);
  return synthesized;
}
