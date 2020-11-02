#!/usr/bin/env node
import tabtab from "@pnpm/tabtab";

export async function main() {
  const cmd = process.argv[2];

  if (cmd === "install-completion") {
    await tabtab
      .install({
        name: "hh",
        completer: "hh-completion",
      })
      .catch((err: any) => {
        console.error("INSTALL ERROR", err); // TODO
      });

    return;
  }

  if (cmd === "uninstall-completion") {
    await tabtab
      .uninstall({
        name: "hh",
      })
      .catch((err: any) => console.error("UNINSTALL ERROR", err)); // TODO

    return;
  }

  if (cmd === "completion") {
    const env = tabtab.parseEnv(process.env);
    try {
      const pathToHardhatAutocomplete = require.resolve(
        "hardhat/internal/cli/autocomplete",
        {
          paths: [process.cwd()],
        }
      );
      const { complete } = require(pathToHardhatAutocomplete);
      const suggestions = await complete(env);
      return tabtab.log(suggestions);
    } catch (e) {
      return tabtab.log([]);
    }
  }
}

main()
  .then(() => process.exit(process.exitCode))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });