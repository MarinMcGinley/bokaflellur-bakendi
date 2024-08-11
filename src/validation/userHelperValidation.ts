export const nameValidation = (name: string) => {
  const test = name.match(/^[A-Z-ÁÉÍÓÚÝÐÞÆÖa-z-áéíóúýðþæö]+$/);

  console.log({ test });
  if (
    !(
      typeof name === 'string' &&
      name.match(/^[A-Z-ÁÉÍÓÚÝÐÞÆÖa-z-áéíóúýðþæö]+$/)
    )
  ) {
    throw new Error(
      'Names cannot include numbers or spaces and must start with a capital letter'
    );
  }
};

export const roleValidation = (role: 'admin' | 'user') => {
  const t = ['admin', 'user'].includes(role);
  console.log({ t });
  if (!(typeof role === 'string' && ['admin', 'user'].includes(role))) {
    throw new Error('Role must be either admin or user');
  }
};

export const urlValidation = (url: string) => {
  if (
    !(
      typeof url === 'string' &&
      url.match(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
  ) {
    throw new Error('Url is not standardized');
  }
};

export const emailValidation = (email: string) => {
  if (
    !(
      typeof email === 'string' &&
      email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)
    )
  ) {
    throw new Error('Email is not standardized');
  }
};
