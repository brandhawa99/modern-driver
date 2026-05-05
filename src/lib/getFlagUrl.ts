export const getFlagUrl = (countryCode: string) => {
  if (import.meta.env.DEV) {
    return `https://flagsapi.com/${countryCode}/flat/24.png`;
  }
  return `/flags/${countryCode}`;
};
