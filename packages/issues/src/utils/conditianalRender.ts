/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';

export const renderIf = (condition: any, content: React.ReactNode) => (Boolean(condition) ? content : null);
