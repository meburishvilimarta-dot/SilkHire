'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  budgetRanges,
  clientBriefSchema,
  startTimelines,
  type ClientBriefInput,
  type ClientBriefValues,
} from '@/lib/schemas/clientBrief';
import { serviceCategories } from '@/data/taxonomies';
import { Button } from '@/components/ui/Button';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import {
  ErrorSummary,
  FormError,
  FormSuccess,
  Honeypot,
  type SubmitState,
} from './FormStatus';

const REPLY_DAYS = 5;

export function ClientBriefForm() {
  const t = useTranslations('forms.clientBrief');
  const tForms = useTranslations('forms');
  const tErrors = useTranslations('forms.errors');
  const tCategories = useTranslations('taxonomies.categories');
  const [status, setStatus] = useState<SubmitState>('idle');

  // Three generics because the schema transforms: the form holds strings
  // (what the DOM gives us) and the resolver hands back parsed values.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientBriefInput, undefined, ClientBriefValues>({
    resolver: zodResolver(clientBriefSchema),
    defaultValues: {
      serviceNeeded: '',
      monthlyBudget: '' as ClientBriefInput['monthlyBudget'],
      startTimeline: '' as ClientBriefInput['startTimeline'],
    },
  });

  /**
   * Zod carries translation *keys* rather than sentences, so the message only
   * becomes readable here, where a translator exists. Anything unrecognised
   * falls back to a generic line rather than leaking a key into the UI.
   */
  function messageFor(key?: string): string | undefined {
    if (!key) return undefined;
    return tErrors.has(key) ? tErrors(key) : tErrors('generic');
  }

  async function onSubmit(values: ClientBriefValues) {
    setStatus('submitting');
    try {
      const response = await fetch('/api/client-brief', {
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-6">
      {status === 'error' ? <FormError /> : null}
      <ErrorSummary count={Object.keys(errors).length} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label={t('fields.name')}
          optionalLabel={tForms('optional')}
          autoComplete="name"
          error={messageFor(errors.name?.message)}
          {...register('name')}
        />
        <TextField
          label={t('fields.company')}
          optionalLabel={tForms('optional')}
          autoComplete="organization"
          error={messageFor(errors.company?.message)}
          {...register('company')}
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
          label={t('fields.phone')}
          optionalLabel={tForms('optional')}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+995 5XX XXX XXX"
          error={messageFor(errors.phone?.message)}
          {...register('phone')}
        />
      </div>

      <SelectField
        label={t('fields.serviceNeeded')}
        optionalLabel={tForms('optional')}
        placeholder={tForms('selectPlaceholder')}
        options={serviceCategories.map((category) => ({
          value: category,
          label: tCategories(category),
        }))}
        error={messageFor(errors.serviceNeeded?.message)}
        {...register('serviceNeeded')}
      />

      <div className="grid gap-6 sm:grid-cols-[2fr_1fr]">
        <TextField
          label={t('fields.roles')}
          hint={t('fields.rolesHint')}
          optionalLabel={tForms('optional')}
          error={messageFor(errors.roles?.message)}
          {...register('roles')}
        />
        <TextField
          label={t('fields.headcount')}
          hint={t('fields.headcountHint')}
          optionalLabel={tForms('optional')}
          type="number"
          inputMode="numeric"
          min={1}
          max={500}
          error={messageFor(errors.headcount?.message)}
          {...register('headcount')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label={t('fields.monthlyBudget')}
          optionalLabel={tForms('optional')}
          placeholder={tForms('selectPlaceholder')}
          options={budgetRanges.map((range) => ({
            value: range,
            label: t(`budgetRanges.${range}`),
          }))}
          error={messageFor(errors.monthlyBudget?.message)}
          {...register('monthlyBudget')}
        />
        <SelectField
          label={t('fields.startTimeline')}
          optionalLabel={tForms('optional')}
          placeholder={tForms('selectPlaceholder')}
          options={startTimelines.map((timeline) => ({
            value: timeline,
            label: t(`startTimelines.${timeline}`),
          }))}
          error={messageFor(errors.startTimeline?.message)}
          {...register('startTimeline')}
        />
      </div>

      <TextareaField
        label={t('fields.description')}
        hint={t('fields.descriptionHint')}
        optionalLabel={tForms('optional')}
        error={messageFor(errors.description?.message)}
        {...register('description')}
      />

      <Honeypot name="client-brief" registration={register('website')} />

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? tForms('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
