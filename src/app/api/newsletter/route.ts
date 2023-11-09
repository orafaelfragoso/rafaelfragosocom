import mailchimp from "@mailchimp/mailchimp_marketing";

export async function POST(request: Request) {
  const formData = await request.formData();
  const apiKey = process.env.MAILCHIMP_API_KEY as string;
  const listId = process.env.MAILCHIMP_LIST_ID as string;

  mailchimp.setConfig({
    apiKey,
    server: "us10",
  });

  try {
    const data = await mailchimp.lists.addListMember(listId, {
      email_address: formData.get("email") as string,
      status: "pending",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json(error);
  }
}
