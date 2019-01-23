export function language() {
  return {
    cancel:        'Cancelar',
    clear:         'Limpar',
    done:          'OK',
    previousMonth: '‹',
    nextMonth:     '›',
    months: [
                   'Janeiro',
                   'Fevereiro',
                   'Março',
                   'Abril',
                   'Maio',
                   'Junho',
                   'Julho',
                   'Agosto',
                   'Setembro',
                   'Outubro',
                   'Novembro',
                   'Dezembro'
    ],
    monthsShort: [
                   'Jan',
                   'Fev',
                   'Mar',
                   'Abr',
                   'Mai',
                   'Jun',
                   'Jul',
                   'Ago',
                   'Set',
                   'Out',
                   'Nov',
                   'Dez'
    ],
    weekdays: [
                   'Domingo',
                   'Segunda',
                   'Terça',
                   'Quarta',
                   'Quinta',
                   'Sexta',
                   'Sábado'
    ],
    weekdaysShort: [
                   'Dom',
                   'Seg',
                   'Ter',
                   'Qua',
                   'Qui',
                   'Sex',
                   'Sáb'
    ],
    weekdaysAbbrev: [
                   'D',
                   'S',
                   'T',
                   'Q',
                   'Q',
                   'S',
                   'S'
    ]
  };
}

export function getMonthFromMonthShort(monthShort) {
  const { months, monthsShort } = language();
  const index = monthsShort.findIndex(m => m === monthShort);
  return months[index];
}
