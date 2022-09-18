/**
 * Recebe uma string em formato Hora:Minutos
 * e converte para minutos.
 * @param hourString
 */
export function convertHoursStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = (hours * 60) + minutes;
  return minutesAmount;
}

/**
 * Recebe um valor em minutos e converte para horas no formato H:M
 * @param minutesAmount
 */
export function convertMinutesToString(minutesAmount: number) {
  const hour = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
    return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; 

}
