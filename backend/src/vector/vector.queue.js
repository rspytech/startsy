import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(); // defaults to localhost:6379
export const vectorQueue = new Queue('vectorQueue', { connection });
export const userVectorQueue = new Queue('userVectorQueue', { connection });