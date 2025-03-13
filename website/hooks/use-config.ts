import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Config = {
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
};

const configAtom = atomWithStorage<Config>('config', {
  packageManager: 'npm',
});

export function useConfig() {
  return useAtom(configAtom);
}
