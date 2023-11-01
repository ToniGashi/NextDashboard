'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export type State = {
  message?: string | null,
  errors?: {
    customerId?: string[],
    amount?: string[],
    status?: string[],
  }
}
 
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoiceSchema = InvoiceSchema.omit({id: true, date: true });

export async function createInvoice(prevState: any, formData: FormData) {
  try {
      // Validate form fields using Zod
      const validatedFields = CreateInvoiceSchema.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    
      // If form validation fails, return errors early. Otherwise, continue.
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }

      const { customerId, amount, status } = CreateInvoiceSchema.parse({
          customerId: formData.get('customerId'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        });
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0]; 
  
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
      revalidatePath('/dashboard/invoices');
  } catch (err) {
      return { 
          message : "Failed to create" 
      }
  }
  
  redirect('/dashboard/invoices');
}

const UpdateInvoiceSchema = InvoiceSchema.omit({date: true });

export async function updateInvoice(prevState: any, formData: FormData) {
  try {
    // Validate form fields using Zod
    const validatedFields = CreateInvoiceSchema.safeParse({
      id: formData.get('id'),
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }

    const { id, customerId, amount, status } = UpdateInvoiceSchema.parse({
      id: formData.get('id'),
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    const amountInCents = amount * 100;

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard/invoices/[slug]', 'page');
  } catch (err) {
    console.log(err)
      return { 
          message : "Failed to update" 
      }
  }
  
  redirect('/dashboard/invoices');
}

const DeleteInvoiceSchema = InvoiceSchema.omit({date: true, customerId: true, amount: true, status: true});

export async function deleteInvoice(formData: FormData) {
  try {
      const { id } = DeleteInvoiceSchema.parse({
          id: formData.get('id')
        });
  
      await sql`
        DELETE FROM invoices WHERE id = ${id}
      `;
  
      revalidatePath('/dashboard/invoices');
  } catch (err) {
    console.log(err)
      return { 
          message : "Failed to delete" 
      }
  }
}

const AuthenticateSchema = z.object({ 
  email: z.string().email(), 
  password: z.string().min(6) 
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}