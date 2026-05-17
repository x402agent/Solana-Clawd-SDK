#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { buildPerpsCommand } from "./commands/perps-commands.js";

const program = new Command()
  .name("clawd-perps")
  .description("ClaWD Perps — Phoenix Perpetuals DEX CLI powered by the OpenClawd framework")
  .version("1.0.0");

program.addCommand(buildPerpsCommand());

// Top-level aliases for ergonomics
program.addCommand(buildPerpsCommand().copyInheritedSettings(program).name("market").alias("m"), { hidden: true });

program.parseAsync(process.argv).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
