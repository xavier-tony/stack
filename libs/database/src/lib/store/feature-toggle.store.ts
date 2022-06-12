import { FEATURE_TOGGLES } from '../data/feature-toggle.data';
import { keyValueToMap } from '../utils';

class FeatureToggleStore {
  featureToggles: Map<string, boolean> = keyValueToMap(FEATURE_TOGGLES);
  get(key: string) {
    return this.featureToggles.get(key);
  }

  set(key: string, flag: boolean) {
    this.featureToggles.set(key, flag);
  }

  getAllFeatureToggles(): Map<string, boolean> {
    return this.featureToggles;
  }
}

export const featureToggleStore = new FeatureToggleStore();
