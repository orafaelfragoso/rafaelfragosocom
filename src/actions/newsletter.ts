'use server'

import mailchimp from '@mailchimp/mailchimp_marketing'

export async function subscribe(email: string) {
  try {
    const apiKey = process.env.MAILCHIMP_API_KEY as string
    const listId = process.env.MAILCHIMP_LIST_ID as string

    mailchimp.setConfig({
      apiKey,
      server: 'us10',
    })

    return await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'pending',
    })
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Something wrong' }
  }
}
