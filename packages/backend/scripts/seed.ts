import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { config as loadEnv } from "dotenv";

const backendRoot = import.meta.dir
  ? resolve(import.meta.dir, "..")
  : process.cwd();
const envPath = resolve(backendRoot, ".env");
const envLocalPath = resolve(backendRoot, ".env.local");
let selectedEnvPath: null | string = null;

if (existsSync(envPath)) {
  selectedEnvPath = envPath;
} else if (existsSync(envLocalPath)) {
  selectedEnvPath = envLocalPath;
}

if (selectedEnvPath) {
  loadEnv({ override: false, path: selectedEnvPath });
}

const requiredEnv = {
  ROOT_ADMIN_EMAIL: process.env.ROOT_ADMIN_EMAIL,
  ROOT_ADMIN_NAME: process.env.ROOT_ADMIN_NAME,
  ROOT_ADMIN_PASSWORD: process.env.ROOT_ADMIN_PASSWORD,
};

const missingEnv = Object.entries(requiredEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnv.length > 0) {
  throw new Error(
    `Missing required seed env vars: ${missingEnv.join(", ")}. Loaded env from ${selectedEnvPath ?? "no env file"}.`
  );
}

const payload = JSON.stringify({
  email: requiredEnv.ROOT_ADMIN_EMAIL,
  name: requiredEnv.ROOT_ADMIN_NAME,
  password: requiredEnv.ROOT_ADMIN_PASSWORD,
});

const command = [
  "bunx",
  "convex",
  "run",
  "--push",
  "seed:seedRootAdmin",
  payload,
];
const processResult = Bun.spawn(command, {
  cwd: backendRoot,
  stderr: "inherit",
  stdin: "inherit",
  stdout: "inherit",
});

const exitCode = await processResult.exited;

if (exitCode !== 0) {
  throw new Error(`Seed command failed with exit code ${exitCode}.`);
}
