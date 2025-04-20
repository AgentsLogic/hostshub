import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (dirty: string) => DOMPurify.sanitize(dirty);
export const isValidUuid = (uuid: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);

export const validateRequiredFields = (data: Record<string, any>, fields: string[]) => {
  const missingFields = fields.filter(field => !data[field]);
  return {
    valid: missingFields.length === 0,
    missingFields
  };
};

export const sanitizeSubdomain = (input: string) => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63);
};

// Added missing sanitization functions
export const sanitizeFilename = (name: string) => 
  name.replace(/[^a-zA-Z0-9-_.]/g, '').replace(/\.\./g, '');

export const sanitizeTemplateInput = (input: string) =>
  DOMPurify.sanitize(input, {ALLOWED_TAGS: []});
