import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { NavigationStep } from '@runningdinner/shared';

import { WIZARD_ROOT_PATH } from '../common/mainnavigation/NavigationPaths';
import useWizardNavigation from './WizardNavigationHook';

const { navigateMock, getSearch } = vi.hoisted(() => {
  const navigateMock = vi.fn();
  let search = '?demoDinner=true';

  return {
    navigateMock,
    getSearch: () => search,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ search: getSearch() }),
  };
});

describe('useWizardNavigation', () => {
  it('generates wizard step path with query and navigates safely', () => {
    const step: NavigationStep = { label: 'options', value: '/options' };
    const expectedPath = `${WIZARD_ROOT_PATH}${step.value}${getSearch()}`;

    const { result } = renderHook(() => useWizardNavigation());

    expect(result.current.generateWizardStepPath(undefined)).toBeUndefined();
    expect(result.current.generateWizardStepPath(step)).toBe(expectedPath);

    result.current.navigateToWizardStep(undefined);
    expect(navigateMock).not.toHaveBeenCalled();

    result.current.navigateToWizardStep(step);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(expectedPath);
  });
});
