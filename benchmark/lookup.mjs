import { performance } from 'node:perf_hooks';
import { getGender, getName } from '../dist/index.js';

const inputs = ['علی', 'زهرا', 'باران', 'محمد رضا', 'Ali', 'ناشناخته'];
const iterations = 1_000_000;

function measure(label, run) {
  run();
  const startedAt = performance.now();
  for (let index = 0; index < iterations; index += 1) run(index);
  const duration = performance.now() - startedAt;
  const operationsPerSecond = Math.round(iterations / (duration / 1_000));
  console.log(`${label}: ${operationsPerSecond.toLocaleString('en-US')} lookups/second`);
  console.log(`${duration.toFixed(2)} ms for ${iterations.toLocaleString('en-US')} lookups`);
}

measure('getGender', (index = 0) => getGender(inputs[index % inputs.length]));
measure('getName', (index = 0) => getName(inputs[index % inputs.length]));
