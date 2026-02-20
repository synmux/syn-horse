#!/usr/bin/env bun

/**
 * Pre-flight check ensuring `trunk` is available before trunk-dependent operations.
 *
 * Resolution order:
 *   1. Global `trunk` binary on PATH
 *   2. `bun run trunk` via @trunkio/launcher
 *
 * Exits 0 on success (printing version), 1 on failure (printing guidance to stderr).
 */

interface ProbeResult {
  found: boolean
  version: string
  source: string
}

async function probeTrunkGlobal(): Promise<ProbeResult> {
  try {
    const trunkProcess = Bun.spawn(["trunk", "--version"], {
      stdout: "pipe",
      stderr: "ignore",
    })
    const exitCode = await trunkProcess.exited
    if (exitCode !== 0) {
      return { found: false, version: "", source: "" }
    }
    const standardOutput = await new Response(trunkProcess.stdout).text()
    const trimmedVersion = standardOutput.trim()
    return { found: true, version: trimmedVersion, source: "global" }
  } catch {
    return { found: false, version: "", source: "" }
  }
}

async function probeTrunkViaBun(): Promise<ProbeResult> {
  try {
    const trunkProcess = Bun.spawn(["bun", "run", "trunk", "--version"], {
      stdout: "pipe",
      stderr: "ignore",
    })
    const exitCode = await trunkProcess.exited
    if (exitCode !== 0) {
      return { found: false, version: "", source: "" }
    }
    const standardOutput = await new Response(trunkProcess.stdout).text()
    const trimmedVersion = standardOutput.trim()
    return { found: true, version: trimmedVersion, source: "@trunkio/launcher" }
  } catch {
    return { found: false, version: "", source: "" }
  }
}

async function ensureTrunkAvailable(): Promise<void> {
  const globalProbe = await probeTrunkGlobal()
  if (globalProbe.found) {
    console.log(`trunk found (${globalProbe.source}): ${globalProbe.version}`)
    process.exit(0)
  }

  const bunLauncherProbe = await probeTrunkViaBun()
  if (bunLauncherProbe.found) {
    console.log(`trunk found (${bunLauncherProbe.source}): ${bunLauncherProbe.version}`)
    process.exit(0)
  }

  console.error(
    "error: trunk is not available.\n" +
      "\n" +
      "Install trunk using one of the following methods:\n" +
      "  1. Install globally:  curl https://get.trunk.io -fsSL | bash\n" +
      "  2. Install launcher:  bun add -d @trunkio/launcher\n" +
      "\n" +
      "See https://docs.trunk.io/check/usage for more information.",
  )
  process.exit(1)
}

await ensureTrunkAvailable()

export {}
