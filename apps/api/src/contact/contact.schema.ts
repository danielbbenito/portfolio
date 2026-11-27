import { z } from 'zod';

// The shape a contact request must have. Anything else gets a 400 with the reasons.
// This is the DTO (data transfer object): the contract between the form and the API.
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please add your name').max(100),
  email: z.email('Please use a valid email address').max(254),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  // Spam checks (see ContactService): a hidden field people never fill in,
  // and the time the form was first shown, in milliseconds since 1970.
  website: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative(),
});

export type ContactDto = z.infer<typeof contactSchema>;
