"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = startWorker;
const bullmq_1 = require("bullmq");
const ioredis_1 = require("ioredis");
// Minimal long-running worker entry so the container process doesn't exit.
// Replace the heartbeat and placeholder logic with real job processing as needed.
async function startWorker() {
    // Ensure BullMQ-compatible redis options. `maxRetriesPerRequest` must be null.
    const connection = new ioredis_1.default(process.env.REDIS_URL || "redis://redis:6379", {
        maxRetriesPerRequest: null,
    });
    const worker = new bullmq_1.Worker("default", async (job) => {
        console.log(`Processing job ${job.id}`);
        return { success: true };
    }, 
    // `bullmq` and `ioredis` may have slightly different type instances in workspaces;
    // cast to `any` to avoid type incompatibilities at compile time.
    { connection: connection });
    worker.on("completed", job => {
        console.log(`Job ${job.id} completed`);
    });
    worker.on("failed", (job, err) => {
        console.error(`Job ${job?.id} failed`, err);
    });
    console.log("worker started and listening for jobs");
    // Simple heartbeat so logs show the worker is alive.
    const heartbeat = setInterval(() => {
        // eslint-disable-next-line no-console
        console.log('worker heartbeat');
    }, 10_000);
    // Graceful shutdown handlers
    const shutdown = (signal) => {
        // eslint-disable-next-line no-console
        console.log(`received ${signal}, shutting down`);
        clearInterval(heartbeat);
        // perform any cleanup here (close redis, db connections, etc.)
        process.exit(0);
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    // Keep the process alive indefinitely until a signal is received.
    await new Promise(() => {
        /* never resolves */
    });
}
if (require.main === module) {
    startWorker().catch((err) => {
        // eslint-disable-next-line no-console
        console.error('worker failed:', err);
        process.exit(1);
    });
}
//# sourceMappingURL=worker.js.map