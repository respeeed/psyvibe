import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();

const deployDir = path.join(projectRoot, 'deploy', 'netangels', 'psy-vibe-main');
const stagingDir = path.join(deployDir, '_staging_app');
const zipPath = path.join(deployDir, 'app.zip');

async function removeMacArtifacts(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === '__MACOSX') {
          await fs.rm(fullPath, { recursive: true, force: true });
          return;
        }
        await removeMacArtifacts(fullPath);
        return;
      }

      if (entry.isFile() && entry.name === '.DS_Store') {
        await fs.rm(fullPath, { force: true });
      }
    })
  );
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', ...options });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

async function main() {
  // 1) Делаем свежую сборку Astro.
  run('npm', ['run', 'build'], { cwd: projectRoot });

  // 2) Подготавливаем staging-папку под нужную структуру архива.
  // Требование: внутри zip должен быть корень `app/...`, без лишних переносов.
  await fs.rm(stagingDir, { recursive: true, force: true });
  await fs.mkdir(stagingDir, { recursive: true });

  const appDir = path.join(stagingDir, 'app');
  await fs.mkdir(appDir, { recursive: true });

  // 3) Кладём в `app/` то, что NetAngels ожидает для запуска Node-standalone:
  //    - package.json + package-lock.json
  //    - dist/ (из Astro build)
  await fs.copyFile(path.join(projectRoot, 'package.json'), path.join(appDir, 'package.json'));
  await fs.copyFile(
    path.join(projectRoot, 'package-lock.json'),
    path.join(appDir, 'package-lock.json')
  );

  await fs.cp(path.join(projectRoot, 'dist'), path.join(appDir, 'dist'), {
    recursive: true,
    force: true,
  });

  // Keystatic читает с диска `src/content/*` (через createReader(process.cwd(), ...)).
  // Поэтому кладём контент в архив, чтобы на NetAngels новые SEO/тексты применялись
  // после простого "распаковать архив" без дополнительных шагов.
  await fs.cp(path.join(projectRoot, 'src', 'content'), path.join(appDir, 'src', 'content'), {
    recursive: true,
    force: true,
  });

  // На mac часто появляются .DS_Store — их убираем, чтобы не раздувать архив.
  await removeMacArtifacts(stagingDir);

  // 4) Делаем zip так, чтобы корнем была папка `app`.
  await fs.rm(zipPath, { force: true });

  // Пример ожидаемого содержимого:
  //   app/dist/server/entry.mjs
  //   app/package.json
  run('zip', ['-r', zipPath, 'app'], { cwd: stagingDir });

  // 5) Чистим staging.
  await fs.rm(stagingDir, { recursive: true, force: true });

  console.log(`Готово: ${zipPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

