export function language() {
  return {
    cancel:        I18n.t('misc.cancel'),
    clear:         I18n.t('misc.clear'),
    done:          I18n.t('misc.ok'),
    previousMonth: '‹',
    nextMonth:     '›',
    months: [
                   I18n.t('date.month_names.1'),
                   I18n.t('date.month_names.2'),
                   I18n.t('date.month_names.3'),
                   I18n.t('date.month_names.4'),
                   I18n.t('date.month_names.5'),
                   I18n.t('date.month_names.6'),
                   I18n.t('date.month_names.7'),
                   I18n.t('date.month_names.8'),
                   I18n.t('date.month_names.9'),
                   I18n.t('date.month_names.10'),
                   I18n.t('date.month_names.11'),
                   I18n.t('date.month_names.12')
    ],
    monthsShort: [
                   I18n.t('date.abbr_month_names.1'),
                   I18n.t('date.abbr_month_names.2'),
                   I18n.t('date.abbr_month_names.3'),
                   I18n.t('date.abbr_month_names.4'),
                   I18n.t('date.abbr_month_names.5'),
                   I18n.t('date.abbr_month_names.6'),
                   I18n.t('date.abbr_month_names.7'),
                   I18n.t('date.abbr_month_names.8'),
                   I18n.t('date.abbr_month_names.9'),
                   I18n.t('date.abbr_month_names.10'),
                   I18n.t('date.abbr_month_names.11'),
                   I18n.t('date.abbr_month_names.12')
    ],
    weekdays: [
                   I18n.t('date.day_names.0'),
                   I18n.t('date.day_names.1'),
                   I18n.t('date.day_names.2'),
                   I18n.t('date.day_names.3'),
                   I18n.t('date.day_names.4'),
                   I18n.t('date.day_names.5'),
                   I18n.t('date.day_names.6')
    ],
    weekdaysShort: [
                   I18n.t('date.abbr_day_names.0'),
                   I18n.t('date.abbr_day_names.1'),
                   I18n.t('date.abbr_day_names.2'),
                   I18n.t('date.abbr_day_names.3'),
                   I18n.t('date.abbr_day_names.4'),
                   I18n.t('date.abbr_day_names.5'),
                   I18n.t('date.abbr_day_names.6')
    ],
    weekdaysAbbrev: [
                   I18n.t('date.single_letter_day_names.0'),
                   I18n.t('date.single_letter_day_names.1'),
                   I18n.t('date.single_letter_day_names.2'),
                   I18n.t('date.single_letter_day_names.3'),
                   I18n.t('date.single_letter_day_names.4'),
                   I18n.t('date.single_letter_day_names.5'),
                   I18n.t('date.single_letter_day_names.6')
    ]
  };
}

export function getMonthFromMonthShort(monthShort) {
  const { months, monthsShort } = language();
  const index = monthsShort.findIndex(m => m === monthShort);
  return months[index];
}
