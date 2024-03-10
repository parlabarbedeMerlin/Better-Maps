import sendGrid from "@sendgrid/mail"
const sendEmail = async ({ email, subject, templateId, data }) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject,
    // eslint-disable-next-line camelcase
    template_id: templateId,
    dynamicTemplateData: {
      ...data,
      subject
    },
  }
  await sendGrid.send(msg)
}
export default sendEmail
