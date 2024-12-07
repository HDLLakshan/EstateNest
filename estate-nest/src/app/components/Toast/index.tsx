import { toast } from 'react-toastify';

export const toastify = (
  msg: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'error',
) => toast(msg, { type, theme: 'colored' });
