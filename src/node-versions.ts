import axios from 'axios';

import {
  NodeApiReleaseDescriptor,
  NodeReleaseDescriptor
} from 'etc/types';

import {
  parseRelease,
  releaseComparator
} from 'lib/utils';


/**
 * Object returned by getCurrentNodeVersions.
 */
export interface NodeVersionsResult {
  lts: Array<NodeReleaseDescriptor>;
  latest: NodeReleaseDescriptor;
}


export default async function getCurrentNodeVersions(): Promise<NodeVersionsResult> {
  try {
    const releases: Array<NodeApiReleaseDescriptor> = (await axios.get('https://nodejs.org/dist/index.json')).data;

    const releasesSorted = releases.sort((a, b) => releaseComparator(a.version, b.version)).reverse();

    const ltsReleases = releasesSorted.filter(release => release.lts !== false);

    if (ltsReleases.length === 0) {
      throw new Error('Could not determine LTS release.');
    }

    const latestRelease = releasesSorted.find(release => release.lts === false);

    if (!latestRelease) {
      throw new Error('Could not determine latest release.');
    }

    return {
      lts: ltsReleases.map(release => parseRelease(release)),
      latest: parseRelease(latestRelease)
    };
  } catch (err) {
    throw new Error(`Unable to fetch Node releases: ${err.message}`);
  }
}
