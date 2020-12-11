import { FormlyFieldConfig } from '@ngx-formly/core';

const defaultFields: FormlyFieldConfig[] = [{
  type: 'stepper',
  fieldGroup: [
    {
      templateOptions: {
        label: 'חשבון מקור'
      },
      fieldGroup: [
        {
          key: 'src',
          type: 'list',
          templateOptions: {
            label: 'איזה חשבון תרצה לחייב?',
            required: true
          },
        },
      ],
    },
    {
      templateOptions: { label: 'חשבון יעד' },
      fieldGroup: [
        {
          key: 'dest',
          type: 'list',
          templateOptions: {
            label: 'למי להעביר?',
            required: true,
            filter: true
          },
        },
      ],
    },
    {
      templateOptions: { label: 'סכום' },
      fieldGroup: [
        {
          key: 'sum',
          type: 'keypad',
          templateOptions: {
            type: 'number',
            label: 'סכום',
            required: true,
          },
        },
      ],
    },
    {
      templateOptions: { label: 'הערות' },
      fieldGroup: [
        {
          key: 'comments',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'עבור מה?',
            required: false,
          },
        },
        {
          key: 'act',
          hide: true,
          defaultValue: 'update'
        },
        {
          key: 'dbid',
          hide: true,
          defaultValue: 'masof'
        },
        {
          key: 'lang',
          hide: true,
          defaultValue: 'he'
        },
        {
          key: 'new',
          hide: true,
          defaultValue: '1'
        },
        {
          key: 'd_type',
          hide: true,
          defaultValue: '1'
        },
        {
          key: 'my_facebookName',
          hide: true,
          defaultValue: ''
        },
        {
          key: 'ID',
          hide: true,
          defaultValue: '307434_degem2'
        },
      ],
    },
  ],
}];

export { defaultFields };
