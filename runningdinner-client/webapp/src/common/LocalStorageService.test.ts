import { beforeEach, describe, expect, it } from 'vitest';

import {
  deleteLocalStorageInAdminId,
  getLocalStorageInAdminId,
  setLocalStorageInAdminId,
} from './LocalStorageService';

describe('LocalStorageService (adminId scoping)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('namespaces values by adminId (no cross-admin leakage)', () => {
    const key = 'test_key';
    const adminA = 'adminA';
    const adminB = 'adminB';

    setLocalStorageInAdminId(key, { v: 1 }, adminA);
    setLocalStorageInAdminId(key, { v: 2 }, adminB);

    expect(getLocalStorageInAdminId<{ v: number }>(key, adminA)).toEqual({ v: 1 });
    expect(getLocalStorageInAdminId<{ v: number }>(key, adminB)).toEqual({ v: 2 });

    deleteLocalStorageInAdminId(key, adminA);
    expect(getLocalStorageInAdminId<{ v: number }>(key, adminA)).toBeUndefined();
    expect(getLocalStorageInAdminId<{ v: number }>(key, adminB)).toEqual({ v: 2 });
  });
});
