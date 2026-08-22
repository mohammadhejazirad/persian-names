import { performance } from 'node:perf_hooks';
import { getGender } from '../dist/index.js';

const inputs = ['علی', 'زهرا', 'باران', 'محمد رضا', 'ناشناخته'];
const iterations = 1_000_000;

getGender(inputs);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  getGender(inputs[index % inputs.length]);
}

const duration = performance.now() - startedAt;
const operationsPerSecond = Math.round(iterations / (duration / 1_000));

console.log(`${operationsPerSecond.toLocaleString('en-US')} lookups/second`);
console.log(`${duration.toFixed(2)} ms for ${iterations.toLocaleString('en-US')} lookups`);
