import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { RUNNING_DINNER_EVENTS_PATH } from '../../common/mainnavigation/NavigationPaths';
import Overview from './Overview';

vi.mock('react-i18next', () => {
  function interpolate(template: string, values: Record<string, unknown> | undefined) {
    if (!values) {
      return template;
    }
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, key) => {
      const value = values[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  return {
    useTranslation: () => ({
      t: (key: string, values?: Record<string, unknown>) => {
        switch (key) {
          case 'admin:email_templates_open':
            return 'OPEN_TEMPLATES';
          case 'admin:email_templates_copy':
            return 'COPY';
          case 'admin:email_templates_open_mailto':
            return 'OPEN_EMAIL_DRAFT';
          case 'admin:email_templates_close':
            return 'CLOSE';
          case 'admin:email_templates_dialog_title':
            return 'Email & reminder templates';
          case 'admin:email_templates_dialog_description':
            return 'Copy/paste these templates into your email client.';
          case 'admin:email_templates_template_label':
            return 'Template';
          case 'admin:email_templates_subject_label':
            return 'Subject';
          case 'admin:email_templates_body_label':
            return 'Message';
          case 'admin:email_templates_template_invite_label':
            return 'Invitation / registration link';
          case 'admin:email_templates_template_deadline_label':
            return 'Reminder: registration deadline';
          case 'admin:email_templates_template_dayof_label':
            return 'Reminder: day of event';

          // The important ones: subject/body with placeholders
          case 'admin:email_templates_template_invite_subject':
            return interpolate('Invitation: {{eventTitle}}', values);
          case 'admin:email_templates_template_invite_body':
            return interpolate(
              'Hi,\n\nRegister here:\n{{publicDinnerUrl}}\n\nRegistration deadline: {{endOfRegistrationDate}}\n\nThanks!',
              values
            );
          case 'admin:email_templates_template_deadline_subject':
            return interpolate('Reminder: {{eventTitle}}', values);
          case 'admin:email_templates_template_deadline_body':
            return interpolate('Deadline: {{endOfRegistrationDate}}\n{{publicDinnerUrl}}', values);
          case 'admin:email_templates_template_dayof_subject':
            return interpolate('Today: {{eventTitle}}', values);
          case 'admin:email_templates_template_dayof_body':
            return interpolate('Event date: {{dinnerDate}}\n{{publicDinnerUrl}}', values);

          case 'admin:email_templates_copied':
            return 'COPIED';
          case 'admin:email_templates_copy_failed':
            return 'COPY_FAILED';

          // fallback: make other keys readable
          default:
            return key;
        }
      },
    }),
  };
});

vi.mock('../../common/theme/CustomSnackbarHook', () => {
  return {
    useCustomSnackbar: () => ({
      showSuccess: vi.fn(),
      showError: vi.fn(),
    }),
  };
});

vi.mock('./OverviewItem', () => {
  return {
    default: ({ headline, content }: any) => (
      <div>
        <div>{headline}</div>
        <div>{content}</div>
      </div>
    ),
  };
});

vi.mock('../../common/theme/typography/Tags', () => {
  return {
    Subtitle: ({ i18n }: any) => <div data-testid="subtitle">{i18n}</div>,
  };
});

vi.mock('./PublicRunningDinnerLink', () => {
  return {
    PublicRunningDinnerLink: () => <div data-testid="public-link" />,
  };
});

vi.mock('../../common/EnvService', () => {
  return {
    isLocalDevEnv: () => false,
  };
});

vi.mock('@runningdinner/shared', async () => {
  const actual = await vi.importActual<any>('@runningdinner/shared');
  return {
    ...actual,
    ValueTranslate: ({ value }: any) => <span>{String(value)}</span>,
    LocalDate: ({ date }: any) => <span>{String(date)}</span>,
  };
});

function createRunningDinner(overrides: Partial<any> = {}) {
  return {
    adminId: 'admin-1',
    email: 'test@example.com',
    basicDetails: {
      registrationType: 'OPEN',
      title: 'RunningDinner',
      city: 'X',
      zip: '12345',
      date: new Date(2026, 0, 15), // local date
      languageCode: 'en',
    },
    options: {
      meals: [],
    },
    publicSettings: {
      title: 'RunningDinner',
      description: 'desc',
      publicContactName: 'A',
      publicContactEmail: 'a@example.com',
      publicContactMobileNumber: '1',
      publicDinnerId: 'MvkdNEodlf',
      publicDinnerUrl: '',
      endOfRegistrationDate: undefined,
    },
    ...overrides,
  };
}

describe('Overview email templates', () => {
  beforeEach(() => {
    // Ensure clipboard exists
    (globalThis as any).navigator = (globalThis as any).navigator || {};
    (globalThis as any).navigator.clipboard = {
      writeText: vi.fn(),
    };
  });

  it('interpolates subject/body and uses fallbacks for url + registration deadline', async () => {
    const runningDinner = createRunningDinner({
      publicSettings: {
        ...createRunningDinner().publicSettings,
        publicDinnerId: 'MvkdNEodlf',
        publicDinnerUrl: '',
        endOfRegistrationDate: undefined,
      },
    });

    render(<Overview runningDinner={runningDinner} />);

    fireEvent.click(screen.getByRole('button', { name: 'OPEN_TEMPLATES' }));

    // Subject
    expect(screen.getByDisplayValue('Invitation: RunningDinner')).toBeInTheDocument();

    // Message should contain a generated URL (via publicDinnerId) and the fallback date (15 Jan - 5 days = 10 Jan)
    const message = screen.getByDisplayValue(/Registration deadline: 10\.01\.2026/);
    expect(message).toBeInTheDocument();
    expect(screen.getByDisplayValue(new RegExp(`${RUNNING_DINNER_EVENTS_PATH}/MvkdNEodlf`))).toBeInTheDocument();
  });

  it('copies subject + body to clipboard', async () => {
    const runningDinner = createRunningDinner();

    render(<Overview runningDinner={runningDinner} />);

    fireEvent.click(screen.getByRole('button', { name: 'OPEN_TEMPLATES' }));
    fireEvent.click(screen.getByRole('button', { name: 'COPY' }));

    const writeText = (navigator as any).clipboard.writeText as ReturnType<typeof vi.fn>;
    expect(writeText).toHaveBeenCalledTimes(1);

    const copiedText = writeText.mock.calls[0][0] as string;
    expect(copiedText).toContain('Invitation: RunningDinner');
    expect(copiedText).toContain('Registration deadline: 10.01.2026');
  });

  it('creates a mailto href with encoded subject/body', async () => {
    const runningDinner = createRunningDinner();

    render(<Overview runningDinner={runningDinner} />);

    fireEvent.click(screen.getByRole('button', { name: 'OPEN_TEMPLATES' }));

    const link = screen.getByRole('link', { name: 'OPEN_EMAIL_DRAFT' });
    const href = link.getAttribute('href') || '';

    expect(href.startsWith('mailto:?subject=')).toBe(true);
    expect(href).toContain(encodeURIComponent('Invitation: RunningDinner'));
    expect(href).toContain(encodeURIComponent('Registration deadline: 10.01.2026'));
  });
});
