// action 함수가 server 환경에서 동작이 되도록
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 양식 스키마(= 구조) 정의, enum 열거형
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// id, date은 폼 데이터에 생략되어 있음
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// FormData => interface임을 알 수 있음
// type == interface, 하지만 interface는 확장이 가능함
// export async function createInvoice(formData: FormData) {
// const rawFormData = {
//   customerId: formData.get('customerId'),
//   amount: formData.get('amount'),
//   status: formData.get('status'),
// };
// console.log(rawFormData);
// }

// 위의 함수는 데이터가 잘 들어오는지 확인하기 위함
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // 달러 단위를 센트 단위로 변경
  const amountInCents = amount * 100;
  // 생성 날짜 만들기
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // 해당 경로에 대한 데이터 재검증하여 업데이트된 데이터와 캐시 데이터가 다르므로 새로운 데이터 가져옴
  // cache 데이터를 재검증하고 다시 가져옴
  revalidatePath('/dashboard/invoices');
  // revalid를 다 하고나면 초기화면 (= 송장 list)로 다시 오게 함
  redirect('/dashboard/invoices');
}

// ************************** Update 부분 ************************** //
// UpdateInvoice에는 검증된 데이터가 들어옴
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
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
  redirect('/dashboard/invoices');
}

// ************************** Delete 부분 ************************** //
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
