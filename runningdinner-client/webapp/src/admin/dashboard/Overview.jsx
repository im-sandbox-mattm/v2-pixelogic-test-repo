import React, { useMemo, useState } from 'react';
import OverviewItem from './OverviewItem';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Subtitle } from '../../common/theme/typography/Tags';
import { DEFAULT_END_OF_REGISTRATION_DATE_DAYS_BEFORE_DINNER, formatLocalDate, getTruncatedText, isClosedDinner, LocalDate, minusDays, ValueTranslate } from '@runningdinner/shared';
import { PublicRunningDinnerLink } from './PublicRunningDinnerLink';
import { useCustomSnackbar } from '../../common/theme/CustomSnackbarHook';
import { RUNNING_DINNER_EVENTS_PATH } from '../../common/mainnavigation/NavigationPaths';
import { isLocalDevEnv } from '../../common/EnvService';

export default function Overview({ runningDinner }) {
  const { t } = useTranslation();
  const { showError, showSuccess } = useCustomSnackbar();
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('invite');

  const visibility = runningDinner.basicDetails.registrationType;
  const visibilityLabel = <ValueTranslate value={visibility} prefix="registration_type" />;

  const eventTitle = runningDinner?.publicSettings?.title || runningDinner?.basicDetails?.title || '';
  const publicDinnerUrl = useMemo(() => {
    let url = runningDinner?.publicSettings?.publicDinnerUrl || '';
    if (url && isLocalDevEnv()) {
      url = url.replace('localhost/', 'localhost:3000/').replace('/running-dinner-event/', '/running-dinner-events/');
    }
    if (url) {
      return url;
    }
    const publicDinnerId = runningDinner?.publicSettings?.publicDinnerId;
    if (!publicDinnerId) {
      return '';
    }
    return `${window.location.origin}/${RUNNING_DINNER_EVENTS_PATH}/${publicDinnerId}`;
  }, [runningDinner]);

  const endOfRegistrationDate = useMemo(() => {
    const dateFromPublicSettings = runningDinner?.publicSettings?.endOfRegistrationDate;
    const fallbackDateFromDinnerDate = runningDinner?.basicDetails?.date
      ? minusDays(runningDinner.basicDetails.date, DEFAULT_END_OF_REGISTRATION_DATE_DAYS_BEFORE_DINNER)
      : undefined;
    return formatLocalDate(dateFromPublicSettings || fallbackDateFromDinnerDate) || '';
  }, [runningDinner]);
  const dinnerDate = formatLocalDate(runningDinner?.basicDetails?.date) || '';

  const templates = useMemo(() => {
    return [
      {
        id: 'invite',
        label: t('admin:email_templates_template_invite_label'),
        subject: t('admin:email_templates_template_invite_subject', { eventTitle }),
        body: t('admin:email_templates_template_invite_body', { eventTitle, publicDinnerUrl, endOfRegistrationDate }),
      },
      {
        id: 'deadline',
        label: t('admin:email_templates_template_deadline_label'),
        subject: t('admin:email_templates_template_deadline_subject', { eventTitle }),
        body: t('admin:email_templates_template_deadline_body', { eventTitle, publicDinnerUrl, endOfRegistrationDate }),
      },
      {
        id: 'dayof',
        label: t('admin:email_templates_template_dayof_label'),
        subject: t('admin:email_templates_template_dayof_subject', { eventTitle, dinnerDate }),
        body: t('admin:email_templates_template_dayof_body', { eventTitle, publicDinnerUrl, dinnerDate }),
      },
    ];
  }, [t, eventTitle, publicDinnerUrl, endOfRegistrationDate, dinnerDate]);

  const selectedTemplate = templates.find((tpl) => tpl.id === selectedTemplateId) || templates[0];

  const mailtoHref = useMemo(() => {
    if (!selectedTemplate) {
      return 'mailto:';
    }
    const subject = encodeURIComponent(selectedTemplate.subject || '');
    const body = encodeURIComponent(selectedTemplate.body || '');
    return `mailto:?subject=${subject}&body=${body}`;
  }, [selectedTemplate]);

  async function copyToClipboard(text) {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback for legacy browser support only.
    // Note: document.execCommand('copy') is deprecated, but kept here for older browsers
    // that don't support the modern Clipboard API (navigator.clipboard).
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  async function handleCopy() {
    try {
      const textToCopy = `${selectedTemplate.subject}\n\n${selectedTemplate.body}`;
      await copyToClipboard(textToCopy);
      showSuccess(t('admin:email_templates_copied'));
    } catch (e) {
      showError(t('admin:email_templates_copy_failed'));
    }
  }

  let publicOverviewItems;
  if (!isClosedDinner(runningDinner)) {
    const publicSettings = runningDinner.publicSettings;
    publicOverviewItems = [
      <OverviewItem key={0} headline={t('public_dinner_link')} content={<PublicRunningDinnerLink {...runningDinner} />} />,
      <OverviewItem key={1} headline={t('public_end_of_registration_date')} content={<LocalDate date={publicSettings.endOfRegistrationDate}></LocalDate>} />,
      <OverviewItem key={2} headline={t('public_title')} content={publicSettings.title} />,
      <OverviewItem key={3} headline={t('public_description')} content={getTruncatedText(publicSettings.description, 80)} />,
    ];
  }

  return (
    <Card>
      <CardContent>
        <Subtitle i18n="overview" />
        <div>
          <OverviewItem headline={t('registration_type')} content={visibilityLabel} />
          {publicOverviewItems}
          <OverviewItem
            headline={t('admin:email_templates_headline')}
            content={
              <>
                <Button variant="outlined" size="small" onClick={() => setTemplatesOpen(true)}>
                  {t('admin:email_templates_open')}
                </Button>
                <Dialog open={templatesOpen} onClose={() => setTemplatesOpen(false)} maxWidth="sm" fullWidth>
                  <DialogTitle>{t('admin:email_templates_dialog_title')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{t('admin:email_templates_dialog_description')}</DialogContentText>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="email-template-select-label">{t('admin:email_templates_template_label')}</InputLabel>
                        <Select
                          labelId="email-template-select-label"
                          value={selectedTemplateId}
                          label={t('admin:email_templates_template_label')}
                          onChange={(e) => setSelectedTemplateId(e.target.value)}
                        >
                          {templates.map((tpl) => (
                            <MenuItem key={tpl.id} value={tpl.id}>
                              {tpl.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        label={t('admin:email_templates_subject_label')}
                        value={selectedTemplate.subject}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        label={t('admin:email_templates_body_label')}
                        value={selectedTemplate.body}
                        fullWidth
                        multiline
                        minRows={10}
                        InputProps={{ readOnly: true }}
                      />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCopy}>{t('admin:email_templates_copy')}</Button>
                    <Button component="a" href={mailtoHref} target="_blank" rel="noopener noreferrer">
                      {t('admin:email_templates_open_mailto')}
                    </Button>
                    <Button onClick={() => setTemplatesOpen(false)}>{t('admin:email_templates_close')}</Button>
                  </DialogActions>
                </Dialog>
              </>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
