export const idValidation = (id: string) => {
  if (!(typeof id === 'string' && id.match(/^[0-9]*$/))) {
    throw new Error('Id must be an integer');
  }
};
