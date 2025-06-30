// src/api.ts
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import type { Schema } from "../amplify/data/resource"; // If you generated types

export const client = generateClient<Schema>({
  outputs,
});

