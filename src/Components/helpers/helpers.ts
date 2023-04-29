export const getFileName = (str: string | null) => {
    return str ? str?.split('\\')?.pop()?.split('/').pop() : '';
  }