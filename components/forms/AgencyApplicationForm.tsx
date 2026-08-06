'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  agencyApplicationSchema,
  type AgencyApplicationInput,
  type AgencyApplicationValues,
} from '@/lib/schemas/agencyApplication';
import { countries, englishLevels, serviceCategories } from '@/data/taxonomies';
import { Button } from '@/components/ui/Button';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import { CheckboxGroup } from './fields/CheckboxGroup';
import {
  ErrorSummary,
  FormError,
  FormSuccess,
  Honeypot,
  type SubmitState,
} from './FormStatus';

const REPLY_DAYS = 5;

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="mb-6 text-xs font-semibold tracking-[0.12em] text-accent uppercase">
        {legend}
      </legend>
      <div className="space-y-6">{children}</div>
    </fieldset>
  );
}

export function AgencyApplicationForm() {
  const t = useTranslations('forms.agencyApplication');
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('forms.errors');
  const tCategories = useTranslations('taxonomies.categories');
  const tCountries = useTranslations('taxonomies.countries');
  const tEnglish = useTranslations('taxonomies.englishLevels');
  const [status, setStatus] = useState<SubmitState>('idle');

  // See the note in `ClientBriefForm` — the schema transforms, so the form
  // values and the resolved values are different types.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyApplicationInput, undefined, AgencyApplicationValues>({
    resolver: zodResolver(agencyApplicationSchema),
    defaultValues: {
      country: '',
      englishProficiency: '',
      categories: [],
    },
  });

  /** See the note in `ClientBriefForm` — zod messages are translation keys. */
  function messageFor(key?: string): string | undefined {
    if (!key) return undefined;
    return tErrors.has(key) ? tErrors(key) : tErrors('generic');
  }

  async function onSubmit(values: AgencyApplicationValues) {
    setStatus('submitting');
    try {
      const response = await fetch('/api/agency-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <FormSuccess replyDays={REPLY_DAYS} onReset={() => setStatus('idle')} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-8">
      {status === 'error' ? <FormError /> : null}
      <ErrorSummary count={Object.keys(errors).length} />

      <Fieldset legend={t('sections.agency')}>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label={t('fields.agencyName')}
            optionalLabel={tForms('optional')}
            autoComplete="organization"
            error={messageFor(errors.agencyName?.message)}
            {...register('agencyName')}
          />
          <TextField
            label={t('fields.contactName')}
            optionalLabel={tForms('optional')}
            autoComplete="name"
            error={messageFor(errors.contactName?.message)}
            {...register('contactName')}
          />
          <TextField
            label={t('fields.email')}
            optionalLabel={tForms('optional')}
            type="email"
            inputMode="email"
            autoComplete="email"
            error={messageFor(errors.email?.message)}
            {...register('email')}
          />
          <TextField
            label={t('fields.website')}
            optionalLabel={tForms('optional')}
            inputMode="url"
            placeholder="https://"
            error={messageFor(errors.website?.message)}
            {...register('website')}
          />
          <SelectField
            label={t('fields.country')}
            optionalLabel={tForms('optional')}
            placeholder={tForms('selectPlaceholder')}
            options={countries.map((country) => ({
              value: country,
              label: tCountries(country),
            }))}
            error={messageFor(errors.country?.message)}
            {...register('country')}
          />
          <TextField
            label={t('fields.city')}
            optionalLabel={tForms('optional')}
            autoComplete="address-level2"
            error={messageFor(errors.city?.message)}
            {...register('city')}
          />
          <TextField
            label={t('fields.foundedYear')}
            optionalLabel={tForms('optional')}
            type="number"
            inputMode="numeric"
            min={1950}
            max={new Date().getFullYear()}
            error={messageFor(errors.foundedYear?.message)}
            {...register('foundedYear')}
          />
          <TextField
            label={t('fields.teamSize')}
            optionalLabel={tForms('optional')}
            type="number"
            inputMode="numeric"
            min={1}
            error={messageFor(errors.teamSize?.message)}
            {...register('teamSize')}
          />
        </div>
      </Fieldset>

      <Fieldset legend={t('sections.capability')}>
        <CheckboxGroup
          legend={t('fields.categories')}
          hint={t('fields.categoriesHint')}
          error={messageFor(errors.categories?.message)}
          options={serviceCategories.map((category) => ({
            value: category,
            label: tCategories(category),
          }))}
          registration={register('categories')}
        />

        <SelectField
          label={t('fields.englishProficiency')}
          optionalLabel={tForms('optional')}
          placeholder={tForms('selectPlaceholder')}
          options={englishLevels.map((level) => ({
            value: level,
            label: tEnglish(level),
          }))}
          error={messageFor(errors.englishProficiency?.message)}
          {...register('englishProficiency')}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label={t('fields.hourlyRateMin')}
            optionalLabel={tForms('optional')}
            type="number"
            inputMode="numeric"
            min={1}
            error={messageFor(errors.hourlyRateMin?.message)}
            {...register('hourlyRateMin')}
          />
          <TextField
            label={t('fields.hourlyRateMax')}
            optionalLabel={tForms('optional')}
            type="number"
            inputMode="numeric"
            min={1}
            error={messageFor(errors.hourlyRateMax?.message)}
            {...register('hourlyRateMax')}
          />
        </div>
      </Fieldset>

      <Fieldset legend={t('sections.evidence')}>
        <TextareaField
          label={t('fields.description')}
          hint={t('fields.descriptionHint')}
          optionalLabel={tForms('optional')}
          error={messageFor(errors.description?.message)}
          {...register('description')}
        />
        <TextareaField
          label={t('fields.references')}
          hint={t('fields.referencesHint')}
          optional
          optionalLabel={tForms('optional')}
          rows={4}
          error={messageFor(errors.references?.message)}
          {...register('references')}
        />
      </Fieldset>

      <Honeypot name="agency-application" registration={register('fax')} />

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? tForms('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
